from fastapi import FastAPI, UploadFile, HTTPException, Request, BackgroundTasks
from pydantic import BaseModel
import os
from tempfile import NamedTemporaryFile
from table_processing import process_pdf_to_paragraph
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from concurrent.futures import ThreadPoolExecutor

app = FastAPI()
executor = ThreadPoolExecutor()
ongoing_tasks = {}  # Dictionary to track ongoing tasks and their temp files

class CancellationRequest(BaseModel):
    filename: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-pdf/")
async def process_pdf_endpoint(file: UploadFile, request: Request):
    """
    Endpoint to process a PDF and generate summaries.
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    temp_pdf_path = None

    try:
        with NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            temp_pdf_path = temp_pdf.name
            temp_pdf.write(await file.read())

        # Store the temp file path with the filename
        ongoing_tasks[file.filename] = {
            "path": temp_pdf_path,
            "task": None
        }

        disconnect_event = asyncio.Event()

        async def monitor_connection():
            while not disconnect_event.is_set():
                if await request.is_disconnected():
                    disconnect_event.set()
                    # Clean up if client disconnects
                    await cleanup_task(file.filename)
                    return
                await asyncio.sleep(0.1)

        monitor_task = asyncio.create_task(monitor_connection())
        loop = asyncio.get_event_loop()

        processing_task = loop.run_in_executor(
            executor, process_pdf_to_paragraph, temp_pdf_path
        )
        
        ongoing_tasks[file.filename]["task"] = processing_task

        try:
            done, pending = await asyncio.wait(
                [processing_task, monitor_task],
                return_when=asyncio.FIRST_COMPLETED
            )
            
            for task in pending:
                task.cancel()

            if disconnect_event.is_set():
                raise HTTPException(status_code=499, detail="Client closed request")

            await processing_task
            return {"message": "PDF processed successfully."}

        except asyncio.CancelledError:
            raise HTTPException(status_code=499, detail="Client closed request")
        finally:
            monitor_task.cancel()
            await cleanup_task(file.filename)

    except Exception as e:
        if temp_pdf_path and os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

async def cleanup_task(filename: str):
    """Helper function to clean up task and temporary files"""
    if filename in ongoing_tasks:
        task_info = ongoing_tasks[filename]
        if task_info["task"]:
            task_info["task"].cancel()
        if task_info["path"] and os.path.exists(task_info["path"]):
            os.remove(task_info["path"])
        ongoing_tasks.pop(filename)

@app.post("/cancel-processing/")
async def cancel_processing(request: CancellationRequest):
    """Endpoint to cancel ongoing PDF processing."""
    if request.filename in ongoing_tasks:
        await cleanup_task(request.filename)
        return {"message": "Processing canceled successfully."}
    return {"message": "No ongoing processing found for this file."}

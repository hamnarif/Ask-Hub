from fastapi import FastAPI, UploadFile, HTTPException, Request
import os
from tempfile import NamedTemporaryFile
from table_processing import process_pdf_to_paragraph
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from concurrent.futures import ThreadPoolExecutor

app = FastAPI()
executor = ThreadPoolExecutor()
ongoing_tasks = {}  # Dictionary to track ongoing tasks

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

        disconnect_event = asyncio.Event()

        async def monitor_connection():
            while not disconnect_event.is_set():
                if await request.is_disconnected():
                    disconnect_event.set()
                    return
                await asyncio.sleep(0.1)

        monitor_task = asyncio.create_task(monitor_connection())
        loop = asyncio.get_event_loop()

        processing_task = loop.run_in_executor(
            executor, process_pdf_to_paragraph, temp_pdf_path
        )

        # Save the task in the ongoing_tasks dictionary
        ongoing_tasks[file.filename] = processing_task

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
            ongoing_tasks.pop(file.filename, None)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")
    finally:
        if temp_pdf_path and os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)

@app.post("/cancel-processing/")
async def cancel_processing(filename: str):
    """
    Endpoint to cancel ongoing PDF processing.
    """
    task = ongoing_tasks.get(filename)
    if task:
        task.cancel()
        ongoing_tasks.pop(filename, None)
        return {"message": "Processing canceled successfully."}
    raise HTTPException(status_code=404, detail="No ongoing processing found for this file.")

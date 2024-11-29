from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from pathlib import Path
from table_processing import extract_and_save_headers

app = FastAPI()

# Define a folder to temporarily save uploaded files
UPLOAD_FOLDER = "uploaded_pdf"
OUTPUT_FOLDER = "output_files"

# Ensure folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Endpoint to upload a PDF file, process it to extract table headers, 
    and save the headers in a text file.
    
    Parameters:
        file (UploadFile): The uploaded PDF file.
    
    Returns:
        JSONResponse: A message indicating the success or failure of the operation.
    """
    # Define the path to save the uploaded file
    file_path = Path(UPLOAD_FOLDER) / file.filename
    
    try:
        # Save the uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Call the table processing function
        extract_and_save_headers(str(file_path), OUTPUT_FOLDER)
        
        # Get the output file path
        output_file_path = Path(OUTPUT_FOLDER) / f"{file.filename.split('.')[0]}_headers.txt"
        
        return JSONResponse(
            content={
                "message": "File processed successfully.",
                "output_file": str(output_file_path)
            },
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )
    finally:
        # Clean up the uploaded file
        if file_path.exists():
            os.remove(file_path)

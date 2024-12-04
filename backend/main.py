from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
from tempfile import NamedTemporaryFile
from table_processing import process_pdf_to_paragraph

app = FastAPI()

@app.post("/process-pdf/")
async def process_pdf_endpoint(file: UploadFile):
    """
    Endpoint to process a PDF and generate summaries.
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    try:
        # Save the uploaded file to a temporary file
        with NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            temp_pdf.write(await file.read())
            temp_pdf_path = temp_pdf.name

        # Process the PDF
        try:
            process_pdf_to_paragraph(temp_pdf_path)
            return JSONResponse(content={"message": "PDF processed successfully. Summaries generated in the 'Tables' folder."})
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Processing failed: {e}")
        finally:
            # Clean up the temporary file
            if os.path.exists(temp_pdf_path):
                os.remove(temp_pdf_path)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File handling failed: {e}")


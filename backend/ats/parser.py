"""
Production Resume File Parser (.pdf & .docx)
Utilizes pypdf for PDF extraction and python-docx for native DOCX extraction.
Handles file validation, size limits, password protection, and structural integrity.
"""
import io
import re
from typing import Dict, Any

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def parse_uploaded_resume(file_obj) -> Dict[str, Any]:
    """
    Validates and extracts clean plain text and structural metadata from an uploaded PDF or DOCX file.
    """
    if not file_obj:
        return {"success": False, "error": "No file provided."}

    filename = getattr(file_obj, 'name', 'resume.pdf').lower()
    filesize = getattr(file_obj, 'size', 0)

    # 1. File Size Validation
    if filesize > MAX_FILE_SIZE:
        return {"success": False, "error": "File size exceeds 10MB limit."}

    # 2. Extension Validation
    if not (filename.endswith('.pdf') or filename.endswith('.docx') or filename.endswith('.txt')):
        return {"success": False, "error": "Invalid file format. Please upload a .pdf or .docx resume."}

    file_bytes = file_obj.read()
    raw_text = ""
    page_count = 1

    # 3. PDF Extraction (pypdf)
    if filename.endswith('.pdf'):
        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(file_bytes))
            if reader.is_encrypted:
                return {"success": False, "error": "Password-protected PDF files cannot be processed. Please upload an unlocked PDF."}
            
            page_count = len(reader.pages)
            pages_text = []
            for page in reader.pages:
                t = page.extract_text()
                if t:
                    pages_text.append(t)
            raw_text = "\n".join(pages_text).strip()
        except Exception as e:
            return {"success": False, "error": f"Failed to parse PDF document: {str(e)}"}

    # 4. DOCX Extraction (python-docx)
    elif filename.endswith('.docx'):
        try:
            import docx
            doc = docx.Document(io.BytesIO(file_bytes))
            paragraphs = []
            for p in doc.paragraphs:
                if p.text.strip():
                    paragraphs.append(p.text.strip())
            for table in doc.tables:
                for row in table.rows:
                    for cell in row.cells:
                        if cell.text.strip():
                            paragraphs.append(cell.text.strip())
            raw_text = "\n".join(paragraphs).strip()
            page_count = max(1, len(paragraphs) // 30)
        except Exception as e:
            return {"success": False, "error": f"Failed to parse DOCX document: {str(e)}"}

    # 5. TXT Extraction
    elif filename.endswith('.txt'):
        try:
            raw_text = file_bytes.decode('utf-8', errors='ignore').strip()
        except Exception as e:
            return {"success": False, "error": f"Failed to read text file: {str(e)}"}

    if not raw_text or len(raw_text.strip()) < 40:
        return {
            "success": False,
            "error": "No readable text found in file. Please ensure the document is not an image-only scan or corrupted."
        }

    return {
        "success": True,
        "filename": filename,
        "filesize": filesize,
        "page_count": page_count,
        "raw_text": raw_text
    }

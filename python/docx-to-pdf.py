import asyncio
import os
import sys
from docx2pdf import convert

async def convert_to_pdf(docx_file):
    try:
        docx_file_path = os.path.join(os.getcwd(), "tmp", "certificates", docx_file)
        pdf_file_path = docx_file_path.replace(".docx", ".pdf")
        
        print(f"Converting: {docx_file_path} -> {pdf_file_path}")

        await asyncio.to_thread(convert, docx_file_path, pdf_file_path)
    except Exception as e:
        print(f"Error: {e}")

async def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <docx_filename>")
        return

    docx_file = sys.argv[1]

    await convert_to_pdf(docx_file)

if __name__ == "__main__":
    asyncio.run(main())

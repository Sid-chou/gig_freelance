import PyPDF2
import sys

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    pdf_path = "Full_stack_dev_assignment.pdf"
    extracted_text = extract_text_from_pdf(pdf_path)
    print(extracted_text)
    
    # Save to text file
    with open("assignment_content.txt", "w", encoding="utf-8") as f:
        f.write(extracted_text)
    print("\n\n=== Text saved to assignment_content.txt ===")

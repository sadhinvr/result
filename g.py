
import PyPDF2
import re


reader = PyPDF2.PdfReader("pdf.pdf")


num_pages = len(reader.pages)

f = open("text.txt", "w")


text = ''

for page in reader.pages:
    text += page.extract_text() 

f.write(text)
f.close()
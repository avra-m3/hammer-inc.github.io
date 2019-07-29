---
layout: project
title:  "Summer Vacationer, Deloitte Platform Engineering"
date:  2019-01-14
short: "Deloitte Intern 2019"
skills: ['communication', 'time management', 'optical character recognition (OCR)', 'natural language processing (NLP)', 'python', 'performance testing']
tags: ['Deloitte', 'January - February 2019']
---
As an vacationer with the Platform Engineering team at deloitte I developed a working solution 
to a problem in the process automation space for the client I was assigned to.

The project had two objectives;
1. Read in a document (PDF or Image) and represent the data in a meaningful manner.
2. Be able to locate and validate certain key parts of the document once read in.

For the first task we decided to convert the given PDF Documents to an image due to the lack
of standardization when interpreting PDF documents. Once converted to an image we used OpenCV
to optimize the image and ensure all text would be readable on the resulting image.
Finally we used Tesseract a character recognition tool built by google to read in the 
text on the page.

The second task proved to be a bit more difficult; We initially attempted to extract 
the necessary data using regular expressions. 
This worked well for a subset of documents, less so for the entire series.
To get around this we ended up attempting to use Spacy, a natural language processing library
designed for industry use. This allowed us to pull out words that were similar or in some cases 
mis-spelt.


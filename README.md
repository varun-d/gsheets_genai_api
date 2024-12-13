# AI access within Google Sheets using Open Source Models (Groq)

Play around with Language Models (Gen AI) in Google Sheets to create social media copy or experiment with new use cases.

## How it works

The `GROQSIMPLE` function is a simple way to create social media copy in Google Sheets using Open Source Models (Groq). It takes two parameters: the message and the request from the model.

## How to use

Duplicate this [Google Sheets file](https://docs.google.com/spreadsheets/d/1z4a1B64PL9Q9fiO_2Oqyj1i9WnUjQpsRu7U6VgnlW00/edit?usp=sharing)

The API Key within the above file will be removed by Dec 2nd, 2024.

OR create your own Google Sheets file and copy this code into Apps Script.

Add your API_KEY from Groq in the grey box in "API Config" Sheet.
Check Example Sheets in this file. Have fun!

## How to use the function

In any cell type
`=GROQSIMPLE("This is system message", "This is your request to the model")`

Modify the parameters in "API Config" sheet to change the model or other parameters

# What's in the pipeline

Google Sheets CRM to be augmented with custom functions, so I can write quite follow up emails to the contacts

# H3Assignment

In this assignment , we received a excel file from form data which contained product_code with empty price column.
We have to return the same excel file with price data added into the excel sheet.

Our url would be :- localhost:3000/products
Method :- POST

We have to send excel file in form data with key name "ExlFile"

In return we are sending res.download so we will be able to download the updated excel file from save response in postman.
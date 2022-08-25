# H3Assignment

In this assignment , we received a excel file from form data which contained product_code with empty price column.
We have to return the same excel file with price data added into the excel sheet.

Our url would be :- localhost:3000/products

Method :- POST

We have to send excel file in form data with key name "ExlFile"

In return we are sending res.download so we will be able to download the updated excel file from save response in postman.

# To increase app performance we have used asynchronous event architecture of nodejs while making axios call
 We are making axios calls without awaiting them and adding the promises in an array
 After that we are using await to get the data from those promises.
 This reduces our app response time by 90%.(Earlier it was taking 14-15 sec now it's come down to 1-2 sec)

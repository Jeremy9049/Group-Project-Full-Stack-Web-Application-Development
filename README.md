# Group-Project-Full-Stack-Web-Application-Development
Expense Tracker

Brief Description

The Expense Tracker is a full-stack web application designed to help users manage their personal finances. Users can log in securely to view, filter, and sort their transaction history, as well as analyze their expenses through a dynamic interface. Additionally, the app provides a feature to set a monthly budget and receive recommendations on which expenses to cut or reduce to meet financial goals.

Features

Secure login system with username and password validation.

Dynamic transaction history with the ability to filter and sort by date, category, amount, and other attributes.

Conditional formatting for expenses: money spent appears in red, and money earned appears in blue.

Search bar functionality for locating specific transactions.

Budget analysis tool that recommends expense reductions to meet financial goals.

Real-time calculation of net total income/expenses.

## Steps on how to run the program

On your local computer in the Final Project directory: 
    - do (npm start)
    - npm start will execute the command (node server.js) since its in the package.json file in the scripts section.
    - by doing (node server.js) through npm start, that will handle the runtime environment of the website and connect the mysql database to the website as well. 
    - note: in server.js, based on the graders own sql user, password, and database name, the lines in the code need to be modified to make the connection work. Lines 11 through 15 in our project

On MySQL:
    - We attached a sql query commands on the github (sqlStuff.md) where you can copy and paste the commands where we made our tables and entered some sample data. 
    -Also, the mysql server connection needs to be on as well so it works.

In the same Final Project Directory:
    -now that both the runtime environment and the database are set up and going, you can run the html file and the project will run as intended!



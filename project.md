## budget where it recommends items to cut out to meet budget
## keep prices that are constant (rent, car payment, etc.) and dont make client able to update 
## try to cut out expenses based on necessity
ex. pay less for groceries, cut back on subscriptons

the monthly budget field is the desired budget that you would like to have for the month. when you click on get recommendations it should print out recommendations for the costs you should cut
so for example, my transactions table has a food category, description groceries where the amount is 200 dollars, it would say you should cut on the amount of money youre spending on groceries and then prompt new questions. Lets say if the amount of the expense is over 20 than the tracker will recommend you change the price. also for each of the expenses that are over 20, the prompted questions will each go one by one until each expense is either updated or not updated. 
2 part question
- enter amount for the expense that you can reduce it by
- can you reduce this expense, if yes...line above. if no, move on
if it is yes, put in a number you can reduce the expense by. then update the amount field to the new input. 
At the end, add a summary statement that informs user of the different expenses to reduce in order to reach the desired budget



use expense_tracker;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(50),
    description VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
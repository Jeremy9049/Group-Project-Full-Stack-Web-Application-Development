create database if not exists expense_tracker;
use expense_tracker;

## tables
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

## data dump
INSERT INTO users (username, password) VALUES ('user', 'password');

INSERT INTO transactions (user_id, date, category, description, amount, payment_method, notes)
VALUES (1, '2024-12-01', 'Food', 'Groceries', 50.00, 'Credit Card', 'Walmart'),
       (1, '2024-12-02', 'Transport', 'Gas', 30.00, 'Debit Card', 'Shell'),
       (1, '2024-12-03', 'Income', 'Paycheck', 500.00, 'Direct Deposit', 'Employer');

INSERT INTO transactions (user_id, date, category, description, amount, payment_method, notes) VALUES
(1, '2024-12-01', 'Food', 'Groceries', 200.00, 'Credit Card', 'Walmart'),
(1, '2024-12-02', 'Transport', 'Gas', 30.00, 'Debit Card', 'Shell'),
(1, '2024-12-03', 'Income', 'Paycheck', 500.00, 'Direct Deposit', 'Employer'),
(1, '2024-12-05', 'Entertainment', 'Netflix Subscription', 25.00, 'Credit Card', 'Monthly subscription'),
(1, '2024-12-06', 'Utilities', 'Electricity Bill', 100.00, 'Debit Card', 'Fixed monthly cost');

-- Create the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Insert sample data
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- Task 1: Calculate total sales for March 2024
SELECT SUM(amount) as total_sales_march
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- Task 2: Find the customer who spent the most overall
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- Task 3: Calculate average order value for the last three months
SELECT 
    AVG(amount) as average_order_value
FROM orders
WHERE order_date >= date('now', '-3 months');

-- Additional useful queries:

-- Monthly sales breakdown
SELECT 
    strftime('%Y-%m', order_date) as month,
    SUM(amount) as total_sales
FROM orders
GROUP BY month
ORDER BY month;

-- Customer spending analysis
SELECT 
    customer,
    COUNT(*) as number_of_orders,
    SUM(amount) as total_spent,
    AVG(amount) as average_order_value
FROM orders
GROUP BY customer
ORDER BY total_spent DESC;

-- Daily sales trend
SELECT 
    order_date,
    SUM(amount) as daily_sales
FROM orders
GROUP BY order_date
ORDER BY order_date; 
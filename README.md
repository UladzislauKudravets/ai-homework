# Sales Data Analysis SQL Queries

This repository contains SQL queries for analyzing sales data from an online store.

## Database Structure

The database consists of a single table `orders` with the following structure:
- `id`: INTEGER PRIMARY KEY
- `customer`: TEXT
- `amount`: REAL
- `order_date`: DATE

## Sample Data

The database is populated with sample data including orders from three customers (Alice, Bob, and Charlie) over a period of several months.

## Main Queries

### 1. Total Sales for March 2024
```sql
SELECT SUM(amount) as total_sales_march
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
```
Expected result: 27,000

### 2. Top-Spending Customer
```sql
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
```
Expected result: Alice (20,000)

### 3. Average Order Value
```sql
SELECT 
    AVG(amount) as average_order_value
FROM orders
WHERE order_date >= date('now', '-3 months');
```
Expected result: 6,000

## Additional Analysis Queries

The repository also includes additional queries for:
- Monthly sales breakdown
- Customer spending analysis
- Daily sales trends

## How to Use

1. Open SQLite Online or any SQLite database tool
2. Copy and paste the contents of `database.sql`
3. Execute the queries to see the results

## Expected Results

The queries will provide the following insights:
- Total sales volume for March 2024
- Customer with the highest total spending
- Average order value for the last three months
- Additional sales analytics and trends

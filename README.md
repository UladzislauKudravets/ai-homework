# API Testing Application

This application tests the Fake Store API (https://fakestoreapi.com/products) for data validation and anomaly detection.

## Features

- Validates server response status
- Checks product attributes:
  - Title (must not be empty)
  - Price (must not be negative)
  - Rating (must not exceed 5)
- Generates a list of products with defects
- Includes automated tests

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

To run the API tests:
```bash
npm start
```
## Test Coverage

The application includes tests for:
- Server response validation
- Product attribute validation
- Edge cases and error handling

## Output

The application will display:
- Server response status
- Total number of products
- Number of products with defects
- Detailed list of products with defects and their specific issues

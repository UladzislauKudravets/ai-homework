const axios = require('axios');

const API_URL = 'https://fakestoreapi.com/products';

// Function to check server response
async function checkServerResponse() {
    try {
        const response = await axios.get(API_URL);
        return {
            status: response.status,
            isValid: response.status === 200,
            message: response.status === 200 ? 'Server response is valid' : 'Invalid server response'
        };
    } catch (error) {
        return {
            status: error.response?.status || 500,
            isValid: false,
            message: 'Error connecting to server'
        };
    }
}

// Function to validate product attributes
function validateProduct(product) {
    const defects = [];

    // Check title
    if (!product.title || product.title.trim() === '') {
        defects.push('Empty title');
    }

    // Check price
    if (typeof product.price !== 'number' || product.price < 0) {
        defects.push('Invalid price');
    }

    // Check rating.rate
    if (!product.rating || typeof product.rating.rate !== 'number' || product.rating.rate > 5) {
        defects.push('Invalid rating');
    }

    return {
        id: product.id,
        hasDefects: defects.length > 0,
        defects
    };
}

// Main function to validate all products
async function validateProducts() {
    try {
        const response = await axios.get(API_URL);
        const products = response.data;
        
        const validationResults = products.map(validateProduct);
        const productsWithDefects = validationResults.filter(result => result.hasDefects);

        return {
            totalProducts: products.length,
            productsWithDefects: productsWithDefects.length,
            defectsList: productsWithDefects
        };
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
}

// Function to run all tests
async function runAllTests() {
    console.log('Starting API tests...\n');

    // Check server response
    const serverCheck = await checkServerResponse();
    console.log('Server Response Check:');
    console.log(`Status: ${serverCheck.status}`);
    console.log(`Valid: ${serverCheck.isValid}`);
    console.log(`Message: ${serverCheck.message}\n`);

    if (serverCheck.isValid) {
        // Validate products
        const validationResults = await validateProducts();
        console.log('Products Validation Results:');
        console.log(`Total Products: ${validationResults.totalProducts}`);
        console.log(`Products with Defects: ${validationResults.productsWithDefects}\n`);

        if (validationResults.defectsList.length > 0) {
            console.log('Products with Defects:');
            validationResults.defectsList.forEach(product => {
                console.log(`\nProduct ID: ${product.id}`);
                console.log('Defects:');
                product.defects.forEach(defect => console.log(`- ${defect}`));
            });
        }
    }
}

// Run tests
runAllTests().catch(error => {
    console.error('Test execution failed:', error.message);
}); 
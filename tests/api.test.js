const axios = require('axios');
const { checkServerResponse, validateProduct } = require('../index');

// Mock for axios
jest.mock('axios');

describe('API Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Server Response Tests', () => {
        test('should return valid response for status 200', async () => {
            axios.get.mockResolvedValue({ status: 200 });
            const result = await checkServerResponse();
            expect(result.isValid).toBe(true);
            expect(result.status).toBe(200);
        });

        test('should return invalid response for status 404', async () => {
            axios.get.mockRejectedValue({ response: { status: 404 } });
            const result = await checkServerResponse();
            expect(result.isValid).toBe(false);
            expect(result.status).toBe(404);
        });
    });

    describe('Product Validation Tests', () => {
        test('should detect empty title', () => {
            const product = {
                id: 1,
                title: '',
                price: 10,
                rating: { rate: 4.5 }
            };
            const result = validateProduct(product);
            expect(result.hasDefects).toBe(true);
            expect(result.defects).toContain('Empty title');
        });

        test('should detect negative price', () => {
            const product = {
                id: 1,
                title: 'Test Product',
                price: -10,
                rating: { rate: 4.5 }
            };
            const result = validateProduct(product);
            expect(result.hasDefects).toBe(true);
            expect(result.defects).toContain('Invalid price');
        });

        test('should detect invalid rating', () => {
            const product = {
                id: 1,
                title: 'Test Product',
                price: 10,
                rating: { rate: 6 }
            };
            const result = validateProduct(product);
            expect(result.hasDefects).toBe(true);
            expect(result.defects).toContain('Invalid rating');
        });

        test('should pass valid product', () => {
            const product = {
                id: 1,
                title: 'Test Product',
                price: 10,
                rating: { rate: 4.5 }
            };
            const result = validateProduct(product);
            expect(result.hasDefects).toBe(false);
            expect(result.defects).toHaveLength(0);
        });
    });
}); 
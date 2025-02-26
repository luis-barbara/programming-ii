import { convertUSDToEUR, fetchExchangeRate } from './conversion.js';

jest.mock('./conversion', () => ({
  ...jest.requireActual('./conversion'),
  fetchExchangeRate: jest.fn(),
}));

describe('Currency Conversion Tests', () => {
  
  test('should convert USD to EUR successfully', async () => {
    const amount = 100;
    
    // Mock da API para devolver a taxa de câmbio simulada
    fetchExchangeRate.mockResolvedValue(0.85);

    const result = await convertUSDToEUR(amount);
    expect(result).toBe(85);
  });

  test('should handle API failure gracefully', async () => {
    const amount = 100;
    
    // Simula falha da API
    fetchExchangeRate.mockRejectedValue(new Error('API Error'));

    try {
      await convertUSDToEUR(amount);
    } catch (error) {
      expect(error.message).toBe('API Error');
    }
  });
});

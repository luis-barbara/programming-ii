export async function convertUSDToEUR(amount) {
  const rate = await fetchExchangeRate(); // Chama a API para obter a taxa de câmbio
  return amount * rate;
}

// Mock da API de taxa de câmbio
export async function fetchExchangeRate() {
  // Simula uma chamada à API para obter a taxa de câmbio
  return 0.85; // Taxa de câmbio simulada (1 USD = 0.85 EUR)
}

// Create floating symbols
function createFloatingSymbols() {
    const symbols = [
        '💱', '💵', '💶', '💷', '💴', '$', '€', '£', '¥', '₹',
        '🇺🇸', '🇪🇺', '🇬🇧', '🇯🇵', '🇮🇳', '🇦🇺', '🇨🇦', '🇨🇭', '🇨🇳',
        '🇳🇿', '🇸🇬', '🇭🇰', '🇸🇪', '🇰🇷', '🇿🇦', '🇹🇭', '🇲🇽', '🇧🇷', '🇷🇺', '🇦🇪'
    ];
    const container = document.getElementById('floatingSymbols');

    // Clear existing symbols
    container.innerHTML = '';

    // Create more instances of symbols
    const numberOfSymbols = 40; // Increased number of floating symbols

    for (let i = 0; i < numberOfSymbols; i++) {
        const div = document.createElement('div');
        div.className = 'symbol';
        div.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Random position
        div.style.left = Math.random() * 100 + '%';
        div.style.top = Math.random() * 100 + '%';
        
        // Random animation properties
        div.style.animationDelay = Math.random() * 8 + 's';
        div.style.animationDuration = (Math.random() * 4 + 6) + 's'; // 6-10s duration
        
        // Random size
        const scale = Math.random() * 0.5 + 0.8; // 0.8-1.3x size
        div.style.transform = `scale(${scale})`;
        
        // Random opacity
        div.style.opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4 opacity
        
        container.appendChild(div);
    }
}

// Initialize floating symbols
createFloatingSymbols();

// Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultInput = document.getElementById('result');
const exchangeRateText = document.getElementById('exchange-rate');

// Exchange rate API endpoint
const API_KEY = '4e04193c7a3bc10cdd386ac8'; // Replace with your API key from exchangerate-api.com
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

async function convertCurrency() {
    try {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        // For demo purposes, using a simplified conversion without API
        // In production, uncomment the API code below and add your API key
        
        // Demo conversion rates (approximate)
        const demoRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110,
            INR: 73,
            AUD: 1.35,
            CAD: 1.25,
            CHF: 0.92,
            CNY: 6.45,
            NZD: 1.45,
            SGD: 1.34,
            HKD: 7.76,
            SEK: 8.45,
            KRW: 1150,
            ZAR: 14.5,
            THB: 31.5,
            MXN: 20.0,
            BRL: 5.25,
            RUB: 73.5,
            AED: 3.67
        };

        const rate = demoRates[to] / demoRates[from];
        const result = amount * rate;
        
        /* Uncomment this section and add your API key to use real conversion rates
        const response = await fetch(`${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`);
        const data = await response.json();
        
        if (data.result === 'success') {
            const result = data.conversion_result;
        */

        resultInput.value = result.toFixed(2);
        exchangeRateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;

    } catch (error) {
        console.error('Error:', error);
        exchangeRateText.textContent = 'Error converting currency. Please try again.';
    }
}

function swapCurrencies() {
    const tempCurrency = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    
    if (amountInput.value) {
        convertCurrency();
    }
}

// Initial conversion
convertCurrency();

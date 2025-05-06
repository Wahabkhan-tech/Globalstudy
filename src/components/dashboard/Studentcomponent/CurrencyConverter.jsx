import { useState } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('ZWL');
  const [toCurrency, setToCurrency] = useState('USD');

  const handleConvert = () => {
    console.log('Converting:', { amount, fromCurrency, toCurrency });
    // Add conversion logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-red-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Currency Converter</h3>
      <div className="space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="ZWL">ZWL</option>
          <option value="USD">USD</option>
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="USD">USD</option>
          <option value="ZWL">ZWL</option>
        </select>
        <div className="flex space-x-2">
          <button
            onClick={handleConvert}
            className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Convert
          </button>
          <button
            onClick={() => {
              setAmount('');
              setFromCurrency('ZWL');
              setToCurrency('USD');
            }}
            className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
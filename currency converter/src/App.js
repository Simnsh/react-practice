// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState(0);
  const [isLoading, setIsloading] = useState(false);

  useEffect(
    function () {
      // if (!amount) return;

      // const controller = new AbortController();

      async function fetchCurrency() {
        try {
          setIsloading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${
              !amount ? 1 : amount
            }&from=${fromCurrency}&to=${toCurrency}`

            // { signal: controller.signal }
          );
          if (!res.ok) {
            const errorText = await res.text();
            console.error("HTTP Error:", res.status, errorText);
            throw new Error("Something went wrong when fetching");
          }

          const data = await res.json();
          console.log(data.rates);
          setConverted(data.rates[toCurrency]);
          setIsloading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Fetch failed:", err);
          }
        }
      }

      if (fromCurrency == toCurrency) return setConverted(amount);
      fetchCurrency();
      // return function () {
      //   controller.abort();
      // };
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="MYR">MYR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="MYR">MYR</option>
      </select>
      <p>
        {converted} {toCurrency}
      </p>
    </div>
  );
}

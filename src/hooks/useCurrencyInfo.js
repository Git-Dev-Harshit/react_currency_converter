import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        const json = await response.json();
        setData(json[currency]);
      } catch (error) {
        console.error("Error fetching currency data:", error);

        // fallback mechanism
        try {
          const fallback = await fetch(
            `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`
          );
          const fallbackJson = await fallback.json();
          setData(fallbackJson[currency]);
        } catch (e) {
          console.error("Fallback API also failed:", e);
        }
      }
    };

    fetchData();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;

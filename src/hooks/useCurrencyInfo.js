import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      // `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/v1/currencies/${currency}.json`
      .then((res) => res.json())
      .then((res) => setData(res[currency]));
    // res mein boht saari keys hain viz date and currency itself, we want currency, dnt get confused, see bottom
  }, [currency]);
  // console.log(data); //an object containing all the key-value pairs of country name and 1 unit conversion
  return data;
}
export default useCurrencyInfo;

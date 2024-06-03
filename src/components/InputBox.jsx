// APPROACH 1

// import React, { useId } from "react";
// function InputBox({
//   label,
//   amount,
//   onAmountChange, //for setAmount
//   onCurrencyChange, //for setTo and setFrom
//   currencyOptions = [],
//   selectCurrency = "usd",
//   amountDisable = false,
//   currencyDisable = false,
//   className = "", //for further addition of classes
//   // sab kuch hmne dynamic rakha hai
// }) {
//   //
//   const amountInputID = useId(); //just for a random unique ID
//   //
//   return (
//     <div className={`bg-white p-3 rounded-lg text-sm flex  ${className}`}>
//       <div className="w-1/2">
//         <label
//           htmlFor={amountInputID}
//           className="text-black/40 mb-2 inline-block"
//         >
//           {label}
//         </label>
//         <input
//           id={amountInputID}
//           className="outline-none w-full bg-transparent py-1.5"
//           type="text"
//           placeholder="Amount"
//           disabled={amountDisable}
//           value={amount}
//           onChange={
//             (e) => onAmountChange && onAmountChange(Number(e.target.value))
//             // onAmountChange is param here, this param gets e.target.value , since we want to set an amount in the InputBox component whenever the text changes, we pass setAmount as an arg, so onAmountChange basically becomes setAmount and hence gets the e.target.value and hence text value is immediately reflected when changed.
//             // setAmount(Number(e.target.value)) is what we needed and got
//             // also make sure we have the function (setAmount here) passed as args.
//           }
//         />
//       </div>
//       {/*  */}

//       {/*  */}
//       <div className="w-1/2 flex flex-wrap justify-end text-right">
//         {/*  */}
//         <p className="text-black/40 mb-2 w-full">Currency Type</p>
//         {/*  */}
//         <select
//           className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
//           disabled={currencyDisable}
//           value={selectCurrency}
//           onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
//         >
//           {currencyOptions.map((currency, index) => (
//             <option key={index} value={currency}>
//               {currency}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

// export default InputBox;

// APPROACH 2
import React, { useId, useEffect, useState } from "react";

// Function to fetch and format currency data
async function getCurrencyData() {
  const response = await fetch(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.6.3/v1/country.json"
  );
  if (!response.ok) {
    throw new Error(`Error fetching currency data: ${response.status}`);
  }
  const data = await response.json();

  const formattedData = Object.entries(data).map(([code, countryInfo]) => [
    String(countryInfo.currency_code),
    String(countryInfo.country_name),
  ]);

  return formattedData;
}

function InputBox({
  label,
  amount,
  onAmountChange, // Function to handle amount changes
  onCurrencyChange, // Function to handle currency changes
  selectCurrency = "usd", // Default selected currency
  amountDisable = false, // Whether the amount input is disabled
  currencyDisable = false, // Whether the currency dropdown is disabled
  className = "", // Additional classes for customization
}) {
  // Use useId for generating a unique ID for the input
  const amountInputID = useId();

  // State for storing currency options
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getCurrencyData();
      setCurrencyOptions(data);
    }
    fetchData();
  }, []);

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label
          htmlFor={amountInputID}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={amountInputID}
          className="outline-none w-full bg-transparent py-1.5"
          type="text"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none w-full"
          disabled={currencyDisable}
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency, index) => (
            <option key={index} value={currency[0]}>
              {currency[0]} -- {currency[1]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;

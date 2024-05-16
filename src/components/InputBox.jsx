import React, { useId } from "react";
function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "", //for further addition of classes
  // sab kuch hmne dynamic rakha hai
}) {
  //
  const amountInputID = useId(); //just for a random unique ID
  //
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex  ${className}`}>
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
          value={amount} //already amount is given
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      {/*  */}

      {/*  */}
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        {/*  */}
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        {/*  */}
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          disabled={currencyDisable}
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;

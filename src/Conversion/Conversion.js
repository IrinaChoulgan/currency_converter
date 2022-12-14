import CurrencyRow from '../CurrencyRow/CurrencyRow';
import React, { useEffect, useState } from 'react';

import requestOptions from '../request-options.js';

import s from './Conversation.module.css';

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest?';

export default function Conversion() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState([]);
  const [amount, setAmout] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${BASE_URL}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmout(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmout(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <section className={s.section}>
      <p>I have</p>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <p>I get</p>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </section>
  );
}

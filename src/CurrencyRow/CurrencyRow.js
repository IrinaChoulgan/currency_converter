import React from 'react';
import shortid from 'shortid';

import s from './CurrencyRow.module.css';

export default function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount } = props;
  return (
    <div>
      <input type="number" value={amount} onChange={onChangeAmount} className={s.input} />
      <select value={selectedCurrency} onChange={onChangeCurrency} className={s.select}>
        {currencyOptions.map((option) => (
          <option key={shortid.generate()} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

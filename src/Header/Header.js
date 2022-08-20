import { useEffect, useState } from 'react';
import s from './Header.module.css';

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest';

var myHeaders = new Headers();
myHeaders.append('apikey', 'WoPRAuHIQna9lB5QWnrCer1lCFvrNLmk');

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default function Header() {
  const fullDate = new Date();
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth();
  const date = fullDate.getDate();

  const [euro, setEuro] = useState(1);
  const [usd, setUsd] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setEuro(data.rates.UAH);
        setUsd((data.rates.EUR / data.rates.USD) * data.rates.UAH);
      });
  }, []);

  return (
    <header className={s.header}>
      <h1>
        Exchange rate on: {date}.{month}.{year}
      </h1>
      <div>
        <p>
          &#36; USD: <b>{usd?.toFixed(2)}</b>
        </p>

        <p>
          &#8364; EUR: <b>{euro?.toFixed(2)} </b>
        </p>
      </div>
    </header>
  );
}

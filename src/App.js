import React from 'react';
import Header from './Header/Header';
import Conversion from './Conversion/Conversion';

import s from './App.module.css';

function App() {
  return (
    <div className={s.home}>
      <Header />
      <Conversion />
    </div>
  );
}

export default App;

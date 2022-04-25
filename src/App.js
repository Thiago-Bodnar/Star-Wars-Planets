import React from 'react';
import './App.css';
import FilterForm from './Components/FilterForm';
import Filters from './Components/Filters';
import Header from './Components/Header';
import Table from './Components/Table';
import Provider from './context/Provider';
import './index.css';

function App() {
  return (
    <Provider>
      <Header />
      <FilterForm />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;

import React from 'react';
import './App.css';
import FilterForm from './Components/FilterForm';
import Filters from './Components/Filters';
import Table from './Components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <FilterForm />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;

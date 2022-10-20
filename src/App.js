import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
import TableFilters from './components/TableFilters';

function App() {
  return (
    <Provider>
      <TableFilters />
      <Table />
    </Provider>
  );
}

export default App;

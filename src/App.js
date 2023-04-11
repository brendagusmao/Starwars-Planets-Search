import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
import TableFilters from './components/TableFilters';

function App() {
  return (
    <Provider>
      <div className="main">
        <TableFilters />
        <Table />
      </div>
    </Provider>
  );
}

export default App;

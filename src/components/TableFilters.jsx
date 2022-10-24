import React from 'react';
import TextFilter from './TextFilter';
import Filters from './Filters';

function TableFilters() {
  return (
    <div className="filter">
      <TextFilter />
      <Filters />
    </div>
  );
}

export default TableFilters;

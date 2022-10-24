import React from 'react';
import TextFilter from './TextFilter';
import NumericFilter from './NumericFilter';

function TableFilters() {
  return (
    <div className="filter">
      <TextFilter />
      <NumericFilter />
    </div>
  );
}

export default TableFilters;

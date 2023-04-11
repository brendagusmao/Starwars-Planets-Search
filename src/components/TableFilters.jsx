import React from 'react';
import TextFilter from './TextFilter';
import Filters from './Filters';
import projectIntro from '../image/projectIntro.gif';

function TableFilters() {
  return (
    <div className="filter">
      <img src={ projectIntro } alt="logo" className="logo" />
      <div className="barFilters">
        <TextFilter />
        <Filters />
      </div>
    </div>
  );
}

export default TableFilters;

import React, { useContext } from 'react';
import AppContext from '../context/appContext';

function TextFilter() {
  const { searchName,
    name } = useContext(AppContext);
  return (
    <input
      type="text"
      data-testid="name-filter"
      id="name"
      onChange={ searchName }
      value={ name }
      placeholder=" Pesquise um Planeta"
      className="inputName"
    />
  );
}

export default TextFilter;

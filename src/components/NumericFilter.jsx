import React, { useContext } from 'react';
import AppContext from '../context/appContext';

function NumericFilter() {
  const { handleNumericFilters,
    comparison,
    column,
    handleColumnFilters,
    valor,
    setData,
    data,
    handleNumeric,
  } = useContext(AppContext);

  const handleClick = () => {
    switch (comparison) {
    case 'maior que':
      return setData(data
        .filter((planet) => Number(planet[column]) > Number(valor)));
    case 'menor que':
      return setData(data
        .filter((planet) => Number(planet[column]) < Number(valor)));
    case 'igual a':
      return setData(
        data.filter((planet) => planet[column] === valor),
      );
    default:
      return data;
    }
  };

  return (
    <main>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleColumnFilters }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        id="comparison"
        onChange={ handleNumericFilters }
        value={ comparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ valor }
        onChange={ handleNumeric }
      />
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </main>
  );
}

export default NumericFilter;

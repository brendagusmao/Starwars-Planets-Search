import React, { useContext } from 'react';
import AppContext from '../context/appContext';

function NumericFilter() {
  const { handleNumericFilters,
    comparison,
    column,
    handleColumnFilters,
    valor,
    handleNumeric,
    colunmData,
    handleClick,
  } = useContext(AppContext);

  return (
    <main>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleColumnFilters }
      >
        { colunmData
          .map((item, i) => (
            <option key={ i } value={ item }>{ item }</option>
          ))}
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

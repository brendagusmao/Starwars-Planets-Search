import React, { useContext } from 'react';
import AppContext from '../context/appContext';

const arraySort = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function NumericFilter() {
  const { handleNumericFilters,
    comparison,
    column,
    handleColumnFilters,
    valor,
    handleNumeric,
    colunmData,
    handleClick,
    handleOrderSort,
    handleOrderChange,
    select,
    handleDeleteFilters,
    setest,
  } = useContext(AppContext);

  return (
    <section className="barsection">
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
      <select
        data-testid="column-sort"
        name="order"
        onChange={ handleOrderChange }
        value={ select }
      >
        { arraySort.map((item, i) => (
          <option key={ i } value={ item }>{ item }</option>
        ))}
      </select>
      <label htmlFor="column-sort-input-asc">
        Ascendente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="sort"
          name="order"
          value="ASC"
          onChange={ ({ target }) => setest(target.value) }
        />
      </label>
      <label htmlFor="column-sort-input-asc">
        Descendente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          name="order"
          id="sort"
          onChange={ ({ target }) => setest(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrderSort }
      >
        Ordenar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteFilters }
        className="remove--filters"
      >
        Remover filtros
      </button>
    </section>
  );
}

export default NumericFilter;

import { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function Provider({ children }) {
  const initialColumnData = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [colunmData, setColunmData] = useState(initialColumnData);
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [name, setPlanet] = useState('');
  const [column, setColumn] = useState(colunmData[0]);
  const [comparison, setNumericFilters] = useState('maior que');
  const [valor, setValue] = useState('0');
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [teste, setest] = useState(colunmData[0]);
  const [select, setSelect] = useState('population');
  const endpoint = 'https://swapi.dev/api/planets';

  useEffect(() => {
    const getStarsAPI = async () => {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result.results.map(({ residents, ...filtered }) => filtered));
    };
    getStarsAPI();
  }, [setData]);

  const searchName = ({ target }) => {
    const { value } = target;
    setPlanet(value);
  };

  const handleNumericFilters = ({ target }) => {
    const { value } = target;
    setNumericFilters(value);
  };

  const handleNumeric = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  const handleColumnFilters = ({ target }) => {
    const { value } = target;
    setColumn(value);
  };

  const handleClick = useCallback(() => {
    const valueFilter = colunmData.filter((element) => element !== column);
    setColunmData(valueFilter);
    setColumn(valueFilter[0]);
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
  }, [column, data, valor, comparison, colunmData]);

  const handleOrderChange = useCallback(({ target }) => {
    const { value } = target;
    setSelect(value);
  }, []);

  const handleOrderSort = useCallback(() => {
    const sort = teste;
    const filterequal = [...data].filter((obj) => obj[select] === 'unknown');
    const filterdiferent = [...data].filter((obj) => obj[select] !== 'unknown');
    filterdiferent.sort((a, b) => (
      sort === 'ASC' ? a[select] - b[select]
        : b[select] - a[select]));
    setData([...filterdiferent, ...filterequal]);
  }, [teste, data, select]);

  const allContext = useMemo(() => ({
    data,
    searchName,
    name,
    setData,
    handleNumericFilters,
    comparison,
    handleColumnFilters,
    column,
    handleNumeric,
    valor,
    colunmData,
    setColunmData,
    handleClick,
    order,
    setOrder,
    handleOrderChange,
    handleOrderSort,
    teste,
    setest,
    select,
    setSelect,
    filteredPlanets,
    setFilteredPlanets,
  }), [data,
    name,
    comparison,
    column,
    valor,
    colunmData,
    order,
    handleClick,
    setOrder,
    handleOrderChange,
    handleOrderSort,
    teste,
    setest,
    select,
    setSelect,
    filteredPlanets,
    setFilteredPlanets,
  ]);

  return (
    <AppContext.Provider value={ allContext }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

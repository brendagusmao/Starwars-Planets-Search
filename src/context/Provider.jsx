import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setPlanet] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setNumericFilters] = useState('maior que');
  const [valor, setValue] = useState('0');

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
  }), [data, name, comparison, column, valor]);

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

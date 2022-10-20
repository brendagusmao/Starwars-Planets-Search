import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setPlanet] = useState('');

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

  const allContext = useMemo(() => ({
    data,
    searchName,
    name,
  }), [data, name]);

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

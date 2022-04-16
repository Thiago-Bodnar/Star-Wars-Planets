import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets';

function Provider({ children }) {
  const [data, setData] = useState();

  const contextValue = {
    data,
    setData,
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(URL);
      const { results } = await request.json();
      const planets = results.filter((planet) => !planet.residents);
      setData(planets);
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const handleFilterInput = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const numericFilter = (newFilter) => {
    setFilterByNumericValues([...filterByNumericValues, newFilter]);
  };

  const contextValue = {
    data,
    setData,
    filterByName,
    setFilterByName,
    handleFilterInput,
    filterByNumericValues,
    setFilterByNumericValues,
    numericFilter,
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(URL);
      const { results } = await request.json();
      setData(results);
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

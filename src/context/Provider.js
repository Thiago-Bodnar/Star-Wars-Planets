import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const handleFilterInput = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const numericFilter = (newFilter) => {
    setFilterByNumericValues([...filterByNumericValues, newFilter]);
  };

  const contextValue = {
    planets,
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
      setPlanets(results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterName = () => {
      const newData = planets.filter((planet) => planet.name.toLowerCase()
        .includes(filterByName.name.toLowerCase()));
      setData(newData);
    };
    filterName();
  }, [filterByName.name, planets]);

  useEffect(() => {
    const filterNumber = () => {
      const newData = planets.filter((planet) => {
        if (filterByNumericValues.length === 0) return true;
        const { column, comparison, value } = filterByNumericValues[0];
        const comparisonValue = Number(planet[column]);
        if (comparison === 'menor que') return comparisonValue < value;
        if (comparison === 'maior que') return comparisonValue > value;
        return comparisonValue === Number(value);
      });
      setData(newData);
    };
    filterNumber();
  }, [filterByNumericValues, planets]);

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

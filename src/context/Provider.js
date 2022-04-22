import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { ascSorter, descSorter, nameSorter } from '../helpers';
import AppContext from './AppContext';

const URL = 'https://swapi-trybe.herokuapp.com/api/planets';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [columnFilter, setColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [order, setOrder] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

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
    columnFilter,
    setColumnFilter,
    order,
    setOrder,
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(URL);
      const { results } = await request.json();
      results.sort(nameSorter);
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

  // declara a função filterNumber usando o hook useCallback, para diminuir a complexidade do useEffect

  const filterNumber = useCallback(
    () => {
      const reduceFunc = (acc, { column, comparison, value }, index) => {
        const filterFunc = (planet) => {
          if (filterByNumericValues.length === 0) return true;
          const comparisonValue = Number(planet[column]);
          if (comparison === 'menor que') return comparisonValue < value;
          if (comparison === 'maior que') return comparisonValue > value;
          return comparisonValue === value;
        };
        if (index === 0) {
          acc = planets.filter(filterFunc);
          return acc;
        }
        return acc.filter(filterFunc);
      };
      if (filterByNumericValues.length !== 0) {
        const newData = filterByNumericValues.reduce(reduceFunc, []);
        setData(newData);
      } else {
        setData(planets);
      }
    }, [filterByNumericValues, planets],
  );

  useEffect(
    () => {
      const { column, sort } = order.order;
      const sorter = () => {
        const mappedSortData = planets.map((planet, index) => ({
          value: planet[column],
          index,
        }));
        if (sort === 'ASC') mappedSortData.sort(ascSorter);
        if (sort === 'DESC') mappedSortData.sort(descSorter);
        const orderedData = mappedSortData.map(({ index }) => planets[index]);
        const knownPlanets = orderedData.filter((planet) => planet[column] !== 'unknown');

        const unknownPlanets = orderedData
          .filter((planet) => planet[column] === 'unknown');

        setData([...knownPlanets, ...unknownPlanets]);
      };
      sorter();
    }, [planets, order],
  );

  useEffect(() => {
    filterNumber();
  }, [filterByNumericValues, filterNumber, planets]);

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

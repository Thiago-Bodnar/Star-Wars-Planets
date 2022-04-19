import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const {
    handleFilterInput,
    filterByName,
    numericFilter,
    setCurrentFilter,
    currentFilter,
    filterByNumericValues,
  } = useContext(AppContext);
  const [inputValues, setInputValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleFilterForm = ({ target }) => {
    const { name, value } = target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const { column, comparison, value } = inputValues;

  const handleFilterButton = () => {
    if (filterByNumericValues.length !== 0) {
      setCurrentFilter(currentFilter + 1);
    }
    numericFilter({ column, comparison, value: Number(value) });
  };

  return (
    <>
      <label htmlFor="filterInput">
        Pesquisar Planetas
        <input
          id="filterInput"
          value={ filterByName.name }
          data-testid="name-filter"
          type="text"
          onChange={ handleFilterInput }
        />
      </label>
      <form>
        <label htmlFor="column">
          Coluna
          <select
            id="column"
            data-testid="column-filter"
            name="column"
            value={ column }
            onChange={ handleFilterForm }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            id="comparison"
            data-testid="comparison-filter"
            name="comparison"
            value={ comparison }
            onChange={ handleFilterForm }
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            id="value"
            data-testid="value-filter"
            name="value"
            value={ value }
            onChange={ handleFilterForm }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterButton }
        >
          Filtrar

        </button>
      </form>
    </>
  );
}

export default Filters;

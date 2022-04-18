import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const { handleFilterInput, filterByName, numericFilter } = useContext(AppContext);
  const [inputValues, setInputValues] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const handleFilterForm = ({ target }) => {
    const { name } = target;
    setInputValues({
      ...inputValues,
      [name]: target.value,
    });
  };

  const { column, comparison, value } = inputValues;

  const handleFilterButton = () => {
    numericFilter({ column, comparison, value });
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

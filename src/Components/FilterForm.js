import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function FilterForm() {
  const {
    handleFilterInput,
    filterByName,
    numericFilter,
    columnFilter,
    setColumnFilter,
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
    const filteredColumn = columnFilter.filter((columnOption) => columnOption !== column);
    setColumnFilter(filteredColumn);
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
            {
              columnFilter.map((columnOption) => (
                <option key={ columnOption }>{ columnOption }</option>
              ))
            }
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

export default FilterForm;

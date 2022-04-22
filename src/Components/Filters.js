import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    columnFilter,
    setColumnFilter,
    setOrder,
  } = useContext(AppContext);

  const [sortColumn, setSortColumn] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleRemoveFilter = ({ target }) => {
    const column = target.value;
    const removeFilter = filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilterByNumericValues(removeFilter);
    setColumnFilter([...columnFilter, column]);
  };

  const { column, sort } = sortColumn;

  const handleSortFilter = ({ target }) => {
    const { name, value } = target;
    setSortColumn({
      ...sortColumn,
      [name]: value,
    });
  };

  const handleSetOrder = () => {
    setOrder({
      order: {
        column,
        sort,
      },
    });
  };

  const handleRemoveAllFilters = () => {
    setFilterByNumericValues([]);
    setColumnFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <section>
      {
        filterByNumericValues.length > 0
        && filterByNumericValues.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <p>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>
            <button
              value={ filter.column }
              onClick={ handleRemoveFilter }
              type="button"
            >
              X

            </button>
          </div>
        ))
      }
      <label htmlFor="columnSort">
        Ordenar
        <select
          id="columnSort"
          data-testid="column-sort"
          name="column"
          value={ column }
          onChange={ handleSortFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <div>
        <label htmlFor="asc">
          Crescente
          <input
            type="radio"
            id="asc"
            name="sort"
            data-testid="column-sort-input-asc"
            value="ASC"
            onClick={ handleSortFilter }
          />
        </label>
        <label htmlFor="desc">
          Decrescente
          <input
            type="radio"
            id="desc"
            name="sort"
            data-testid="column-sort-input-desc"
            value="DESC"
            onClick={ handleSortFilter }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSetOrder }
      >
        Ordenar

      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remover Filtros
      </button>
    </section>
  );
}

export default Filters;

import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    columnFilter,
    setColumnFilter,
  } = useContext(AppContext);

  const handleRemoveFilter = ({ target }) => {
    const column = target.value;
    const removeFilter = filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilterByNumericValues(removeFilter);
    setColumnFilter([...columnFilter, column]);
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

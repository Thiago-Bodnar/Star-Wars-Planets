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

  return (
    <>
      {
        filterByNumericValues.length > 0
        && filterByNumericValues.map((filter) => (
          <div
            className="d-flex justify-content-center"
            key={ filter.column }
            data-testid="filter"
          >
            <p>
              {`${filter.column} ${filter.comparison} ${filter.value}`}
            </p>
            <button
              className="btn btn-warning btn-sm"
              value={ filter.column }
              onClick={ handleRemoveFilter }
              type="button"
            >
              x
            </button>
          </div>
        ))
      }
      <div className="col-auto">
        <select
          className="form-select"
          id="columnSort"
          data-testid="column-sort"
          name="column"
          value={ column }
          onChange={ handleSortFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation period</option>
          <option value="surface_water">surface water</option>
        </select>
        <div />
        <div className="form-check form-check-inline">
          <label htmlFor="asc">
            Ascendent
            <input
              className="form-check-input"
              type="radio"
              id="asc"
              name="sort"
              data-testid="column-sort-input-asc"
              value="ASC"
              onClick={ handleSortFilter }
            />
          </label>
        </div>
        <div className="form-check form-check-inline">
          <label htmlFor="desc">
            Descendent
            <input
              className="form-check-input"
              type="radio"
              id="desc"
              name="sort"
              data-testid="column-sort-input-desc"
              value="DESC"
              onClick={ handleSortFilter }
            />
          </label>
        </div>
      </div>
      <div className="col-auto">
        <button
          type="button"
          className="btn btn-warning"
          data-testid="column-sort-button"
          onClick={ handleSetOrder }
        >
          Sort

        </button>
      </div>
    </>
  );
}

export default Filters;

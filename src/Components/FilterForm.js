import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import Filters from './Filters';

function FilterForm() {
  const {
    handleFilterInput,
    filterByName,
    numericFilter,
    columnFilter,
    setColumnFilter,
    setFilterByNumericValues,
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

  const { column, comparison, value } = inputValues;

  const handleFilterButton = () => {
    const filteredColumn = columnFilter.filter((columnOption) => columnOption !== column);
    setColumnFilter(filteredColumn);
    numericFilter({ column, comparison, value: Number(value) });
  };

  return (
    <section>
      <div className="d-flex justify-content-center mb-3">
        <label
          htmlFor="filterInput"
          className="form-label"
        >
          Search Planets
          <input
            className="form-control"
            id="filterInput"
            value={ filterByName.name }
            data-testid="name-filter"
            type="text"
            onChange={ handleFilterInput }
          />
        </label>
      </div>
      <form className="d-flex justify-content-center row g-3">
        <div className="col-auto">
          <select
            className="form-select"
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
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            id="comparison"
            data-testid="comparison-filter"
            name="comparison"
            value={ comparison }
            onChange={ handleFilterForm }
          >
            <option value="maior que">bigger than</option>
            <option value="igual a">equals</option>
            <option value="menor que">smaller than</option>
          </select>
        </div>
        <div className="col-auto mb-3">
          <input
            className="form-control"
            type="number"
            id="value"
            data-testid="value-filter"
            name="value"
            value={ value }
            onChange={ handleFilterForm }
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-warning"
            type="button"
            data-testid="button-filter"
            onClick={ handleFilterButton }
          >
            Filter
          </button>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-warning"
            type="button"
            data-testid="button-remove-filters"
            onClick={ handleRemoveAllFilters }
          >
            Remove Filters
          </button>
        </div>
        <Filters />
      </form>
    </section>
  );
}

export default FilterForm;

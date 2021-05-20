import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

let years = [];
let currentYear = new Date();
currentYear = currentYear.getFullYear();

for (let i = 1; i <= 18; i += 1) {
  years = years.concat((currentYear).toString());
  currentYear -= 1
}

let YearSelect = (props) => {

  const {handleYearSelection, moviesObject} = props

  let handleYearSelectChange = (e) => {
    handleYearSelection(e.target.value);
  }
  return(
    <select onChange={handleYearSelectChange} value={moviesObject.year} className="year-select" data-testid="yearSelect">
      {years.map((year) => <option value={year} key={year}>{year}</option>)}
    </select>
  );
}

YearSelect.defaultProps = {
  handleYearSelection : () => {}
}

YearSelect.propTypes = {
  handleYearSelection: PropTypes.func,
}

let mapStateToProps = (state) => {
  return {
    moviesObject : state.moviesListReducer
  }
}

export default connect(mapStateToProps, null)(YearSelect);
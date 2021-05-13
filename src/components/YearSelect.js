import React from 'react';
import PropTypes from 'prop-types';

let years = [];
let currentYear = new Date();
currentYear = currentYear.getFullYear();

for (let i = 1; i <= 18; i += 1) {
  years = years.concat((currentYear).toString());
  currentYear -= 1
}

let YearSelect = (props) => {

  const {handleYearSelection} = props

  let handleYearSelectChange = (e) => {
    handleYearSelection(e.target.value);
  }
  return(
    <select onChange={handleYearSelectChange}>
      <option value="">Year</option>
      {years.map((year) => <option value={year}>{year}</option>)}
    </select>
  );
}

YearSelect.defaultProps = {
  handleYearSelection : () => {}
}

YearSelect.propTypes = {
  handleYearSelection: PropTypes.func,
}

export default YearSelect;
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

let years = [];
let currentYear = new Date();
currentYear = currentYear.getFullYear();

for (let i = 1; i <= 18; i += 1) {
  years = years.concat((currentYear).toString());
  currentYear -= 1;
}

const YearSelect = (props) => {
  const { handleYearSelection, moviesObject } = props;

  const handleYearSelectChange = (e) => {
    handleYearSelection(e.target.value);
  };
  return (
    <select onChange={handleYearSelectChange} value={moviesObject.year} className="year-select" data-testid="yearSelect">
      {years.map((year) => <option value={year} key={year}>{year}</option>)}
    </select>
  );
};

YearSelect.defaultProps = {
  handleYearSelection: () => {},
  moviesObject: {},
};

YearSelect.propTypes = {
  handleYearSelection: PropTypes.func,
  moviesObject: PropTypes.instanceOf(Object),
};

const mapStateToProps = (state) => ({
  moviesObject: state.moviesListReducer,
});

export default connect(mapStateToProps, null)(YearSelect);

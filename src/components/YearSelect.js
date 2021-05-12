import React from 'react';

let years = [];
let currentYear = new Date();
currentYear = currentYear.getFullYear();

for (let i = 1; i <= 18; i += 1) {
  years = years.concat((currentYear).toString());
  currentYear -= 1
}

let YearSelect = () => {
  return(
    <select >
      <option value="">Year</option>
      {years.map((year) => <option value={year}>{year}</option>)}
    </select>
  );
}

export default YearSelect;
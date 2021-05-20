import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import {renderWithRedux} from '../CustomRender/RenderWithRedux';

import YearSelect from '../../components/YearSelect';

const initialState = {
  moviesListReducer: {
    movies: [],
    year: '2013',
    genre: '28'
  }
}

test("Year Select should render with the correct value", () => {
  let comp = renderWithRedux(<YearSelect/>, { initialState });
  let el = comp.getByTestId('yearSelect');

  expect(el.value).toBe('2013');
})
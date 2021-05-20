import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRedux from '../CustomRender/RenderWithRedux';

import GenreSelect from '../../components/GenreSelect';

const initialState = {
  genreListReducer: {
    genres: [
      { id: 35, name: 'Comedy' },
      { id: 28, name: 'Thunder' },
    ],
  },
  moviesListReducer: {
    movies: [],
    year: '2013',
    genre: '35',
  },
};

test('Genre Select should render with the correct value', () => {
  const comp = renderWithRedux(<GenreSelect />, { initialState });
  const el = comp.getByTestId('genreSelect');

  expect(el.value).toBe('35');
});

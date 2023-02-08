const genresListInitialState = {};

const moviesListInitialState = {
  movies: [],
  year: new Date().getFullYear(),
  genre: '28|35',
  numberOfPages: 0,
  pageNumber: 1,
  pageNumberArray: []
};

export { genresListInitialState, moviesListInitialState };

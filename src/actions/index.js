const getGenresListAction = (genresObj) => ({
  type: 'GET_GENRES_LIST',
  payLoad: genresObj,
});

const getMoviesListAction = (moviesObj) => ({
  type: 'GET_MOVIES_LIST',
  payLoad: moviesObj,
});

const changeYearAction = (year) => ({
  type: 'CHANGE_YEAR',
  payLoad: year,
});

const changeGenreAction = (genre) => ({
  type: 'CHANGE_GENRE',
  payLoad: genre,
});

const removeMoviesListAction = () => ({
  type: 'REMOVE_MOVIES_LIST',
});

export {
  getGenresListAction,
  getMoviesListAction,
  changeYearAction,
  changeGenreAction,
  removeMoviesListAction,
};

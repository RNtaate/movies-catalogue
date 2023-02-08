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

const setNumberOfPages = (number) => ({
  type: 'SET_NUMBER_OF_PAGES',
  payLoad: number,
})

const setPageNumber = (pageNumber) => ({
  type: "SET_PAGE_NUMBER",
  payLoad: pageNumber
})

const updatePageNumberArray = (arr) => ({
  type: "UPDATE_PAGE_NUMBER_ARRAY",
  payLoad: arr
})

export {
  getGenresListAction,
  getMoviesListAction,
  changeYearAction,
  changeGenreAction,
  removeMoviesListAction,
  setNumberOfPages,
  setPageNumber,
  updatePageNumberArray
};

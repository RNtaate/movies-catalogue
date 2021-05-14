let getGenresListAction = (genresObj) => {
  return {
    type: 'GET_GENRES_LIST',
    payLoad: genresObj
  }
}

let getMoviesListAction = (moviesObj) => {
  return {
    type: 'GET_MOVIES_LIST',
    payLoad: moviesObj
  }  
}

let changeYearAction = (year) => {
  return {
    type: 'CHANGE_YEAR',
    payLoad: year
  }
}

let changeGenreAction = (genre) => {
  return {
    type: 'CHANGE_GENRE',
    payLoad: genre
  }
}

export  {getGenresListAction, getMoviesListAction, changeYearAction, changeGenreAction};
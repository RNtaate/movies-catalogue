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

export  {getGenresListAction, getMoviesListAction};
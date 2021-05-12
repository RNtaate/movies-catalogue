let getGenresListAction = (genresObj) => {
  return {
    type: 'GET_GENRES_LIST',
    payLoad: genresObj
  }
}

export default getGenresListAction;
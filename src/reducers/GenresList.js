import getGenresListInitialState from './InitialStates';

let GenresListReducer = (state = getGenresListInitialState, action) => {
  switch(action.type) {
    case 'GET_GENRES_LIST':
      return action.payLoad;
    default: 
      return state;
  }
}

export default GenresListReducer;
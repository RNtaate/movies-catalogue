import {genresListInitialState} from './InitialStates';

let GenresListReducer = (state = genresListInitialState, action) => {
  switch(action.type) {
    case 'GET_GENRES_LIST':
      return action.payLoad;
    default: 
      return state;
  }
}

export default GenresListReducer;
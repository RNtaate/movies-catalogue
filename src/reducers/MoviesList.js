import {moviesListInitialState} from './InitialStates';

let MoviesListReducer = (state = moviesListInitialState, action) => {
  switch(action.type) {
    case 'GET_MOVIES_LIST':
      return action.payLoad;
    default: 
      return state;
  }
}

export default MoviesListReducer;
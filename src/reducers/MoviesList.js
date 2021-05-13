import {moviesListInitialState} from './InitialStates';

let MoviesListReducer = (state = moviesListInitialState, action) => {
  switch(action.type) {
    case 'GET_MOVIES_LIST':
      return { ...state, movies: action.payLoad};
    default: 
      return state;
  }
}

export default MoviesListReducer;
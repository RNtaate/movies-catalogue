import {moviesListInitialState} from './InitialStates';

let MoviesListReducer = (state = moviesListInitialState, action) => {
  switch(action.type) {
    case 'GET_MOVIES_LIST':
      return { ...state, movies: action.payLoad};
    case 'CHANGE_YEAR':
      return { ...state, year: action.payLoad};
    case 'CHANGE_GENRE':
        return { ...state, genre: action.payLoad};  
    default: 
      return state;
  }
}

export default MoviesListReducer;
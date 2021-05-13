import {moviesListInitialState} from './InitialStates';

let MoviesListReducer = (state = moviesListInitialState, action) => {
  switch(action.type) {
    case 'GET_MOVIES_LIST':
      return { ...state, movies: state.movies.concat(action.payLoad.results)};
    default: 
      return state;
  }
}

export default MoviesListReducer;
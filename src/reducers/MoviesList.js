import { moviesListInitialState } from './InitialStates';

const MoviesListReducer = (state = moviesListInitialState, action) => {
  switch (action.type) {
    case 'GET_MOVIES_LIST':
      return { ...state, movies: state.movies.concat(action.payLoad) };
    case 'CHANGE_YEAR':
      return { ...state, year: action.payLoad };
    case 'CHANGE_GENRE':
      return { ...state, genre: action.payLoad };
    case 'REMOVE_MOVIES_LIST':
      return { ...state, movies: [] };
    default:
      return state;
  }
};

export default MoviesListReducer;

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
    case 'SET_NUMBER_OF_PAGES':
      return {...state, numberOfPages: action.payLoad}
    case 'SET_PAGE_NUMBER':
      return {...state, pageNumber: action.payLoad}
    case 'UPDATE_PAGE_NUMBER_ARRAY': 
      return {...state, pageNumberArray: action.payLoad}
    default:
      return state;
  }
};

export default MoviesListReducer;

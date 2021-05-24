import { combineReducers } from 'redux';
import GenresListReducer from './GenresList';
import MoviesListReducer from './MoviesList';

const allReducers = combineReducers({
  genreListReducer: GenresListReducer,
  moviesListReducer: MoviesListReducer,
});

export default allReducers;

import {combineReducers} from 'redux';
import GenresListReducer from './GenresList';
import MoviesListReducer from './MoviesList';

let allReducers = combineReducers({
  genreListReducer: GenresListReducer,
  moviesListReducer: MoviesListReducer
})

export default allReducers;
import {combineReducers} from 'redux';
import GenresListReducer from './GenresList';

let allReducers = combineReducers({
  genreListReducer: GenresListReducer
})

export default allReducers;
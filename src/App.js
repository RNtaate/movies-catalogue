import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './App.css';

import YearSelect from './components/YearSelect';
import GenreSelect from './components/GenreSelect';
import {fetchGenreList, fetchMoviesList} from './Helpers/FetchMethods';
import { API_KEY } from './Helpers/HelperConstants';
import {getGenresListAction, getMoviesListAction} from './actions/index';
import MovieCard from './components/MovieCard';

function App(props) {

  const [genresLoaded, setGenresLoaded] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);

  const [localListFilters, setLocalListFilters] = useState({
    year: 2021,
    genres: '28|35'
  })

  let {moviesObject, genresObject} = props

  useEffect(() => {
    fetchGenreList(API_KEY).then((result) => {
      props.getMyGenresList(result);
      setGenresLoaded(true);
    }).catch((e) => {
      console.log('Something went horribly wrong and I some how');
    })


    fetchMoviesList(API_KEY, localListFilters.year, localListFilters.genres)
    .then((result) => {
      props.getMyMoviesList(result);
      setMoviesLoaded(true);
    }).catch((e) => {
      console.log('Something went horribly wrong!!!')
    })
  }, [])

  return (
    <div className="App">
      <YearSelect />
      {genresLoaded ? <GenreSelect /> : <p>No Genres Yet</p>}
      <div>
        {moviesLoaded ? moviesObject.results.map((movie) => <MovieCard movie={movie} genresObject={genresObject}/>) : <p>No movies Yet</p>}
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    genresObject : state.genreListReducer,
    moviesObject : state.moviesListReducer
  }
}


let mapDispatchToProps = (dispatch) => {
  return {
    getMyGenresList : (genresObj) => {
      dispatch(getGenresListAction(genresObj));
    },

    getMyMoviesList : (moviesObj) => {
      dispatch(getMoviesListAction(moviesObj));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

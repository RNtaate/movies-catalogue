import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './App.css';

import YearSelect from './components/YearSelect';
import GenreSelect from './components/GenreSelect';
import {fetchGenreList, fetchMoviesList} from './Helpers/FetchMethods';
import { API_KEY } from './Helpers/HelperConstants';
import {getGenresListAction, getMoviesListAction} from './actions/index';
import MovieCard from './components/MovieCard';

let App = (props) => {

  const [genresLoaded, setGenresLoaded] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const PAGENUMBERS = 3;

  const [localListFilters, setLocalListFilters] = useState({
    year: 2021,
    genres: '28|35'
  })

  let {moviesObject, genresObject} = props

  let getBulkMoviesList = () => {

    let numberOfPages = 0;
    let moviesArray = [];

    fetchMoviesList(API_KEY, localListFilters.year, localListFilters.genres)
    .then((result) => {
      moviesArray = moviesArray.concat(result.results);
      props.getMyMoviesList(moviesArray);
      numberOfPages = result.total_pages;
      setMoviesLoaded(true);

      if(numberOfPages > 1){
        for(let i = 2; i <= PAGENUMBERS; i += 1) {
          if(i <= numberOfPages) {
            fetchMoviesList(API_KEY, localListFilters.year, localListFilters.genres, i)
            .then((result) => {
              moviesArray = moviesArray.concat(result.results);
              props.getMyMoviesList(moviesArray);
            }).catch((e) => {
              console.log('Something went horribly wrong!!!')
            })
          }
        }
      }

    }).catch((e) => {
      console.log('Something went horribly wrong!!!')
    })
  }

  let handleYearSelection = (yearValue) => {
    setLocalListFilters({ ...localListFilters, year: yearValue});
  }

  let handleGenresSelection = (genreValue) => {
    setLocalListFilters({ ...localListFilters, genres: genreValue});
  }

  useEffect(() => {
    fetchGenreList(API_KEY).then((result) => {
      props.getMyGenresList(result);
      setGenresLoaded(true);
    }).catch((e) => {
      console.log('Something went horribly wrong and I some how');
    })

    // getBulkMoviesList();
  }, [])

  return (
    <div className="App">
      <YearSelect handleYearSelection={handleYearSelection}/>
      {genresLoaded ? <GenreSelect handleGenresSelection={handleGenresSelection}/> : <p>No Genres Yet</p>}
      <button onClick={getBulkMoviesList}>Submit Filter</button>
      <div>
        {moviesLoaded ? moviesObject.movies.map((movie) => <MovieCard movie={movie} genresObject={genresObject}/>) : <p>No movies Yet</p>}
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

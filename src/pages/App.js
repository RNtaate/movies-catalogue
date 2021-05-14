import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import '../App.css';

import YearSelect from '../components/YearSelect';
import GenreSelect from '../components/GenreSelect';
import {fetchGenreList, fetchMoviesList} from '../Helpers/FetchMethods';
import { API_KEY } from '../Helpers/HelperConstants';
import {getGenresListAction, getMoviesListAction, changeYearAction, changeGenreAction} from '../actions/index';
import MovieCard from '../components/MovieCard';

let App = (props) => {

  const [genresLoaded, setGenresLoaded] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const PAGENUMBERS = 3;

  let {moviesObject, genresObject} = props

  let getBulkMoviesList = () => {

    let numberOfPages = 0;
    let moviesArray = [];

    fetchMoviesList(API_KEY, moviesObject.year, moviesObject.genre)
    .then((result) => {
      moviesArray = moviesArray.concat(result.results);
      props.getMyMoviesList(moviesArray);
      numberOfPages = result.total_pages;
      setMoviesLoaded(true);

      if(numberOfPages > 1){
        for(let i = 2; i <= PAGENUMBERS; i += 1) {
          if(i <= numberOfPages) {
            fetchMoviesList(API_KEY, moviesObject.year, moviesObject.genre, i)
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
    props.changeMyYear(yearValue);
  }

  let handleGenresSelection = (genreValue) => {
    props.changeMyGenre(genreValue);
  }

  useEffect(() => {
    if(!genresObject.genres){
      fetchGenreList(API_KEY).then((result) => {
        props.getMyGenresList(result);
        setGenresLoaded(true);
      }).catch((e) => {
        console.log('Something went horribly wrong and I some how');
      })
    }

    // getBulkMoviesList();
  }, [])

  return (
    <div className="App">
      <YearSelect handleYearSelection={handleYearSelection}/>
      {genresObject.genres ? <GenreSelect handleGenresSelection={handleGenresSelection}/> : <p>No Genres Yet</p>}
      <button onClick={getBulkMoviesList}>Submit Filter</button>
      <div>
        {moviesObject.movies.length !== 0 ? moviesObject.movies.map((movie) => <MovieCard movie={movie} genresObject={genresObject}/>) : <p>No movies Yet</p>}
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
    },

    changeMyYear : (year) => {
      dispatch(changeYearAction(year));
    },
    changeMyGenre : (genre) => {
      dispatch(changeGenreAction(genre));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

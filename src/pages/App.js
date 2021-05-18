import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import * as styling from './App.module.css';

import YearSelect from '../components/YearSelect';
import GenreSelect from '../components/GenreSelect';
import {fetchGenreList, fetchMoviesList} from '../Helpers/FetchMethods';
import { API_KEY } from '../Helpers/HelperConstants';
import {getGenresListAction, getMoviesListAction, changeYearAction, changeGenreAction} from '../actions/index';
import MovieCard from '../components/MovieCard';

let App = (props) => {

  const [genresLoaded, setGenresLoaded] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    moviesListErrorMessage: 'No Filter Submitted. Click on the "Submit Filter" button to display your first selection of movies from the year "2021" and the "Action, Comedy" genres.',

    genresListErrorMessage: 'No Genres Fetched'
  });
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
              setErrorMessage({...errorMessage, moviesListErrorMessage: "Sorry!, something's wrong"});
            })
          }
        }
      }

    }).catch((e) => {
      setErrorMessage({...errorMessage, moviesListErrorMessage: 'Sorry!, something went wrong. This could be due to a number of reasons such as "Poor or No internet connection". Please try again later'}); 
    })
  }

  let resetMovieList = () => {
    props.getMyMoviesList([]);
    setErrorMessage({...errorMessage, moviesListErrorMessage: 'Loading ...'});
  }

  let handleFetchingMovies = () => {
    resetMovieList();
    setTimeout(() => {
      getBulkMoviesList();
    }, 500);
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
        setErrorMessage({...errorMessage, genresListErrorMessage: 'Genre Load Failed!'})
      })
    }

    // getBulkMoviesList();
  }, [])

  return (
  
      <div className={styling.app_container_div}>
        <header className={styling.header_div}>
          <h1>NORP <small>MOVIES</small></h1>
          <div className={styling.selection_div}>
            <YearSelect handleYearSelection={handleYearSelection}/>
            {genresObject.genres ? <GenreSelect handleGenresSelection={handleGenresSelection}/> : <p className={styling.genre_error_par}>{errorMessage.genresListErrorMessage}</p>}
            <button onClick={handleFetchingMovies} className={styling.submit_button}>Submit Filter</button>
          </div>
        </header>
        
        <div className={styling.movieList_div}>
          {moviesObject.movies.length !== 0 ? moviesObject.movies.map((movie) => <div className={styling.movieCard_holder_div}><MovieCard movie={movie} genresObject={genresObject}/></div>) : <p className={styling.movie_error_par}>{errorMessage.moviesListErrorMessage}</p>}
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

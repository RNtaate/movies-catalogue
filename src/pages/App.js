import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as styling from './App.module.css';

import YearSelect from '../components/YearSelect';
import GenreSelect from '../components/GenreSelect';
import { fetchGenreList, fetchMoviesList } from '../Helpers/FetchMethods';
import { API_KEY } from '../Helpers/HelperConstants';
import {
  getGenresListAction, getMoviesListAction, changeYearAction, changeGenreAction,
  removeMoviesListAction,
} from '../actions/index';
import MovieCard from '../components/MovieCard';

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState({
    moviesListErrorMessage: 'No Filter Submitted. Click on the "Submit Filter" button to display your first selection of movies from the year "2021" and the "Action, Comedy" genres.',

    genresListErrorMessage: 'No Genres Fetched',
  });
  const PAGENUMBERS = 3;

  const { moviesObject, genresObject } = props;

  const getBulkMoviesList = () => {
    let numberOfPages = 0;
    let moviesArray = [];

    fetchMoviesList(API_KEY, moviesObject.year, moviesObject.genre)
      .then((result) => {
        moviesArray = moviesArray.concat(result.results);
        props.getMyMoviesList(moviesArray);
        numberOfPages = result.total_pages;

        if (numberOfPages > 1) {
          for (let i = 2; i <= PAGENUMBERS; i += 1) {
            if (i <= numberOfPages) {
              fetchMoviesList(API_KEY, moviesObject.year, moviesObject.genre, i)
                .then((result) => {
                  props.getMyMoviesList(result.results);
                }).catch(() => {
                  setErrorMessage({ ...errorMessage, moviesListErrorMessage: "Sorry!, something's wrong" });
                });
            }
          }
        }
      }).catch(() => {
        setErrorMessage({ ...errorMessage, moviesListErrorMessage: 'Sorry!, something went wrong. This could be due to a number of reasons such as "Poor or No internet connection". Please try again later' });
      });
  };

  const resetMovieList = () => {
    props.removeMyMoviesList();
    setErrorMessage({ ...errorMessage, moviesListErrorMessage: 'Loading ...' });
  };

  const handleFetchingMovies = () => {
    resetMovieList();
    setTimeout(() => {
      getBulkMoviesList();
    }, 500);
  };

  const handleYearSelection = (yearValue) => {
    props.changeMyYear(yearValue);
  };

  const handleGenresSelection = (genreValue) => {
    props.changeMyGenre(genreValue);
  };

  useEffect(() => {
    if (!genresObject.genres) {
      fetchGenreList(API_KEY).then((result) => {
        props.getMyGenresList(result);
      }).catch(() => {
        setErrorMessage({ ...errorMessage, genresListErrorMessage: 'Genre Load Failed!' });
      });
    }

  }, []);

  return (

    <div className={styling.app_container_div}>
      <header className={styling.header_div}>
        <h1 data-testid="main-heading">
          NORP
          {' '}
          <small>MOVIES</small>
        </h1>
        <div className={styling.selection_div}>
          <YearSelect handleYearSelection={handleYearSelection} />
          {genresObject.genres
            ? <GenreSelect handleGenresSelection={handleGenresSelection} />
            : <p className={styling.genre_error_par}>{errorMessage.genresListErrorMessage}</p>}
          <button onClick={handleFetchingMovies} className={styling.submit_button} type="button">Submit Filter</button>
        </div>
      </header>

      <div className={styling.movieList_div}>
        {moviesObject.movies.length !== 0
          ? moviesObject.movies.map((movie) => (
            <div className={styling.movieCard_holder_div} key={movie.id}>
              <MovieCard movie={movie} genresObject={genresObject} />
            </div>
          ))
          : <p className={styling.movie_error_par}>{errorMessage.moviesListErrorMessage}</p>}
      </div>

    </div>

  );
};

App.defaultProps = {
  genresObject: {},
  moviesObject: {},
  getMyMoviesList: () => {},
  getMyGenresList: () => {},
  changeMyYear: () => {},
  changeMyGenre: () => {},
  removeMyMoviesList: () => {},
};

App.propTypes = {
  genresObject: PropTypes.instanceOf(Object),
  moviesObject: PropTypes.instanceOf(Object),
  getMyMoviesList: PropTypes.func,
  getMyGenresList: PropTypes.func,
  changeMyYear: PropTypes.func,
  changeMyGenre: PropTypes.func,
  removeMyMoviesList: PropTypes.func,
};

const mapStateToProps = (state) => ({
  genresObject: state.genreListReducer,
  moviesObject: state.moviesListReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getMyGenresList: (genresObj) => {
    dispatch(getGenresListAction(genresObj));
  },

  getMyMoviesList: (moviesObj) => {
    dispatch(getMoviesListAction(moviesObj));
  },

  changeMyYear: (year) => {
    dispatch(changeYearAction(year));
  },
  changeMyGenre: (genre) => {
    dispatch(changeGenreAction(genre));
  },
  removeMyMoviesList: () => {
    dispatch(removeMoviesListAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

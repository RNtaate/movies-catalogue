import React, { useState, useEffect ,useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as styling from './App.module.css';

import YearSelect from '../YearSelect';
import GenreSelect from '../GenreSelect';
import { fetchGenreList, fetchMoviesList } from '../../components/Helpers/FetchMethods';
import { API_KEY } from '../../components/Helpers/HelperConstants';
import {
  getGenresListAction, getMoviesListAction, changeYearAction, changeGenreAction,
  removeMoviesListAction,
  setNumberOfPages,
  setPageNumber
} from '../../actions/index';
import MovieCard from '../../components/MovieCard'; 

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState({
    moviesListErrorMessage: 'No Filter Submitted. Click on the "Submit Filter" button to display your first selection of movies from the year "2021" and the "Action, Comedy" genres.',

    genresListErrorMessage: 'No Genres Fetched',
  });
  const PAGENUMBERS = 3;


  const [loading, setLoading] = useState(false);

  const lastMovieCard = useCallback( node => {
    console.log(node)
  }, [])

  const { moviesObject, genresObject } = props;

  const getBulkMoviesList = () => {
    let numberOfPages = 0;
    let moviesArray = [];
    setLoading(true);

    fetchMoviesList(API_KEY, moviesObject.year, moviesObject.genre)
      .then((result) => {
        moviesArray = moviesArray.concat(result.results);
        props.getMyMoviesList(moviesArray);
        props.setTotalPages(result.total_pages)
        setLoading(false)

        // if (numberOfPages > 1) {
        //   for (let i = 2; i <= PAGENUMBERS; i += 1) {
        //     if (i <= numberOfPages) {
        //       fetchMoviesList(API_KEY, moviesObject.year, moviesObject.genre, i)
        //         .then((result) => {
        //           props.getMyMoviesList(result.results);
        //         }).catch(() => {
        //           setErrorMessage({ ...errorMessage, moviesListErrorMessage: "Sorry!, something's wrong" });
        //         });
        //     }
        //   }
        // }
      }).catch((e) => {
        setErrorMessage({ ...errorMessage, moviesListErrorMessage: e.message ? e.message : 'Sorry!, something went wrong. This could be due to a number of reasons such as "Poor or No internet connection". Please try again later' });
        setLoading(false);
      });
  };

  const resetMovieList = () => {
    props.removeMyMoviesList();
    setErrorMessage({ ...errorMessage, moviesListErrorMessage: '' });
    setLoading(true);
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
        props.setListNumberOfPages
      }).catch(() => {
        setErrorMessage({ ...errorMessage, genresListErrorMessage: 'Genre Load Failed!' });
        setLoading(false)
      });
    }

    if (moviesObject.movies.length === 0) {
      handleFetchingMovies();
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
        {moviesObject.movies.length > 0
          && moviesObject.movies.map((movie, index) => {
            if(moviesObject.movies.length == index + 1) {
              return (<div className={styling.movieCard_holder_div} ref={lastMovieCard} key={movie.id}>
                <MovieCard movie={movie} genresObject={genresObject} />
              </div>)
            } else {
              return (<div className={styling.movieCard_holder_div} key={movie.id}>
                <MovieCard movie={movie} genresObject={genresObject} />
              </div>)              
            }
          })}

        {loading && <p className={styling.movie_error_par}>Loading ...</p>}

        {errorMessage.moviesListErrorMessage && <p className={styling.movie_error_par}>{errorMessage.moviesListErrorMessage}</p>}
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
  setTotalPages: () => {},
};

App.propTypes = {
  genresObject: PropTypes.instanceOf(Object),
  moviesObject: PropTypes.instanceOf(Object),
  getMyMoviesList: PropTypes.func,
  getMyGenresList: PropTypes.func,
  changeMyYear: PropTypes.func,
  changeMyGenre: PropTypes.func,
  removeMyMoviesList: PropTypes.func,
  setTotalPages: PropTypes.func,
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
  setTotalPages: (pagesTotal) => {
    dispatch(setNumberOfPages(pagesTotal))
  },
  setMoviesPageNumber: (currentPageNumber) => {
    dispatch(setPageNumber(currentPageNumber))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

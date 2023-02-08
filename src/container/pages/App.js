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
  setPageNumber,
  updatePageNumberArray
} from '../../actions/index';
import MovieCard from '../../components/MovieCard'; 

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState({
    moviesListErrorMessage: '',

    genresListErrorMessage: 'No Genres Fetched',
  });
  const MAXIMUMPAGENUMBERS = 3;


  const [loading, setLoading] = useState(false);

  const lastMovieCard = useCallback( node => {
    console.log(node)
  }, [])

  const { moviesObject, genresObject } = props;

  const getBulkMoviesList = () => {
    let moviesArray = [];
    setLoading(true);

    fetchMoviesList(API_KEY, moviesObject.year, moviesObject.genre, moviesObject.pageNumber)
      .then((result) => {
        moviesArray = moviesArray.concat(result.results);
        props.getMyMoviesList(moviesArray);
        props.setTotalPages(result.total_pages)
        props.updatePageNumberCollection([...moviesObject.pageNumberArray, result.page])
        setErrorMessage({ ...errorMessage, moviesListErrorMessage: '' });
        setLoading(false)

      }).catch((e) => {
        setErrorMessage({ ...errorMessage, moviesListErrorMessage: e.message ? e.message : 'Sorry!, something went wrong. This could be due to a number of reasons such as "Poor or No internet connection". Please try again later' });
        setLoading(false);
      });
  };

  const resetMovieList = () => {
    props.removeMyMoviesList();
    setErrorMessage({ ...errorMessage, moviesListErrorMessage: '' });
    setLoading(true);
    props.updatePageNumberCollection([]);
    if(moviesObject.pageNumber == 1){
      console.log("I am running in the resetMovieList function")
       getBulkMoviesList();
    }
    props.setCurrentPageNumber(1)
  };

  const handleFetchingMovies = () => {
    // resetMovieList();
    setTimeout(() => {
      getBulkMoviesList();
    }, 100);
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
        setLoading(false)
      });
    }

    if(!(moviesObject.pageNumberArray.includes(moviesObject.pageNumber))){
      console.log("I am going to fetch some stuff in the useEffect")
      getBulkMoviesList();
    }

  }, [moviesObject.pageNumber]);

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
          <button onClick={resetMovieList} className={styling.submit_button} type="button">Search</button>
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

        {errorMessage.moviesListErrorMessage && <p className={styling.movie_error_par}>{errorMessage.moviesListErrorMessage}</p>}
      </div>
      
      {loading && <p className={styling.movie_error_par}>Loading ...</p>}

      {loading || errorMessage.moviesListErrorMessage || (moviesObject.pageNumber == MAXIMUMPAGENUMBERS) ? null : 
      <button onClick={() => props.setCurrentPageNumber(moviesObject.pageNumber + 1)} className={styling.load_more_btn} type="button">Load More ...</button> }
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
  setCurrentPageNumber: () => {},
  updatePageNumberCollection: () => {}
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
  updatePageNumberCollection: PropTypes.func
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
  setCurrentPageNumber: (currentPageNumber) => {
    dispatch(setPageNumber(currentPageNumber))
  },
  updatePageNumberCollection: (numberArray) => {
    dispatch(updatePageNumberArray(numberArray))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

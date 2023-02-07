import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as styler from './MovieDetails.module.css';
import spinner from '../../assets/image_loading2.gif';
import noBackdrop from '../../assets/no_poster2.png';
import { fetchMovieDetails } from '../Helpers/FetchMethods';
import { API_KEY } from '../Helpers/HelperConstants';

const MovieDetails = () => {
  const [movieObj, setMovieObj] = useState({});
  const [movieDetails, setMovieDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('Loading');

  const getMyMovieDetails = (apiKey, movieId) => {
    fetchMovieDetails(apiKey, movieId)
      .then((result) => {
        setMovieObj(result);

        const myMovieDetailsObj = {};

        let genreIds = [];
        genreIds = genreIds.concat(result.genres.map((el) => el.name));

        myMovieDetailsObj.movieGenreNames = genreIds.join(', ');

        myMovieDetailsObj.backdropPath = result.backdrop_path === null ? noBackdrop : `https://image.tmdb.org/t/p/original${result.backdrop_path}`;

        setMovieDetails(myMovieDetailsObj);
      }).catch(() => {
        setErrorMessage('Sorry!, something went wrong. This could be due to a number of reasons such as "Poor or No internet connection". Please try again later');
      });
  };

  useEffect(() => {
    const myArray = window.location.href.split('/');
    const myMovieId = myArray[myArray.length - 1];

    getMyMovieDetails(API_KEY, myMovieId);
  }, []);

  return (
    <div className={styler.movie_details_container_div}>
      <Link to="/" className={styler.back_link}><i className="fas fa-arrow-circle-left" /></Link>
      <div className={styler.movie_details_div} style={{ backgroundImage: errorMessage === 'Loading' ? `url("${spinner}")` : '' }}>
        {movieObj.title
          ? (
            <div className={styler.movie_content_div} style={{ backgroundImage: `linear-gradient(to top right, rgba(0, 0, 17, 0.8) 30%, transparent), url("${movieDetails.backdropPath}")` }}>
              <h2 className={styler.movie_desc_title}>{movieObj.title}</h2>
              <p className={styler.movie_desc_par}>
                <strong>OVERVIEW:</strong>
                {' '}
                {movieObj.overview}
              </p>
              <p className={styler.movie_desc_genre}>
                (
                {' '}
                {movieDetails.movieGenreNames}
                {' '}
                )
              </p>
              <div className={styler.movie_desc_rating_div}>
                {Array.from(Array(Math.round(movieObj.vote_average)).keys()).map((el) => <i className="fas fa-star" style={{ color: 'orange', marginRight: '5px' }} key={el} />)}
                <span>
                  {Math.round(movieObj.vote_average)}
                  {' '}
                  / 10
                </span>
              </div>
            </div>
          )
          : (
            <div className={styler.error_message_div}>
              <p>{errorMessage !== 'Loading' ? errorMessage : ''}</p>
            </div>
          ) }
      </div>
    </div>
  );
};

export default MovieDetails;

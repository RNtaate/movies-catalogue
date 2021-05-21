import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertToGenreNames from '../Helpers/HelperMethods';
import * as styles from './MovieCard.module.css';
import spinner from '../assets/image_loading5.gif';
import noPoster from '../assets/no_poster1.jpeg';

const MovieCard = (props) => {
  const { movie, genresObject } = props;

  const movieGenreNames = convertToGenreNames(movie.genre_ids, genresObject.genres);

  const posterPath = movie.poster_path === null ? noPoster : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (

    <div>
      <Link to={`/movie/${movie.id}`} className={styles.movieCard_container_div}>
        <div className={styles.movieCard_poster_div} style={{ backgroundImage: `url("${posterPath}"), url("${spinner}")` }} />

        <div className={styles.movieCard_content_div}>
          <h2 className={styles.title}>{movie.title}</h2>
          <div className={styles.rating_genres_div}>
            <p className={styles.genre}>{movieGenreNames}</p>
            <span className={styles.rating}>
              <i className="fas fa-star" style={{ color: 'orange', marginRight: '5px' }} />
              {' '}
              {Math.round(movie.vote_average)}
              /10
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.instanceOf(Object).isRequired,
  genresObject: PropTypes.instanceOf(Object).isRequired,
};

export default MovieCard;

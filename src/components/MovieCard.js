import React from 'react';
import {convertToGenreNames} from '../Helpers/HelperMethods';
import {Link} from 'react-router-dom';
import * as styles from './MovieCard.module.css'

let MovieCard = (props) => {

  const {movie, genresObject} = props;

  let movieGenreNames = convertToGenreNames(movie.genre_ids, genresObject.genres);

  return (

    <div >
      <Link to={{
        pathname: '/details',
        state: {
          movieObj : movie,
          genresObj: genresObject
        }
      }} className={styles.movieCard_container_div}>
        <div className={styles.movieCard_poster_div} style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.poster_path}")`}}></div>

        <div className={styles.movieCard_content_div}>
          <h2 className={styles.title}>{movie.title}</h2>
          <div className={styles.rating_genres_div}>
            <p className={styles.genre}>{movieGenreNames}</p>
            <span className={styles.rating}><i class="fas fa-star" style={{color: 'orange', marginRight: "5px"}}></i> {Math.round(movie.vote_average)}/10</span>
          </div>
        </div>
      </Link>
    </div>

  )
}

export default MovieCard;
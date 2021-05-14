import React from 'react';
import {convertToGenreNames} from '../Helpers/HelperMethods';
import {Link} from 'react-router-dom';

let MovieCard = (props) => {
  const {movie, genresObject} = props;

  let movieGenreNames = convertToGenreNames(movie.genre_ids, genresObject.genres);
  return (
    <Link to={{
      pathname: '/details',
      state: {
        movieObj : movie,
        genresObj: genresObject
      }
    }}>
      <div style={{marginBottom: '20px'}}>
        <h2>Title: {movie.title}</h2>
        <h4>Genres: {movieGenreNames}</h4>
        <h4>Rating: {movie.vote_average}</h4>
      </div>
    </Link>
  )
}

export default MovieCard;
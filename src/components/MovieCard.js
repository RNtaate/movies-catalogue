import React from 'react';
import {convertToGenreNames} from '../Helpers/HelperMethods';

let MovieCard = (props) => {
  const {movie, genresObject} = props;

  let movieGenreNames = convertToGenreNames(movie.genre_ids, genresObject.genres);
  return (
    <div style={{marginBottom: '20px'}}>
      <h2>Title: {movie.title}</h2>
      <h4>Genres: {movieGenreNames}</h4>
      <h4>Rating: {movie.vote_average}</h4>
    </div>
  )
}

export default MovieCard;
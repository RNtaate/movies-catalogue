import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import {convertToGenreNames} from '../Helpers/HelperMethods';

let MovieDetails = () => {

  let location = useLocation();

  let { movieObj, genresObj } = location.state;
  let movieGenreNames = convertToGenreNames(movieObj.genre_ids, genresObj.genres);

  return (
    <div className="movie-details-div">
      <Link to="/">Back</Link>
      <div className="movie-content-div">
        <h2>Movie Title</h2>
        <h2>{movieObj.title}</h2>
        <p>{movieObj.overview}</p>
        <p>Genre: {movieGenreNames}</p>
        <p>Rating: {movieObj.vote_average}</p>
      </div>
    </div>
  )
}

export default MovieDetails;
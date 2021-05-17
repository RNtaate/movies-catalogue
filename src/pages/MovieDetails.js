import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import {convertToGenreNames} from '../Helpers/HelperMethods';
import * as styler from './MovieDetails.module.css';
import spinner from '../assets/image_loading2.gif';
import  noBackdrop from '../assets/no_poster2.png';

let MovieDetails = () => {

  let location = useLocation();

  let { movieObj, genresObj } = location.state;
  let movieGenreNames = convertToGenreNames(movieObj.genre_ids, genresObj.genres);
  let rating = Math.round(movieObj.vote_average)

  let stars = new Array(rating).fill(1);

  let backdrop_path = movieObj.backdrop_path === null ? noBackdrop : `https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`

  return (
    <div className={styler.movie_details_container_div}>
      <Link to="/" className={styler.back_link}><i class="fas fa-arrow-circle-left"></i></Link>
      <div className={styler.movie_details_div} style={{backgroundImage: `url("${backdrop_path}"), url("${spinner}")`}}>
        <div className={styler.movie_content_div}>
          <h2 className={styler.movie_desc_title}>{movieObj.title}</h2>
          <p className={styler.movie_desc_par}><strong>OVERVIEW:</strong> {movieObj.overview}</p>
          <p className={styler.movie_desc_genre}>( {movieGenreNames} )</p>
          <div className={styler.movie_desc_rating_div}>
            {stars.map(el => <i class="fas fa-star" style={{color: 'orange', marginRight: "5px"}}></i>)}
            <span>{movieObj.vote_average}</span></div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails;
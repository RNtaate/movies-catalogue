import React from 'react';
import { connect } from 'react-redux';

let GenreSelect = (props) => {

  let {genresObject, handleGenresSelection, moviesObject} = props;

  let handleGenresSelectChange = (e) => {
    handleGenresSelection(e.target.value);
  }

  return (
    <select onChange={handleGenresSelectChange} value={moviesObject.genre} className="genre-select">
      <option value="28|35" key="28|35">Genres</option>
      {genresObject.genres.map((genre) => <option value={genre.id} key={genre.id}>{genre.name}</option>)}
    </select>
  )
}

let mapStateToProps = (state) => {
  return {
    genresObject : state.genreListReducer,
    moviesObject : state.moviesListReducer
  }
}

export default connect(mapStateToProps, null)(GenreSelect);
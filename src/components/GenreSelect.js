import React from 'react';
import { connect } from 'react-redux';

let GenreSelect = (props) => {

  let {genresObject, handleGenresSelection} = props;

  let handleGenresSelectChange = (e) => {
    handleGenresSelection(e.target.value);
  }

  return (
    <select onChange={handleGenresSelectChange}>
      <option value="28|35">Genres</option>
      {genresObject.genres.map((genre) => <option value={genre.id}>{genre.name}</option>)}
    </select>
  )
}

let mapStateToProps = (state) => {
  return {
    genresObject : state.genreListReducer
  }
}

export default connect(mapStateToProps, null)(GenreSelect);
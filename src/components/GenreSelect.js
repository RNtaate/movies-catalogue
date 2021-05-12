import React from 'react';
import { connect } from 'react-redux';

let GenreSelect = (props) => {

  let {genresObject} = props

  return (
    <select>
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
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GenreSelect = (props) => {
  const { genresObject, handleGenresSelection, moviesObject } = props;

  const handleGenresSelectChange = (e) => {
    handleGenresSelection(e.target.value);
  };

  return (
    <select onChange={handleGenresSelectChange} value={moviesObject.genre} className="genre-select" data-testid="genreSelect">
      <option value="28|35" key="28|35">Genres</option>
      {genresObject.genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

GenreSelect.defaultProps = {
  handleGenresSelection: () => {},
};

GenreSelect.propTypes = {
  genresObject: PropTypes.instanceOf(Object).isRequired,
  moviesObject: PropTypes.instanceOf(Object).isRequired,
  handleGenresSelection: PropTypes.func,
};

const mapStateToProps = (state) => ({
  genresObject: state.genreListReducer,
  moviesObject: state.moviesListReducer,
});

export default connect(mapStateToProps, null)(GenreSelect);

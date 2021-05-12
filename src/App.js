import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './App.css';

import YearSelect from './components/YearSelect';
import GenreSelect from './components/GenreSelect';
import fetchGenreList from './Helpers/FetchMethods';
import { API_KEY } from './Helpers/HelperConstants';
import getGenresListAction from './actions/index';

function App(props) {

  const [genresLoaded, setGenresLoaded] = useState(false);

  useEffect(() => {
    fetchGenreList(API_KEY).then((result) => {
      props.getMyGenresList(result);
      setGenresLoaded(true);
    }).catch((e) => {
      console.log('Something went horribly wrong and I some how');
    })
  }, [])

  return (
    <div className="App">
      <YearSelect />
      {genresLoaded ? <GenreSelect /> : <p>No Genres Yet</p>}
    </div>
  );
}

let mapDispatchToProps = (dispatch) => {
  return {
    getMyGenresList : (genresObj) => {
      dispatch(getGenresListAction(genresObj));
    }
  }
}

export default connect(null, mapDispatchToProps)(App);

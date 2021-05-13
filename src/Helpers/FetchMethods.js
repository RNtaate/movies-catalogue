import {API_KEY, getGenreListUrl, getMovieListUrl} from './HelperConstants';

let fetchGenreList = async (api_key) => {
  let url = getGenreListUrl(api_key);
  let req = await fetch(url);
  let response = await req.json();

  return response;
}

let fetchMoviesList = async (api_key, year, genreList) => {
  let url = getMovieListUrl(api_key, year, genreList);
  let req = await fetch(url);
  let response = await req.json();

  return response;
}

export {fetchGenreList, fetchMoviesList};
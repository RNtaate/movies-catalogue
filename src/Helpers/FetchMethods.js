import {API_KEY, getGenreListUrl, getMovieListUrl} from './HelperConstants';

let fetchGenreList = async (api_key) => {
  let url = getGenreListUrl(api_key);
  let req = await fetch(url);
  let response = await req.json();

  return response;
}

let fetchMoviesList = async (api_key, year, genreList, page=1) => {
  let url = getMovieListUrl(api_key, year, genreList, page);
  let req = await fetch(url);
  let response = await req.json();

  return response;
}

export {fetchGenreList, fetchMoviesList};
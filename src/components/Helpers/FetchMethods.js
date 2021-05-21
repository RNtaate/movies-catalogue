import { getGenreListUrl, getMovieListUrl, getMovieDetailsUrl } from './HelperConstants';

const fetchGenreList = async (apiKey) => {
  const url = getGenreListUrl(apiKey);
  const req = await fetch(url);
  const response = await req.json();

  return response;
};

const fetchMoviesList = async (apiKey, year, genreList, page = 1) => {
  const url = getMovieListUrl(apiKey, year, genreList, page);
  const req = await fetch(url);
  const response = await req.json();

  return response;
};

const fetchMovieDetails = async (apiKey, movieId) => {
  const url = getMovieDetailsUrl(apiKey, movieId);
  const req = await fetch(url);
  const response = await req.json();

  return response;
};

export { fetchGenreList, fetchMoviesList, fetchMovieDetails };

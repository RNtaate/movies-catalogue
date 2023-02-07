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
    if (!req.ok) {
      throw new Error(`Something is corrupted, cannot fetch movies at this time.`);
    }
    const response = await req.json();
    return response;
};

const fetchMovieDetails = async (apiKey, movieId) => {
  const url = getMovieDetailsUrl(apiKey, movieId);
  const req = await fetch(url);
  if (!req.ok) {
    throw new Error(`Request failed with status code ${req.status}`);
  }

  const response = await req.json();

  return response;
};

export { fetchGenreList, fetchMoviesList, fetchMovieDetails };

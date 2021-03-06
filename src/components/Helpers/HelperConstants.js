export const API_KEY = process.env.REACT_APP_API_KEY;

export const getGenreListUrl = (apiKey) => `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

export const getMovieListUrl = (apiKey, year, genreList, page = 1) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_year=${year}&with_genres=${genreList}&with_original_language=en`;

export const getMovieDetailsUrl = (apiKey, movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

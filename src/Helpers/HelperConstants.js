export const API_KEY = 'd6d714118fedcc0f16131a2c86c27bfa';

export const getGenreListUrl = (apiKey) => `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

export const getMovieListUrl = (apiKey, year, genreList, page = 1) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&primary_release_year=${year}&with_genres=${genreList}&with_original_language=en`;

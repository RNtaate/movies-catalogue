export const API_KEY = 'd6d714118fedcc0f16131a2c86c27bfa';

export let  getGenreListUrl = (api_key) => {
  return `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
}

export let getMovieListUrl = (api_key, year, genreList) => {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&with_genres=${genreList}&with_original_language=en`
}
export const API_KEY = 'd6d714118fedcc0f16131a2c86c27bfa';

export let  getGenreListUrl = (api_key) => {
  return `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
}
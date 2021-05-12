import {API_KEY, getGenreListUrl} from './HelperConstants';

let fetchGenreList = async (api_key) => {
  let url = getGenreListUrl(api_key);
  let req = await fetch(url);
  let response = await req.json();

  return response;
}

export default fetchGenreList;
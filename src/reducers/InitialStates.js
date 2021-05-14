let currentYear = new Date();


let genresListInitialState = {};

let moviesListInitialState = {
  movies : [], 
  year: currentYear.getFullYear,
  genre: '28|35'
};

export {genresListInitialState, moviesListInitialState};
import {convertToGenreNames} from '../../Helpers/HelperMethods';

let genreArray = [28, 35, 18];
let genresObjectArray = [
  {id: 35, name: 'Comedy'},
  {id: 28, name: 'Action'},
  {id: 18, name: 'Drama'},
  {id: 107, name: 'Horror'},
  {id: 55, name: 'Documentary'}
]

test('Should return a value', () => {
  let myName = convertToGenreNames(genreArray, genresObjectArray);
  expect(myName !== null).toBeTruthy();
  expect(myName).not.toBeNull();
})

test('Should not return undefined', () => {
  let myName = convertToGenreNames(genreArray, genresObjectArray);
  expect(myName).not.toBeUndefined();
})

test('Should return a value of type string', () => {
  let myName = convertToGenreNames(genreArray, genresObjectArray);
  expect(typeof myName).toBe('string');
})

test('Should return a comma seperated list of genres', () => {
  let myName = convertToGenreNames(genreArray, genresObjectArray);
  expect(myName).toBe('Action, Comedy, Drama');
})

test('Should return the correct list of genre names based on the genre ids', () => {
  let myName = convertToGenreNames(genreArray, genresObjectArray);
  expect(myName === 'Action, Comedy, Drama').toBeTruthy();

  let newGenreArray = [28, 35, 107];
  myName = convertToGenreNames(newGenreArray, genresObjectArray);
  expect(myName === 'Action, Comedy, Drama').toBeFalsy();
  expect(myName === 'Action, Comedy, Horror').toBeTruthy();
})
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

import { fetchMovieDetails, fetchMoviesList, fetchGenreList } from '../../../components/Helpers/FetchMethods';

const handlers = [
  rest.get('https://api.themoviedb.org/3/movie/577209', (req, res, ctx) => res(ctx.json({ title: 'Thunder and Lightning', id: 12345 }))),
  rest.get('https://api.themoviedb.org/3/discover/movie', (req, res, ctx) => res(ctx.json([{ title: 'Thunder and Lightning', id: 123 }, { title: 'Return of Thunder', id: 456 }]))),
  rest.get('https://api.themoviedb.org/3/genre/movie/list', (req, res, ctx) => res(ctx.json([{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }]))),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('fetchMovieDetials', () => {
  it('It fetches movie data', async () => {
    const movie = await fetchMovieDetails('onvehofdksd', 577209);

    expect(movie.title).toBe('Thunder and Lightning');
  });

  it('It handles failure', async () => {
    server.use(
      rest.get('https://api.themoviedb.org/3/movie/undefined', (req, res, ctx) => res(ctx.status(404))),
    );

    await expect(fetchMovieDetails(('onvehofdksd', 457))).rejects.toThrow('Request failed with status code 404');
  });
});

test('It fetches movies list', async () => {
  const list = await fetchMoviesList('onvehofdksd', '2009', '28', '1');

  expect(list instanceof Array).toBeTruthy();
  expect(list[0].title).toBe('Thunder and Lightning');
});

test('It should fetch genres list', async () => {
  const genres = await fetchGenreList('onvehofdksd');

  expect(genres instanceof Array).toBeTruthy();
  expect(genres[1].name).toBe('Comedy');
});

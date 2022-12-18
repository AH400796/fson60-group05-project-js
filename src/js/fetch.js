import { API_KEY, BASE_URL } from './constants';
import { addSpinner } from './spinner';

export const fetchFilm = async function (value) {
  addSpinner();
  const response = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${value}&primary_release_year=integer`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

export const getTrendingFilms = async function (page) {
  // addSpinner();
  const response = await fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

export const onFilmCardClick = async function (filmId) {
  addSpinner();
  const response = await fetch(`${BASE_URL}/movie/${filmId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

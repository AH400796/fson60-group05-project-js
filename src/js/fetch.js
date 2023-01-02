import { API_KEY, BASE_URL } from './constants';

export const searchFilm = async function (value, page) {
  const response = await fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${value}&primary_release_year=integer&page=${page}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

export const getTrendingFilms = async function (page) {
  const response = await fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

export const onFilmCardClick = async function (filmId) {
  const response = await fetch(`${BASE_URL}movie/${filmId}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};

export const getTrailerKey = async function (filmId) {
  const response = await fetch(`${BASE_URL}movie/${filmId}/videos?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
};


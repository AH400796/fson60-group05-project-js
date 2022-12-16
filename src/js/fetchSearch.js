import { API_KEY, BASE_URL } from './constants';

export default async function fetchFilm(value) {
  const response = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${value}&primary_release_year=integer`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

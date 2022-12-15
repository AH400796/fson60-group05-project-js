const API_KEY = 'fbee7941f117d258bba2ad0706e433a4';
const BASE__URL = 'https://api.themoviedb.org/3/search/movie';

export default async function fetchFilm(value) {
   const response = await fetch(`${BASE__URL}?api_key=${API_KEY}&language=en-US&page=1&query=${value}&primary_release_year=integer`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
   
};

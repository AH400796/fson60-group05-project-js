const API_KEY = 'fbee7941f117d258bba2ad0706e433a4';
const BASE_URL = 'https://api.themoviedb.org/3/';

export const getTrendingFilms = async function getTrendingFilms() {
  const response = await fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const responseData = await response.json();
  createMarkup(responseData);
};

function createMarkup(data) {
  let markup = data.results
    .map(item => {
      return `<div class="gallery__item">
    <img src="https://www.themoviedb.org/t/p/original${item.poster_path}" alt="${item.title}" width="395">
    <h2 class="gallery__title">${item.original_title}</h2>
    <p class="gallery__info">${getGenreName(item.genre_ids)} | ${Number.parseInt(item.release_date)} ${item.vote_average.toFixed(1)}</p></div>`;
    })
    .join('');
  const gallery = document.querySelector('.gallery__container');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function getGenreName(genre_ids) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  if (genre_ids.length < 3) {
    return genre_ids.map(item => genres[item]).join(', ');
  }
  return (
    genre_ids
      .map(item => genres[item])
      .slice(0, 2)
      .join(', ') + ', Other'
  );
}







const gallery = document.querySelector('.gallery__list');

export const createMarkup = function (arr, rating) {
  gallery.innerHTML = '';
  const ratingExistence = rating ? 'rating' : 'rating visually-hidden';
  const markup = arr.results
    .map(item => {
      return `<li class="gallery__item">
    <div class="id" hidden> ${item.id} </div>
    <div class="thumb">
    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}" width="280">
    </div>
    <div class="gallery__info-wrapper">
    <p class="gallery__title">${(item.original_title || item.original_name).toUpperCase()}</p>
    <div class="gallery__info"><span class="genres-and-year">${getGenreName(item.genre_ids)} | ${Number.parseInt(
        item.release_date || item.first_air_date
      )}</span><span class="${ratingExistence}">${item.vote_average.toFixed(1)}</span></div></div></li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};

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
    10765: 'Sci-Fi & Fantasy',
    10759: 'Action & Adventure',
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

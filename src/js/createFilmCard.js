// import { fetchDataFromStorage, saveDataToStorage } from './dataStorage';
// import { isInLib } from './isInLib';  

function saveDataToStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

function fetchDataFromStorage(key) {
	const results = localStorage.getItem(key);

	if (results) return JSON.parse(results);

	return;
}

function isInLib({ id, storageKey }) {
	const data = fetchDataFromStorage(storageKey);
	const ID = Number(id);

	if (data) {
		for (let i = 0; i < data?.length; i++) {
			if (data[i].id === ID) return data[i];
		}
	}

	return;
}

// Функція отримує дані про фільм у вигляді об'єкта
// та повертає розмітку картки фільму.
// За замовчуванням, розмітка відповідає макету для сторінки Home.
// За зміну розмітки для макету сторінки MyLibrary відповідає параметр 'isLibrary' (число).
// Для цього при виклику необхідно вказати другим параметром 'true'

const createFilmCard = ({ id, vote_average, release_date, poster_path, title, genre_ids, original_title }, isLibrary = false) => {
	const BASE_URL = 'https://image.tmdb.org/t/p/';
	const rating = isLibrary ? `<p class="filmCard-rating">${vote_average ? vote_average.toFixed(1) : '-'}</p>` : '';

	const imgSrc = width => {
		return poster_path ? `${BASE_URL}w${width}${poster_path}` : ` https://via.placeholder.com/${width}x${width * 1.5}/fbf7f7c1/8c8c8c/?text=No+Poster`;
	};

	const isInWatched = isInLib({ id, storageKey: 'watchedResult' });
	const isInQueue = isInLib({ id, storageKey: 'queueResult' });
	let libLabel = '';

    if (!isLibrary && isInWatched && isInQueue)
        libLabel = `<div class="filmCard__label" data-id="${id}"><span data-action="open-modal">In queue</span><span data-action="open-modal">Watched</span></div>`;
    else if (!isLibrary && isInWatched)
        libLabel = `<div class="filmCard__label" data-id="${id}"><span data-action="open-modal">Watched</span></div>`;
    else if (!isLibrary && isInQueue)
        libLabel = `<div class="filmCard__label" data-id="${id}"><span data-action="open-modal">In queue</span></div>`;

  return `
<article class="filmCard" data-id="${id}">
  <img class="filmCard__img" srcset="${imgSrc(400)} 1x, ${imgSrc(500)} 2x" src="${imgSrc(400)}" width="280" height="398" alt="${title ? title : 'Poster'}" data-action="open-modal"/>
  <h2 class="filmCard-title">${title ? title : original_title ? original_title : 'No name'}</h2>
  <div class="filmCard-description">
    <p class="filmCard-genres">${genre_ids ? getFilmGenres(genre_ids) : 'Genre: -'}</p>
    <p class="filmCard-release">${release_date ? release_date.slice(0, 4) : 'Release date: -'}</p>${rating}
  </div>${libLabel}
</article>`;
};

function getFilmGenres(genre_ids, isInModal = false) {
	const genresList = fetchDataFromStorage('genres');
	const genres = [];
	if (genresList?.length) {
		for (let id of genre_ids) {
			genresList.map(genre => {
				if (genre.id === id) genres.push(genre.name);
			});
		}
	} else return '-';

	if (genres.length && isInModal) return genres.join(', ')
	else if (!genres.length && isInModal) return '-';
	if (genres.length && genres.length <= 3) return genres.join(', ');
	else if (genres.length > 3) return `${genres[0]}, ${genres[1]}, Other`;
	else return 'Genre: -';
}

// export { createFilmCard, getFilmGenres };
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchFilm from './fetchSearch';
const formSearch = document.querySelector('.header__form');
const listFilms = document.querySelector('.gallery__container');
formSearch.addEventListener('submit', onSubmit);

function onSubmit(e) {
  listFilms.innerHTML = '';
  e.preventDefault();
  const value = e.target[0].value.trim();

  fetchFilm(value)
    .then(data => {
      if (!value) {
        Notify.info('Not found!');
        return;
      } else {
        createMarkup(data);
      }
    })
    .catch(error => {
      Notify.failure('Оops, something went wrong!');
      console.log(error);
    });
}

function createMarkup(data) {
  let markup = data.results
    .map(item => {
      return `<li>
    <img src="http://image.tmdb.org/t/p/original/${item.poster_path}" alt="${item.title}" width="395">
    <div>
  <h2>${item.original_title.toUpperCase()}</h2>
  <p>${Number.parseInt(item.release_date)}</p>
  </div>
</li>`;
    })
    .join('');
  listFilms.innerHTML = markup;
}

// ***

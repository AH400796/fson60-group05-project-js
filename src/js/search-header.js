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
//     return `
// <article class="filmCard" data-id="${id}">
//   <img class="filmCard__img" srcset="${imgSrc(400)} 1x, ${imgSrc(500)} 2x" src="${imgSrc(400)}" width="280" height="398" alt="${title ? title : 'Poster'}" data-action="open-modal"/>
//   <h2 class="filmCard-title">${title ? title : original_title ? original_title : 'No name'}</h2>
//   <div class="filmCard-description">
//     <p class="filmCard-genres">${genre_ids ? getFilmGenres(genre_ids) : 'Genre: -'}</p>
//     <p class="filmCard-release">${release_date ? release_date.slice(0, 4) : 'Release date: -'}</p>${rating}
//   </div>${libLabel}
// </article>`;  
    })
    .join('');
  listFilms.innerHTML = markup;
}

// ***

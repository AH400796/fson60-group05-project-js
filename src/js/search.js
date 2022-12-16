import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchFilm } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';

const formSearch = document.querySelector('.header__form');
formSearch.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
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
      Notify.failure('Oops, something went wrong!');
      console.log(error);
    });
}

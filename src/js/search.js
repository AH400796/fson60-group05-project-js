import Notiflix from 'notiflix';
import { searchFilm } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { addSpinner, removeSpinner } from './spinner';
import { startPagination, setSearchPagination } from './pagination';

const formSearch = document.querySelector('.header__form');
const inputInfo = document.querySelector('.header__input-info');
const input = document.querySelector('.header__input');
const searchBtn = document.querySelector('.js-search');

formSearch.addEventListener('submit', onSubmit);
input.addEventListener('input', e => {
  if (e.currentTarget.value) {
    searchBtn.classList.add('scale');
    searchBtn.classList.add('ready');
  } else {
    searchBtn.classList.remove('scale');
    searchBtn.classList.remove('ready');
  }
});

let page = 1;

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
  const value = e.target[0].value.trim();
  addSpinner();
  searchFilm(value, page)
    .then(data => {
      if (data.results.length === 0) {
        inputInfo.removeAttribute('hidden');
        return;
      } else {
        createMarkup(data, true);
        startPagination(Number(data.total_results));
        setSearchPagination(value);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    })
    .finally(setTimeout(removeSpinner, 500));
}

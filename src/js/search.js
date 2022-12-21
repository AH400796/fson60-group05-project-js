import Notiflix from 'notiflix';
import { searchFilm } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery, resetSearch } from './utility-functions';
import { addSpinner, removeSpinner } from './spinner';
import { startPagination, setSearchPagination } from './pagination';

const formSearch = document.querySelector('.header__form');
const inputInfo = document.querySelector('.header__input-info');
const input = document.querySelector('.header__input');
const searchBtn = document.querySelector('.js-search');
const gallery = document.querySelector('.gallery__list');
const pagination = document.querySelector('.tui-pagination');

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
  addSpinner();
  const value = e.target[0].value.trim();

  searchFilm(value, page)
    .then(data => {
      if (data.results.length === 0) {
        pagination.classList.add('visually-hidden');
        inputInfo.removeAttribute('hidden');
        searchIsNotFound();
        return;
      } else {
        pagination.classList.remove('visually-hidden');
        createMarkup(data);
        startPagination(Number(data.total_results));
        setSearchPagination(value);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    })
    .finally(setTimeout(removeSpinner, 2000));

  setTimeout(resetSearch, 1500);
}

function searchIsNotFound() {
  const markup = '<div class="thumb404"><img src="https://i.ibb.co/KwMK1jc/page-not-found-1.png" alt="404" width="300" height="300"></img></div>';
  gallery.insertAdjacentHTML('beforeend', markup);
}

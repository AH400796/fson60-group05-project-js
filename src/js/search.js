import Notiflix from 'notiflix';
import { searchFilm } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { addSpinner, removeSpinner } from './spinner';
import { startPagination, setSearchPagination } from './pagination';

const formSearch = document.querySelector('.header__form');
const inputInfo = document.querySelector('.header__input-info');
formSearch.addEventListener('submit', onSubmit);

let page = 1;

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
  const value = e.target[0].value.trim();
  addSpinner();
  searchFilm(value, page)
    .then(data => {
      console.log(data);
      if (data.results.length === 0) {
        inputInfo.removeAttribute('hidden');
        return;
      } else {
        createMarkup(data, true);
        startPagination(Number(data.total_results));
        console.log(value);
        setSearchPagination(value);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    })
    .finally(setTimeout(removeSpinner, 500));
}

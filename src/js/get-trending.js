import Notiflix from 'notiflix';
import { getTrendingFilms } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { removeSpinner, addSpinner } from './spinner';
import { startPagination } from './pagination';

let page = 1;

export const renderTrendingFilms = function () {
  clearGallery();
  addSpinner();
  getTrendingFilms(page)
    .then(data => {
      createMarkup(data);
      startPagination(Number(data.total_results));
      setPagination();
    })
    .catch(error => {
      console.log('here?');
      Notiflix.Notify.failure('Oops, something went wrong!');
    })
    .finally(setTimeout(removeSpinner, 500));
};

function renderPaginationQuery(pageNumber) {
  clearGallery();
  getTrendingFilms(pageNumber)
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    });
  // .finally(removeSpinner);
}

function setPagination() {
  const paginationBtns = document.querySelector('.tui-pagination');
  paginationBtns.addEventListener('click', onClick);
  function onClick() {
    for (const key of Object.entries(paginationBtns.children)) {
      if (key[1].className.includes('selected')) {
        page = Number(key[1].textContent);
      }
    }
    renderPaginationQuery(page);
    console.log(page);
  }
}

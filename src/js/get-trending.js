import Notiflix from 'notiflix';
import { getTrendingFilms } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { addSpinner, removeSpinner } from './spinner';
import { startPagination, setTrendPagination } from './pagination';

let page = 1;

export const renderTrendingFilms = function () {
  clearGallery();
  addSpinner();
  getTrendingFilms(page)
    .then(data => {
      createMarkup(data);
      startPagination(Number(data.total_results));
      setTrendPagination();
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    })
    .finally(setTimeout(removeSpinner, 1500));
};

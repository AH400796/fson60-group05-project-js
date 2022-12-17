import Notiflix from 'notiflix';
import { getTrendingFilms } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { removeSpinner } from './spinner';

export const renderTrendingFilms = function () {
  clearGallery();
  getTrendingFilms()
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    })
    .finally(removeSpinner());
};

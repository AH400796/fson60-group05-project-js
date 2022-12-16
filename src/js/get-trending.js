import { getTrendingFilms } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { removeSpinner } from './spinner';

export const renderTrendingFilms = function () {
  clearGallery();
  getTrendingFilms()
    .then(data => {
      createMarkup(data);
      removeSpinner();
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong!');
    });
};

import { getTrendingFilms } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';

export const renderTrendingFilms = function () {
  clearGallery();
  getTrendingFilms()
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      Notify.failure('Oops, something went wrong!');
    });
};

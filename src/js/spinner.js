import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const addSpinner = function addSpinner() {
  Loading.circle('Loading your movies...', {
    svgColor: '$color-accent',
    svgSize: '25px',
    backgroundColor: '$color-overlay-modal',
  });
};

export const removeSpinner = function removeSpinner() {
  Loading.remove();
};

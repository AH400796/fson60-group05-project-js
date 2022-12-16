const listFilms = document.querySelector('.gallery__list');
const formSearch = document.querySelector('.header__form');
const inputInfo = document.querySelector('.header__input-info');

export const clearGallery = function () {
  listFilms.innerHTML = '';
};

export const resetSearch = function () {
  if (!inputInfo.hasAttribute('hidden')) {
    inputInfo.setAttribute('hidden', 'hidden');
    formSearch.reset();
  }
};

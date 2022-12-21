const listFilms = document.querySelector('.gallery__list');
const formSearch = document.querySelector('.header__form');
const inputInfo = document.querySelector('.header__input-info');
const searchBtn = document.querySelector('.js-search');

export const clearGallery = function () {
  listFilms.innerHTML = '';
};

export const resetSearch = function () {
  formSearch.addEventListener('click', onFocus);
  function onFocus() {
    if (!inputInfo.hasAttribute('hidden')) {
      inputInfo.setAttribute('hidden', 'hidden');
      formSearch.removeEventListener('focus', onFocus);
    }
  }

  searchBtn.classList.remove('ready', 'scale');
  formSearch.reset();
};

import { renderTrendingFilms } from './get-trending';
import { resetSearch } from './utility-functions';
import { renderWatched, onClickWatched, onClickQueue } from './film-card-modal';
import { KEY_CURRENT } from './constants';

const { inputBtns, currentPage, header, container, wrapper, logo, home, library, watched, queue, input } = {
  header: document.querySelector('.js-header'),
  container: document.querySelector('.js-container'),
  wrapper: document.querySelector('.js-wrapper'),
  logo: document.querySelector('.js-logo'),
  home: document.querySelector('.js-home'),
  library: document.querySelector('.js-library'),
  watched: document.querySelector('.js-watched'),
  queue: document.querySelector('.js-queue'),
  input: document.querySelector('.js-input'),
  currentPage: localStorage.getItem(`${KEY_CURRENT}`),
  inputBtns: document.querySelector('.header__input-wrapper'),
};

library.addEventListener('click', onClickMyLibrary);
home.addEventListener('click', onClickHome);
logo.addEventListener('click', onClickHome);

document.addEventListener('click', resetSearch);

setCurrentPage();

function setCurrentPage() {
  switch (currentPage) {
    case 'Library':
      onClickMyLibrary();
      break;
    case 'Home':
      onClickHome();
      break;
    case 'Watched':
      onClickWatched();
      break;
    case 'Queue':
      onClickQueue();
      break;
    default:
      onClickHome();
  }
}

// onClickHome();

function onClickMyLibrary() {
  localStorage.setItem(`${KEY_CURRENT}`, 'Library');
  container.classList.add('library');
  wrapper.classList.add('library');
  header.classList.add('library');
  home.classList.remove('current');
  library.classList.add('current');
  watched.classList.remove('hidden');
  queue.classList.remove('hidden');
  inputBtns.classList.add('hidden');
  queue.classList.remove('current');
  watched.classList.add('current');
  renderWatched();
}

function onClickHome() {
  localStorage.setItem(`${KEY_CURRENT}`, 'Home');
  container.classList.remove('library');
  wrapper.classList.remove('library');
  header.classList.remove('library');
  library.classList.remove('current');
  home.classList.add('current');
  inputBtns.classList.remove('hidden');
  watched.classList.add('hidden');
  queue.classList.add('hidden');
  renderTrendingFilms();
}

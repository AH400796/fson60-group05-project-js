import { renderTrendingFilms } from './get-trending';
import { resetSearch } from './utility-functions';

const { header, container, wrapper, logo, home, library, watched, queue, input } = {
  header: document.querySelector('.js-header'),
  container: document.querySelector('.js-container'),
  wrapper: document.querySelector('.js-wrapper'),
  logo: document.querySelector('.js-logo'),
  home: document.querySelector('.js-home'),
  library: document.querySelector('.js-library'),
  watched: document.querySelector('.js-watched'),
  queue: document.querySelector('.js-queue'),
  input: document.querySelector('.js-input'),
};

library.addEventListener('click', onClickMyLibrary);
home.addEventListener('click', onClickHome);
logo.addEventListener('click', onClickHome);

document.addEventListener('click', resetSearch);

onClickHome();

function onClickMyLibrary() {
  container.classList.add('library');
  wrapper.classList.add('library');
  header.classList.add('library');
  home.classList.remove('current');
  library.classList.add('current');
  watched.classList.remove('visually-hidden');
  queue.classList.remove('visually-hidden');
  input.classList.add('visually-hidden');
  queue.classList.remove('current');
  watched.classList.add('current');
}

function onClickHome() {
  container.classList.remove('library');
  wrapper.classList.remove('library');
  header.classList.remove('library');
  library.classList.remove('current');
  home.classList.add('current');
  input.classList.remove('visually-hidden');
  watched.classList.add('visually-hidden');
  queue.classList.add('visually-hidden');
  renderTrendingFilms();
}

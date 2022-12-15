import { addSpinner, removeSpinner } from './spinner';

const { header, container, wrapper, logo, home, library, watched, queue, seachSubmit, input } = {
  header: document.querySelector('.js-header'),
  container: document.querySelector('.js-container'),
  wrapper: document.querySelector('.js-wrapper'),
  logo: document.querySelector('.js-logo'),
  home: document.querySelector('.js-home'),
  library: document.querySelector('.js-library'),
  watched: document.querySelector('.js-watched'),
  queue: document.querySelector('.js-queue'),
  seachSubmit: document.querySelector('.js-search'),
  input: document.querySelector('.js-input'),
};

library.addEventListener('click', onClickMyLibrary);
home.addEventListener('click', onClickHome);
logo.addEventListener('click', onClickHome);
watched.addEventListener('click', onClickWatched);
queue.addEventListener('click', onClickQueue);

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
  onClickWatched();
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
  //  + Fetch та рендеринг списку найпопулярніших фільмів на сьогодні (Home)
}

function onClickWatched() {
  queue.classList.remove('current');
  watched.classList.add('current');
  //  + рендеринг списку переглянутих фільмів (Watched)
}

function onClickQueue() {
  watched.classList.remove('current');
  queue.classList.add('current');
  //  + рендеринг списку фільмів, які додані в чергу на перегляд (Queue)

  addSpinner();
  // removeSpinner();
}

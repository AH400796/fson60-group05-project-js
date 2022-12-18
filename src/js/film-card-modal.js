import Notiflix from 'notiflix';
import { onFilmCardClick } from './fetch';
import { removeSpinner } from './spinner';
import { createFilmModalCard } from './create-markup';

const { list, body, closeModalBtn, backdrop, modalCard } = {
  list: document.querySelector('.gallery__list'),
  body: document.body,
  closeModalBtn: document.querySelector('.modal__close'),
  backdrop: document.querySelector('.backdrop'),
  modalCard: document.querySelector('.modal__film-card'),
};
let filmId;
list.addEventListener('click', onListClick);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);

function onListClick(event) {
  const filmCard = event.target.closest('.gallery__item');
  if (event.target === event.currentTarget) {
    return;
  }
  filmId = filmCard.querySelector('.id').textContent;

  onFilmCardClick(filmId)
    .then(data => {
      body.classList.add('show-modal');
      window.addEventListener('keydown', onEscKeyPress);
      createFilmModalCard(data);
      setAddButtons();
    })
    .catch(error => {
      Notiflix.Notify.failure('Unfortunately, there is no additional information about this movie...');
    })
    .finally(setTimeout(removeSpinner, 500));
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseModal() {
  body.classList.remove('show-modal');
  modalCard.innerHTML = '';
  window.removeEventListener('keydown', onEscKeyPress);
}

// SET ADDBUTTONS
import { KEY_WATCHED, KEY_QUEUE } from './constants';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
let watchedMovies = JSON.parse(localStorage.getItem(`${KEY_WATCHED}`)) || [];
let queueMovies = JSON.parse(localStorage.getItem(`${KEY_WATCHED}`)) || [];
const { watched, queue } = {
  watched: document.querySelector('.js-watched'),
  queue: document.querySelector('.js-queue'),
};

function setAddButtons() {
  const { addToWatched, addToQueue } = {
    addToWatched: document.querySelector('.js-add__watched'),
    addToQueue: document.querySelector('.js-add__queue'),
  };

  addToWatched.addEventListener('click', onAddToWatched);
  addToQueue.addEventListener('click', onAddToQueue);
  watched.addEventListener('click', onClickWatched);
  //   // queue.addEventListener('click', onClickQueue);
  function onAddToWatched() {
    watchedMovies.push(Number(filmId));
    localStorage.setItem('KEY_WATCHED', JSON.stringify(watchedMovies));
    console.log(watchedMovies);

    addToWatched.disabled = true;
    // Notiflix.Notify.success(`Movie ${data.original_title} added to watched`);
  }
  function onAddToQueue() {
    queueMovies.push(Number(filmId));

    localStorage.setItem('KEY_QUEUE', JSON.stringify(queueMovies));
    console.log(queueMovies);

    addToQueue.disabled = true;
    // Notiflix.Notify.success(`Movie ${data.original_title} added to queue`);
  }
}

function onClickWatched() {
  console.log('adsfaf');
  clearGallery();
  console.log(watchedMovies);
  createMarkup(watchedMovies, true);
  // queue.classList.remove('current');
  // watched.classList.add('current');
  //  + рендеринг списку переглянутих фільмів (Watched) -------TASK 5

  // try {
  //   watchedMovies = JSON.parse(localStorage.getItem(`${KEY_WATCHED}`)) || [];
  //   // if (watchedMovies.length < 1) {
  //   //   Notiflix.Notify.info("You haven't added anything to the movies you've watched yet");
  //   // }
  //   createMarkup(watchedMovies);
  // } catch (error) {
  //   console.log(error.message);
  // }
}

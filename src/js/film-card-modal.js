import Notiflix from 'notiflix';
import { onFilmCardClick, getTrailerKey } from './fetch';
import { createFilmModalCard } from './create-markup';
import { startPagination } from './pagination';
import { KEY_WATCHED, KEY_QUEUE } from './constants';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { startPlayTrailer } from './trailer';

const { list, body, closeModalBtn, backdrop, modalCard, watched, queue, btrForTrailer } = {
  list: document.querySelector('.gallery__list'),
  body: document.body,
  closeModalBtn: document.querySelector('.modal__close'),
  backdrop: document.querySelector('.backdrop'),
  modalCard: document.querySelector('.modal__film-card-wrapper'),
  watched: document.querySelector('.js-watched'),
  queue: document.querySelector('.js-queue'),
  btrForTrailer: document.querySelector('.btn_trailer'),
};

watched.addEventListener('click', onClickWatched);
queue.addEventListener('click', onClickQueue);

const objectQueueFilms = {};
const objectWatchedFilms = {};
let selectedFilms = [];
const btnWatchedContext = {};
const btnQueueContext = {};
const watchedSet = new Set();
const queueSet = new Set();
let watchedMovies = JSON.parse(localStorage.getItem(`${KEY_WATCHED}`)) || [];
let queueMovies = JSON.parse(localStorage.getItem(`${KEY_QUEUE}`)) || [];
let filmId;
let watchedBtnContext,
  queueBtnContext,
  isSelectedWatched,
  isSelectedQueue,
  trailerKey = null;

list.addEventListener('click', onListClick);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);

function onListClick(event) {
  trailerKey = null;
  const filmCard = event.target.closest('.gallery__item');
  if (event.target === event.currentTarget) {
    return;
  }
  filmId = filmCard.querySelector('.id').textContent;

  onFilmCardClick(filmId)
    .then(data => {
      addInfoAboutFilm(data);
      body.classList.add('show-modal');
      window.addEventListener('keydown', onEscKeyPress);
      watchedBtnContext = btnWatchedContext[filmId] || 'Add to watched';
      isSelectedWatched = btnWatchedContext[filmId + 'sel'] || 'card__btn js-add__watched';
      queueBtnContext = btnQueueContext[filmId] || 'Add to queue';
      isSelectedQueue = btnQueueContext[filmId + 'sel'] || 'card__btn js-add__queue';
      createFilmModalCard(data, watchedBtnContext, queueBtnContext, isSelectedWatched, isSelectedQueue);
      setAddButtons(filmId);
    })
    .catch(error => {
      Notiflix.Notify.failure('Unfortunately, there is no additional information about this movie...');
    })
    .finally();

  getTrailerKey(filmId)
    .then(data => {
      console.log(data.results.length);
      if (data.results.length !== 0) {
        btrForTrailer.classList.remove('visually-hidden');
        trailerKey = data.results.find(el => el.name.toLowerCase().includes('trailer')).key;
        btrForTrailer.addEventListener('click', () => startPlayTrailer(trailerKey));
      }
    })
    .catch(error => {
      Notiflix.Notify.info('This movie has no trailer available for viewing');
    })
    .finally();
}

function addInfoAboutFilm(data) {
  selectedFilms.push({
    id: data.id,
    poster_path: data.poster_path,
    original_title: data.original_title || data.original_name,
    genre_ids: data.genres.map(el => el.id),
    release_date: data.release_date || data.first_air_date,
    vote_average: data.vote_average,
  });
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
  btrForTrailer.classList.add('visually-hidden');
}

function setAddButtons(filmId) {
  const { addToWatched, addToQueue } = {
    addToWatched: document.querySelector('.js-add__watched'),
    addToQueue: document.querySelector('.js-add__queue'),
  };
  onAddToWatched(filmId, addToWatched);
  onAddToQueue(filmId, addToQueue);
}

function onAddToWatched(filmId, addToWatched) {
  addToWatched.addEventListener('click', () => {
    if (watchedSet.has(filmId)) {
      watchedSet.delete(filmId);
      addToWatched.textContent = 'Add to watched';
      btnWatchedContext[filmId] = 'Add to watched';
      addToWatched.classList.remove('selected');
      btnWatchedContext[filmId + 'sel'] = 'card__btn js-add__watched ';
    } else {
      watchedSet.add(filmId);
      addToWatched.textContent = 'Remove from watched';
      btnWatchedContext[filmId] = 'Remove from watched';
      addToWatched.classList.add('selected');
      btnWatchedContext[filmId + 'sel'] = 'card__btn js-add__watched selected';
    }
    watchedMovies = Array.from(watchedSet);
    localStorage.setItem('KEY_WATCHED', JSON.stringify(watchedMovies));
  });
}

function onAddToQueue(filmId, addToQueue) {
  addToQueue.addEventListener('click', () => {
    if (queueSet.has(filmId)) {
      queueSet.delete(filmId);
      addToQueue.textContent = 'Add to queue';
      btnQueueContext[filmId] = 'Add to queue';
      addToQueue.classList.remove('selected');
      btnQueueContext[filmId + 'sel'] = 'card__btn js-add__queue ';
    } else {
      queueSet.add(filmId);
      addToQueue.textContent = 'Remove from queue';
      btnQueueContext[filmId] = 'Remove from queue';
      addToQueue.classList.add('selected');
      btnQueueContext[filmId + 'sel'] = 'card__btn js-add__queue selected';
    }
    queueMovies = Array.from(queueSet);
    localStorage.setItem('KEY_QUEQUE', JSON.stringify(queueMovies));
  });
}

function onClickWatched() {
  queue.classList.remove('current');
  watched.classList.add('current');
  renderWatched();
}

function onClickQueue() {
  watched.classList.remove('current');
  queue.classList.add('current');
  renderQueue();
}

export const renderWatched = function () {
  clearGallery();
  objectWatchedFilms.results = [];
  for (let i = 0; i < watchedMovies.length; i += 1) {
    const selectedFilm = selectedFilms.find(el => Number(watchedMovies[i]) === el.id);
    objectWatchedFilms.results.push(selectedFilm);
  }
  createMarkup(objectWatchedFilms, true);
  startPagination(watchedMovies.length);
};

function renderQueue() {
  clearGallery();
  objectQueueFilms.results = [];
  for (let i = 0; i < queueMovies.length; i += 1) {
    const selectedFilm = selectedFilms.find(el => Number(queueMovies[i]) === el.id);
    objectQueueFilms.results.push(selectedFilm);
  }
  createMarkup(objectQueueFilms, true);
  startPagination(queueMovies.length);
}

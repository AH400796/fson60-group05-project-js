import Notiflix from 'notiflix';
import { onFilmCardClick, getTrailerKey } from './fetch';
import { createFilmModalCard } from './create-markup';
import { startPagination } from './pagination';
import { clearGallery } from './utility-functions';
import { renderTrendingFilms } from './get-trending';
import { database } from './firebase';
import { ref, set } from 'firebase/database';

const { btnTrailer, list, closeModalBtn, backdrop, modalCard, inputBtns, header, container, wrapper, logo, home, library, watched, queue } = {
  list: document.querySelector('.gallery__list'),
  closeModalBtn: document.querySelector('.modal__close'),
  backdrop: document.querySelector('.backdrop'),
  modalCard: document.querySelector('.modal__film-card-wrapper'),
  header: document.querySelector('.js-header'),
  container: document.querySelector('.js-container'),
  wrapper: document.querySelector('.js-wrapper'),
  logo: document.querySelector('.js-logo'),
  home: document.querySelector('.js-home'),
  library: document.querySelector('.js-library'),
  watched: document.querySelector('.js-watched'),
  queue: document.querySelector('.js-queue'),
  inputBtns: document.querySelector('.js-input'),
  btnTrailer: document.querySelector('.btn_trailer'),
};

export const onClickHome = function () {
  localStorage.setItem(`KEY_CURRENT`, 'Home');
  container.classList.remove('library');
  wrapper.classList.remove('library');
  header.classList.remove('library');
  library.classList.remove('current');
  home.classList.add('current');
  watched.classList.add('hidden');
  queue.classList.add('hidden');
  inputBtns.classList.remove('hidden');
  renderTrendingFilms();
};

library.addEventListener('click', onClickMyLibrary);
home.addEventListener('click', onClickHome);
logo.addEventListener('click', onClickHome);
watched.addEventListener('click', onClickWatched);
queue.addEventListener('click', onClickQueue);
list.addEventListener('click', onListClick);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);

let btnWContextFromLocal;
let btnQContextFromLocal;

let filmId, trailerKey, watchedMovies, queueMovies, filmsCollection;
let btnWatchedContext, btnQueueContext, isSelectedWatched, isSelectedQueue;
const currentPage = localStorage.getItem(`KEY_CURRENT`);

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
      setLib();
      onClickWatched();
      break;
    case 'Queue':
      setLib();
      onClickQueue();
      break;
    default:
      onClickHome();
  }
}

function onClickMyLibrary() {
  localStorage.setItem(`KEY_CURRENT`, 'Library');
  setLib();
  renderWatched();
}

function setLib() {
  inputBtns.classList.add('hidden');
  container.classList.add('library');
  wrapper.classList.add('library');
  header.classList.add('library');
  home.classList.remove('current');
  library.classList.add('current');

  queue.classList.remove('hidden');
  watched.classList.remove('hidden');
  queue.classList.remove('current');
  watched.classList.add('current');
}

// Клік по постеру
function onListClick(event) {
  const filmCard = event.target.closest('.gallery__item');
  if (event.target === event.currentTarget) {
    return;
  }
  filmId = Number(filmCard.querySelector('.id').textContent);

  // Визначення key для трейлера
  getTrailerKey(filmId)
    .then(data => {
      if (data.results.length !== 0) {
        trailerKey = data.results.find(el => el.name.toLowerCase().includes('trailer')).key;
        btnTrailer.classList.remove('visually-hidden');
        btnTrailer.addEventListener('click', startPlayTrailer);
      } else {
        Notiflix.Notify.info('This movie has no trailer available for viewing');
      }
    })
    .catch(error => {})
    .finally();

  // Клік по картці
  onFilmCardClick(filmId)
    .then(data => {
      setFilmsToLS(data, filmId);
      document.body.classList.add('show-modal');
      window.addEventListener('keydown', onEscKeyPress);
      currentBtnContext();
      createFilmModalCard(data, btnWatchedContext, btnQueueContext, isSelectedWatched, isSelectedQueue);
      setAddButtons(filmId);
    })
    .catch(error => {
      Notiflix.Notify.failure('Unfortunately, there is no additional information about this movie...');
    })
    .finally();
}

// Визначення поточних призначень кнопок 'Add to watched' та 'Add to queue'
function currentBtnContext() {
  btnWContextFromLocal = JSON.parse(localStorage.getItem('BUTTON_WACHED_ASSIGNMENT')) || {};
  btnQContextFromLocal = JSON.parse(localStorage.getItem('BUTTON_QUEUE_ASSIGNMENT')) || {};

  btnWatchedContext = btnWContextFromLocal[filmId] || 'Add to watched';
  isSelectedWatched = btnWContextFromLocal[filmId + 'color'] || 'card__btn js-add__watched';
  btnQueueContext = btnQContextFromLocal[filmId] || 'Add to queue';
  isSelectedQueue = btnQContextFromLocal[filmId + 'color'] || 'card__btn js-add__queue';
}

// Запис фільму по картці якого клікнули в об'єкт з ID
function setFilmsToLS(data, filmId) {
  const film = {
    id: data.id,
    poster_path: data.poster_path,
    original_title: data.original_title || data.original_name,
    genre_ids: data.genres.map(el => el.name),
    release_date: data.release_date || data.first_air_date,
    vote_average: data.vote_average,
  };

  filmsCollection = JSON.parse(localStorage.getItem('CLICKED_FILMS')) || {};
  filmsCollection[filmId] = film;
  localStorage.setItem('CLICKED_FILMS', JSON.stringify(filmsCollection));
  if (localStorage.getItem('userId')) {
    set(ref(database, 'users/' + localStorage.getItem('userId') + '/clicked'), {
      clicked: JSON.stringify(filmsCollection),
    });
  }
}

// Закриття модального вікна
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
  document.body.classList.remove('show-modal');
  btnTrailer.classList.add('visually-hidden');
  btnTrailer.removeEventListener('click', startPlayTrailer);
  window.removeEventListener('keydown', onEscKeyPress);
  modalCard.innerHTML = '';

  if (localStorage.getItem(`KEY_CURRENT`) !== 'Home') {
    if (localStorage.getItem(`KEY_CURRENT`) === 'Queue') {
      renderQueue();
    } else if (localStorage.getItem(`KEY_CURRENT`) === 'Watched' || 'Library') {
      renderWatched();
    }
  }
}

//  Перезапис нових значень кнопок 'Add to watched' та 'Add to queue' в залежності від дій користувача
function setAddButtons(filmId) {
  const { addToWatched, addToQueue } = {
    addToWatched: document.querySelector('.js-add__watched'),
    addToQueue: document.querySelector('.js-add__queue'),
  };

  onAddToWatched(filmId, addToWatched);
  onAddToQueue(filmId, addToQueue);

  if (localStorage.getItem('Authorized')) {
    addToWatched.classList.remove('hidden');
    addToQueue.classList.remove('hidden');
  }
}

function onAddToWatched(filmId, addToWatched) {
  addToWatched.addEventListener('click', setWBtn);
  btnWContextFromLocal = JSON.parse(localStorage.getItem('BUTTON_WACHED_ASSIGNMENT')) || {};
  watchedMovies = JSON.parse(localStorage.getItem(`KEY_WATCHED`));

  function setWBtn() {
    if (watchedMovies.includes(filmId)) {
      watchedMovies.splice(watchedMovies.indexOf(filmId), 1);
      addToWatched.textContent = 'Add to watched';
      btnWContextFromLocal[filmId] = 'Add to watched';
      addToWatched.classList.remove('selected');
      btnWContextFromLocal[filmId + 'color'] = 'card__btn js-add__watched ';
    } else {
      watchedMovies.push(filmId);
      addToWatched.textContent = 'Remove from watched';
      btnWContextFromLocal[filmId] = 'Remove from watched';
      addToWatched.classList.add('selected');
      btnWContextFromLocal[filmId + 'color'] = 'card__btn js-add__watched selected';
    }
    localStorage.setItem('KEY_WATCHED', JSON.stringify(watchedMovies));
    localStorage.setItem('BUTTON_WACHED_ASSIGNMENT', JSON.stringify(btnWContextFromLocal));
    if (localStorage.getItem('userId')) {
      set(ref(database, 'users/' + localStorage.getItem('userId') + '/watched'), {
        watched: JSON.stringify(watchedMovies),
      });
      set(ref(database, 'users/' + localStorage.getItem('userId') + '/watchAssign'), {
        watchAssign: JSON.stringify(btnWContextFromLocal),
      });
    }
  }
}

function onAddToQueue(filmId, addToQueue) {
  addToQueue.addEventListener('click', setQBtn);
  btnQContextFromLocal = JSON.parse(localStorage.getItem('BUTTON_QUEUE_ASSIGNMENT')) || {};
  queueMovies = JSON.parse(localStorage.getItem(`KEY_QUEUE`));

  function setQBtn() {
    if (queueMovies.includes(filmId)) {
      queueMovies.splice(queueMovies.indexOf(filmId), 1);
      addToQueue.textContent = 'Add to queue';
      btnQContextFromLocal[filmId] = 'Add to queue';
      addToQueue.classList.remove('selected');
      btnQContextFromLocal[filmId + 'color'] = 'card__btn js-add__queue ';
    } else {
      queueMovies.push(filmId);
      addToQueue.textContent = 'Remove from queue';
      btnQContextFromLocal[filmId] = 'Remove from queue';
      addToQueue.classList.add('selected');
      btnQContextFromLocal[filmId + 'color'] = 'card__btn js-add__queue selected';
    }

    localStorage.setItem('KEY_QUEUE', JSON.stringify(queueMovies));
    localStorage.setItem('BUTTON_QUEUE_ASSIGNMENT', JSON.stringify(btnQContextFromLocal));
    if (localStorage.getItem('userId')) {
      set(ref(database, 'users/' + localStorage.getItem('userId') + '/queue'), {
        queue: JSON.stringify(queueMovies),
      });
      set(ref(database, 'users/' + localStorage.getItem('userId') + '/queueAssign'), {
        queueAssign: JSON.stringify(btnQContextFromLocal),
      });
    }
  }
}

function setWatchedAsEmpty() {
  const markup = '<div class="thumb204"><img src="https://i.ibb.co/KwM7qqH/lib30.png" alt="204" width="300" height="300"></img></div>';
  list.insertAdjacentHTML('beforeend', markup);
}

function setQueueAsEmpty() {
  const markup = '<div class="thumb204"><img src="https://i.ibb.co/xLnG6Cw/queue.png" alt="204" width="300" height="300"></img></div>';
  list.insertAdjacentHTML('beforeend', markup);
}

// Рендер картки фільму
function rendMarkup(data, rating) {
  clearGallery();
  const ratingExistence = rating ? 'rating' : 'rating visually-hidden';
  const markup = data
    .map(item => {
      return `<li class="gallery__item">
    <div class="id" hidden> ${item.id} </div>
    <div class="thumb">
    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}" width="280">
    </div>
    <div class="gallery__info-wrapper">
    <p class="gallery__title">${(item.original_title || item.original_name).toUpperCase()}</p>
    <div class="gallery__info"><span class="genres-and-year">${item.genre_ids} | ${
        Number.parseInt(item.release_date || item.first_air_date) || '-'
      }</span><span class="${ratingExistence}">${item.vote_average.toFixed(1)}</span></div></div></li>`;
    })
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
}

// Клік по кнопках бібліотеки

// Рендер  Watched
function onClickWatched() {
  localStorage.setItem(`KEY_CURRENT`, 'Watched');
  queue.classList.remove('current');
  watched.classList.add('current');
  renderWatched();
}
function renderWatched() {
  clearGallery();
  const filmForRender = [];
  filmsCollection = JSON.parse(localStorage.getItem('CLICKED_FILMS')) || {};
  watchedMovies = JSON.parse(localStorage.getItem(`KEY_WATCHED`));

  for (let i = 0; i < watchedMovies.length; i += 1) {
    if (filmsCollection[watchedMovies[i]]) {
      filmForRender.push(filmsCollection[watchedMovies[i]]);
    }
  }

  if (filmForRender.length === 0) {
    pagination.classList.add('visually-hidden');
    setWatchedAsEmpty();
  } else {
    pagination.classList.remove('visually-hidden');
    rendMarkup(filmForRender, true);
    startPagination(filmForRender.length);
  }
}

// Рендер  Queue
function onClickQueue() {
  localStorage.setItem(`KEY_CURRENT`, 'Queue');
  watched.classList.remove('current');
  queue.classList.add('current');
  renderQueue();
}
function renderQueue() {
  clearGallery();
  const filmForRender = [];
  filmsCollection = JSON.parse(localStorage.getItem('CLICKED_FILMS')) || {};
  queueMovies = JSON.parse(localStorage.getItem(`KEY_QUEUE`));

  for (let i = 0; i < queueMovies.length; i += 1) {
    if (filmsCollection[queueMovies[i]]) {
      filmForRender.push(filmsCollection[queueMovies[i]]);
    }
  }

  if (filmForRender.length === 0) {
    pagination.classList.add('visually-hidden');
    setQueueAsEmpty();
  } else {
    pagination.classList.remove('visually-hidden');
    rendMarkup(filmForRender, true);
    startPagination(filmForRender.length);
  }
}

// Перегляд трейлеру
function startPlayTrailer() {
  let screenWidth = 560,
    screenHeight = 420;
  if (window.screen.width < 560) {
    screenWidth = 320;
    screenHeight = 240;
  }
  const markup = `<div class="backdrop_trailer">
        <div class="modal_trailer">
            <iframe src="https://www.youtube.com/embed/${trailerKey}" width=${screenWidth} height=${screenHeight} frameborder="1"></iframe>
        </div>
        </div>`;
  const instanceTrailer = basicLightbox.create(markup, {
    onClose: () => {
      window.addEventListener('keydown', onEscKeyPress);
      document.body.classList.remove('show-modal_trailer');
    },
  });

  document.body.classList.add('show-modal_trailer');
  window.removeEventListener('keydown', onEscKeyPress);
  instanceTrailer.show();
}

import Notiflix from 'notiflix';
import { onFilmCardClick } from './fetch';
import { removeSpinner } from './spinner';
import { createFilmModalCard } from './create-markup';

const refs = {
  list: document.querySelector('.gallery__list'),
  body: document.body,
  closeModalBtn: document.querySelector('.modal__close'),
  modal: document.querySelector('.modal'),
  backdrop: document.querySelector('.backdrop'),
  modalCard: document.querySelector('.modal__film-card'),
};

refs.list.addEventListener('click', onListClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onListClick(event) {
  const filmCard = event.target.closest('.gallery__item');
  if (event.target === event.currentTarget) {
    return;
  }
  const filmId = filmCard.querySelector('.id').textContent;

  onFilmCardClick(filmId)
    .then(data => {
      refs.body.classList.add('show-modal');
      window.addEventListener('keydown', onEscKeyPress);
      createFilmModalCard(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    })
    .finally(removeSpinner());
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
function onCloseModal(event) {
  refs.body.classList.remove('show-modal');
  refs.modalCard.innerHTML = '';
  window.removeEventListener('keydown', onEscKeyPress);
}

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

list.addEventListener('click', onListClick);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);

function onListClick(event) {
  const filmCard = event.target.closest('.gallery__item');
  if (event.target === event.currentTarget) {
    return;
  }
  const filmId = filmCard.querySelector('.id').textContent;

  onFilmCardClick(filmId)
    .then(data => {
      body.classList.add('show-modal');
      window.addEventListener('keydown', onEscKeyPress);
      createFilmModalCard(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Unfortunately, there is no data about this movie...');
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

function onCloseModal() {
  body.classList.remove('show-modal');
  modalCard.innerHTML = '';
  window.removeEventListener('keydown', onEscKeyPress);
}

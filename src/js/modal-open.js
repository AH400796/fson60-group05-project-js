(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    openModalBtn1: document.querySelector('[data-modal-open1]'),
    openModalBtn2: document.querySelector('[data-modal-open2]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    backdrop: document.querySelector('backdrop'),
    modalCard: document.querySelector('.modal__film-card'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.openModalBtn1.addEventListener('click', toggleModal);
  refs.openModalBtn2.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);



  function toggleModal() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
  }
})();

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal()
  }
};
function onCloseModal() {
  body.classList.remove('modal-open');

};
function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal()
    }    
};
function onCloseModal(event) {
  body.classList.remove('modal-open');
  modalCard.innerHTML = "";
  window.removeEventListener('keydown', onEscKeyPress);
}
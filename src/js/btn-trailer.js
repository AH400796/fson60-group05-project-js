import * as basicLightbox from 'basiclightbox';

const refs = {
  instance: basicLightbox.create(`<div class="backdrop_trailer">
        <div class="modal_trailer">
            <iframe src="https://www.youtube.com/embed/E1oZhEIrer4" width="560" height="315" frameborder="0"></iframe>
        </div>`),
  body: document.body,
  modalCard: document.querySelector('.modal__film-card-wrapper'),
  btrForTrailer: document.querySelector('.btn_trailer'),
};

refs.btrForTrailer.addEventListener('click', openModalTrailer);

function openModalTrailer() {
  refs.body.classList.add('show-modal_trailer');
  refs.instance.show();
  backdropEl = document.querySelector('.backdrop_trailer');
  backdropEl.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  refs.instance.close();
}

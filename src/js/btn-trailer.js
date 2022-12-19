import * as basicLightbox from 'basiclightbox';

const { instance, btrForTrailer } = {
  instance: basicLightbox.create(`<div class="backdrop_trailer">
        <div class="modal_trailer">
            <iframe src="https://www.youtube.com/embed/E1oZhEIrer4" width="560" height="315" frameborder="0"></iframe>
        </div>`),
  btrForTrailer: document.querySelector('.btn_trailer'),
};

btrForTrailer.addEventListener('click', openModalTrailer);

function openModalTrailer() {
  document.body.classList.add('show-modal_trailer');
  instance.show();
  backdropEl = document.querySelector('.backdrop_trailer');
  backdropEl.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  instance.close();
}

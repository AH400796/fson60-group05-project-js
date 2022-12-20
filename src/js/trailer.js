import * as basicLightbox from 'basiclightbox';

export const startPlayTrailer = function (key) {
  const { instanceTrailer, btrForTrailer } = {
    instanceTrailer: basicLightbox.create(`<div class="backdrop_trailer">
        <div class="modal_trailer">
            <iframe src="https://www.youtube.com/embed/${key}" width="560" height="315" frameborder="0"></iframe>
        </div>`),
    btrForTrailer: document.querySelector('.btn_trailer'),
  };

  btrForTrailer.addEventListener('click', openModalTrailer);

  function openModalTrailer() {
    document.body.classList.add('show-modal_trailer');
    instanceTrailer.show();
    backdropEl = document.querySelector('.backdrop_trailer');
    backdropEl.addEventListener('click', onCloseTrailerModal);
  }

  function onCloseTrailerModal() {
    instanceTrailer.close();
    backdropEl.removeEventListener('click', onCloseTrailerModal);
    btrForTrailer.removeEventListener('click', () => startPlayTrailer(trailerKey));
  }
};

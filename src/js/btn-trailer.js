import * as basicLightbox from 'basiclightbox'

const refs = {
    instance: basicLightbox.create(`<div class="backdrop_trailer">
        <div class="modal_trailer">
            <iframe src="https://www.youtube.com/embed/E1oZhEIrer4" width="560" height="315" frameborder="0"></iframe>
        </div>`),
    body: document.body,
    gallery: document.querySelector('.gallery__list'),
    modalCard: document.querySelector('.modal__film-card'),
}

refs.gallery.addEventListener('click',makeBtnForTrailer)

function makeBtnForTrailer() {
    const markup = `<button class="btn_trailer"> Watch the trailer </button>`
    refs.modalCard.insertAdjacentHTML('beforeend', markup)
    const btrForTrailer = document.querySelector('.btn_trailer')
    btrForTrailer.addEventListener('click', openModalTrailer)
}

function openModalTrailer() {
    refs.body.classList.add('show-modal_trailer');
    refs.instance.show()
    backdropEl = document.querySelector('.backdrop_trailer')
    backdropEl.addEventListener('click',onCloseModal)
}

function onCloseModal() {
    refs.instance.close()
}
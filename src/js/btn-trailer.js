// import * as basicLightbox from 'basiclightbox'

// const instance = basicLightbox.create(`
//     <iframe src="https://www.youtube.com/embed/E1oZhEIrer4" width="560" height="315" frameborder="0"></iframe>
// `)
// instance.show()

const gallery = document.querySelector('.gallery__list');
gallery.addEventListener('click',makeBtnForTrailer)

const modalCard = document.querySelector('.modal__film-card');

function makeBtnForTrailer() {
    const markup = `<button class="btn_trailer"> Watch the trailer </button>`
    modalCard.insertAdjacentHTML('beforeend', markup)
}

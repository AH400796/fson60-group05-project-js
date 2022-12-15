
const API_KEY = 'fbee7941f117d258bba2ad0706e433a4';
const BASE_URL = 'https//api.themoviedb.org/3/';
  const refs = {
    list: document.querySelector('.gallery'),
    body: document.body, 
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('.backdrop__modal'),
    backdrop: document.querySelector('.backdrop'),
    modalCard: document.querySelector('.modal__film-card'),
};


  refs.list.addEventListener('click', onListClick)
  refs.closeModalBtn.addEventListener('click', onCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);




function onListClick(event) {   
    const filmCard = event.target.closest('.gallery__item')
     if (event.target === event.currentTarget)     
    {
        console.log('not film card');
        return
    }
    console.log(filmCard); 
    const filmId = filmCard.querySelector('.id').textContent     
    console.log(filmId);
   
    onFilmCardClick(filmId).then((data) => {
        refs.body.classList.add('show-modal')
        window.addEventListener('keydown', onEscKeyPress)
        createFilmModalCard(data)       
    })
    
}
 async function onFilmCardClick(filmId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${API_KEY}`)
        if (!response.ok) {
        throw new Error
    }
    return await response.json(); 
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal()
  }
};
function onCloseModal() {
  refs.body.classList.remove('show-modal');
};

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal()
    }    
};
function onCloseModal(event) {
  refs.body.classList.remove('show-modal');
  refs.modalCard.innerHTML = "";
  window.removeEventListener('keydown', onEscKeyPress);
}

function createFilmModalCard(data) { 
   const markup = `<img class="modal__card-img img" src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="${data.original_title}" 
        width="375" height="478"> 
      <div class="modal__card"> 
        <h3 class="modal__card-title">${data.title}</h3> 
        <ul class="modal__card-list list"> 
          <li class="card__item"> 
            <h4 class="card__item-title">Vote / Votes</h4> 
            <p class="card__item-vote">${data.vote_average}</p> 
            <span class="card__item-slash">/</span> 
            <p class="card__item-votes">${data.vote_count}</p> 
 
          <li class="card__item"> 
            <h4 class="card__item-title">Popularity</h4> 
            <p class="card__item-popularity">${data.popularity}</p> 
          </li> 
          <li class="card__item"> 
            <h4 class="card__item-title">Original Title</h4> 
            <p class="card__item-original">${data.original_title
}</p> 
          </li> 
          <li class="card__item"> 
            <h4 class="card__item-title">Genre</h4> 
            <p class="card__item-genre">${data.genres.map((item)=>{return item['name']})}</p> 
          </li> 
        </ul> 
        <h4 class="card__item-about">About</h4> 
        <p class="card__item-about__text card__item-text">${data.overview}</p> 
 
        <ul class="card__btn-list list"> 
          <li class="card__btn-item"> 
            <button class="card__btn">add to Watched</button> 
          </li> 
          <li class="card__btn-item"> 
            <button class="card__btn">add to queue</button> 
          </li> 
        </ul> 
      </div> `
  refs.modalCard.insertAdjacentHTML('beforeend', markup)
}

 
 
   
//     const markup = `<img src="https://image.tmdb.org/t/p/original/${data.poster_path}
// " alt="${data.original_title}" width="375px" height="478px">
//     <div class="modal__info">
//     <h1 class="modal__title"> ${data.title} </h1>
//     <ul class="modal__statistic-list">
//     <li class="modal__statistic-item"> Vote / Votes <span>${data.vote_average}/ ${data.vote_count}</span></li>
//     <li class="modal__statistic-item"> Popularity <span>${data.popularity}</span></li>
//     <li class="modal__statistic-item">Original Title <span>${data.original_title}</span></li>
//     <li class="modal__statistic-item">Genre <span>${data.genres.map((item)=>{return item['name']})}</span></li>
//     </ul>
//     <h2 class="modal__subtitle">ABOUT</h2>
//     <p class="modal__text">${data.overview}</p>
//     <button class="modal__adding-button"> ADD TO WATCHED </button>
//     <button class="modal__queue-button"> ADD TO QUEUE</button>    
   
//     </div> `;
   
    

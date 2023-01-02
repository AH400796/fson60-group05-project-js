const gallery = document.querySelector('.gallery__list');
const modalCard = document.querySelector('.modal__film-card-wrapper');
const modal = document.getElementById('auth__modal');

export const createMarkup = function (data, rating) {
  gallery.innerHTML = '';
  const ratingExistence = rating ? 'rating' : 'rating visually-hidden';
  const markup = data.results
    .map(item => {
      if (item.media_type && item.media_type === 'person') {
        return;
      }

      const poster =
        item.poster_path && item.poster_path !== null
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : `https://i.ibb.co/mbchPsg/no-poster.png`;

      return `<li class="gallery__item">
    <div class="id" hidden> ${item.id} </div>
    <div class="thumb">
    <img src="${poster}" alt="${item.title}" width="280">
    </div>
    <div class="gallery__info-wrapper">
    <p class="gallery__title">${(item.original_title || item.original_name).toUpperCase()}</p>
    <div class="gallery__info"><span class="genres-and-year">${getGenreName(item.genre_ids)} | ${
        Number.parseInt(item.release_date || item.first_air_date) || '-'
      }</span><span class="${ratingExistence}">${item.vote_average.toFixed(1)}</span></div></div></li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
};

function getGenreName(genre_ids) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    10765: 'Sci-Fi & Fantasy',
    10759: 'Action & Adventure',
  };

  if (genre_ids.length < 3) {
    return genre_ids.map(item => genres[item]).join(', ');
  }
  return (
    genre_ids
      .map(item => genres[item])
      .slice(0, 2)
      .join(', ') + ', Other'
  );
}

export const createFilmModalCard = function (data, watchedBtnContext, queueBtnContext, isSelectedWatched, isSelectedQueue) {
  const poster =
    data.poster_path && data.poster_path !== null
      ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
      : `https://i.ibb.co/mbchPsg/no-poster.png`;
  const markup = `<div class="thumb_modal-card"><img class="modal__card-img img" src="${poster}" alt="${data.original_title}" 
        ></div>      
      <div class="modal__card"> 
        <h3 class="modal__card-title">${data.title}</h3> 
        <ul class="modal__card-list list"> 
          <li class="card__item"> 
            <h4 class="card__item-title">Vote / Votes</h4> 
            <p class="card__item-vote">${data.vote_average ? data.vote_average.toFixed(1) : '0'}</p> 
            <span class="card__item-slash">/</span> 
            <p class="card__item-votes">${data.vote_count}</p> 
           <li class="card__item"> 
            <h4 class="card__item-title">Popularity</h4> 
            <p class="card__item-popularity">${data.popularity ? data.popularity.toFixed(1) : '0'}</p> 
          </li> 
          <li class="card__item"> 
            <h4 class="card__item-title">Original&nbsp;Title</h4> 
            <p class="card__item-original">${data.original_title}</p> 
          </li> 
          <li class="card__item"> 
            <h4 class="card__item-title">Genre</h4> 
            <p class="card__item-genre">${data.genres
              .map(item => {
                return item['name'];
              })
              .join(', ')}</p> 
          </li> 
        </ul> 
        <h4 class="card__item-about">About</h4> 
        <p id="card__item-about__text" class="card__item-about__text card__item-text">${data.overview}</p> 
         <ul class="card__btn-list list"> 
          <li class="card__btn-item"> 
            <button class="${isSelectedWatched} hidden">${watchedBtnContext}</button> 
          </li> 
          <li class="card__btn-item"> 
            <button class="${isSelectedQueue} hidden">${queueBtnContext}</button> 
          </li> 
        </ul> 
      </div> `;
  modalCard.insertAdjacentHTML('beforeend', markup);
};

export const createModalAuthForm = function () {
  const markupForm = `<form class="sign-in__form" name="sign-in-form">
  <label class="sign-in__label">
    <span class="sign-in__field">
      <input class="sign-in__input-email" type="email" name="email" placeholder="Email" required minlength="4" />
    </span>
  </label>
  <label class="sign-in__label">
    <span class="sign-in__field">
      <input class="sign-in__input-password" type="text" name="password" placeholder="Password" required minlength="6" maxlength="12" />
    </span>
  </label>
  <div class="sign__btn">
    <button class="sign-in__btn" type="submit">
      Sign in
    </button>
    <button class="sign-up__btn" type="submit">
      Sign up
    </button>    
  </div>  
</form>
<button class="sign-in-with-google__btn" type="submit">
  <img class="google-icon" src="https://i.ibb.co/7tV3M1B/Frame-3-1.png" alt="google" width="20" height="20">    
      Sign in with Google
    </button> `;
  modal.innerHTML = markupForm;
};

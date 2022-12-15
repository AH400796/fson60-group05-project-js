// потрібно додати класи до кнопок "add to watch" - .js-add-watched i  "add to queue" - .js-add-queue, або замінити існуючі тут.
const KEY_WATCHED = 'watched';
const KEY_QUEUE = 'queue';
const watchedMovies = [];
const queueMovies = [];
const { watched, queue, addToWatched, addToQueue } = {
  watched: document.querySelector('.js-watched'),
  queue: document.querySelector('.js-queue'),
  addToWatched: document.querySelector('.js-add-watched'),
  addToQueue: document.querySelector('.js-add-queue'),
};
addToWatched.addEventListener('click', onAddToWatched);
addToQueue.addEventListener('click', onAddToQueue);
watched.addEventListener('click', onClickWatched);
queue.addEventListener('click', onClickQueue);

function onAddToWatched() {
  localStorage.setItem('KEY_WATCHED', JSON.stringify(data));

  addToWatched.disabled = true;
  Notiflix.Notify.success(`Movie ${resp.data.totalHits} added to watched`);
}

function onAddToQueue() {
  localStorage.setItem('KEY_QUEUE', JSON.stringify(data));

  addToQueue.disabled = true;
  Notiflix.Notify.success(`Movie ${resp.data.totalHits} added to queue`);
}

function onClickWatched() {
  queue.classList.remove('current');
  watched.classList.add('current');
  //  + рендеринг списку переглянутих фільмів (Watched) -------TASK 5
  try {
    watchedMovies = JSON.parse(localStorage.getItem('KEY_WATCHED')) || [];
    if (watchedMovies.length < 1) {
      Notiflix.Notify.info("You haven't added anything to the movies you've watched yet");
    }
    createMarkup(watchedMovies);
  } catch (error) {
    console.log(error.message);
  }
}

function onClickQueue() {
  watched.classList.remove('current');
  queue.classList.add('current');
  //  + рендеринг списку фільмів, які додані в чергу на перегляд (Queue) -------TASK 5
  try {
    queueMovies = JSON.parse(localStorage.getItem('KEY_QUEUE')) || [];
    if (queueMovies.length < 1) {
      Notiflix.Notify.info("You haven't added any movie to the queue yet.");
    }
    createMarkup(queueMovies);
  } catch (error) {
    console.log(error.message);
  }
}

function createMarkup(data) {
  let markup = data.results
    .map(item => {
      return `<div class="gallery__item">
    <img src="https://www.themoviedb.org/t/p/original${item.poster_path}" alt="${item.original_title}">
    <h2 class="gallery__title">${item.original_title}</h2>
    <p class="gallery__info">${item.genre_ids} | ${item.release_date} ${item.vote_average}</p></div>`;
    })
    .join('');
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', markup);
}

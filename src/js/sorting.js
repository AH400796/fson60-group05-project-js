import { fetchFilm } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';
import { addSpinner, removeSpinner } from './spinner';
import { startPagination, setSearchPagination } from './pagination';

// ПОТРІБНО імпортувати з MY LIBRARY  


// Потрібен експорт

const listDate = document.querySelector('.sorting__btn--by-date');
const listRating = document.querySelector('sorting__btn--by-rating');

listDate.addEventListener('click', onClickDate);
listRating.addEventListener('click', onClickRating);

function onClickDate() {
  clearGallery();
  listRating.disabled = true;
  addSpinner();
  sortWatchedMoviesByDate()
    // sortQueueMoviesByDate();
}
  

function onClickRating() {
  clearGallery(); 
  listDate.disabled = true;
  addSpinner();
  sortWatchedMoviesByRating()
  // sortQueueMoviesByRating();
}


function sortWatchedMoviesByDate() {
  let sortedWatchedMoviesByDate = watchedMovies.sort((a, b) => b.item.release_date - a.item.release_date);
  createMarkup(sortedWatchedMoviesByDate);
  return;
}

function sortWatchedMoviesByRating() {
  let sortedWatchedMoviesByRating = watchedMovies.sort((a, b) => b.item.vote_average - a.item.vote_average);
  createMarkup(sortedWatchedMoviesByRating);
  return;
}

function sortQueueMoviesByDate() {
  let sortedQueueMoviesByDate = queueMovies.sort((a, b) => b.item.release_date - a.item.release_date);
  createMarkup(sortedQueueMoviesByDate);
  return;
}

function sortQueueMoviesByRating() {
  let sortedQueueMoviesByRating = queueMovies.sort((a, b) => b.item.vote_average - a.item.vote_average);
  createMarkup(sortedQueueMoviesByRating);
  return;
}
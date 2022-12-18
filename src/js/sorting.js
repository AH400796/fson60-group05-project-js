import { fetchFilm } from './fetch';
import { createMarkup } from './create-markup';
import { clearGallery } from './utility-functions';

// ПОТРІБНО імпортувати з search.js   ???

// Поява чекбоксів має бути реалізована при фільтрації (search)? (відфільтрував і з"явились чек бокси???)
// Додати в markup ?????

/**
  |============================
  | HTML  знаходиться в файлі sorting.html
  |============================
*/

/**
  |============================
  | SCSS  стилі  в файлі _checkbox.scss  Потрібно підключити
  |============================
*/

// Потрібен експорт

const listDate = document.querySelector('#check__date');
const listRating = document.querySelector('#check__rating');

listDate.addEventListener('click', onCheckedDate);
listRating.addEventListener('click', onCheckedRating);

function onCheckedDate() {
  if (listDate.checked) {
    clearGallery();
    fetchFilm(value).then(data => {
      data.sort((a, b) => b.item.release_date - a.item.release_date);
      createMarkup(data);
      return;
    });
  } else {
    onSubmit();
  }
}
// sort - змінює вихідний масив, щоб сортувати копію, потрібно зробити поверхневу копію до виклику sort()
// const sorted = [...data].sort((a, b) => b - a);

// fetchFilm(value).sort(function(a, b){
// const dateA=new Date(a.release_date), dateB=new Date(b.release_date)
// return dateA-dateB //сортування за зростаючою датою!
// })

function onCheckedRating() {
  if (listRating.checked) {
    clearGallery();
    fetchFilm(value).then(data => {
      data.sort((a, b) => b.item.vote_average - a.item.vote_average);
      createMarkup(data);
      return;
    });
  } else {
    onSubmit();
  }
}

// сортування по двом параметрам
// потрібно взяти результат search і відсортувати двічі.... тут проблема

function checkedAll() {
  if (listDate.checked && listRating.checked) {
    clearGallery();
    fetchFilm(value).then(data => {
      data.sort((a, b) => b.item.release_date - a.item.release_date);
      // другий sort ?????

      createMarkup(data);
      return;
    });
  } else {
    onSubmit();
  }
}

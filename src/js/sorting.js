
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

/**  SVG для чекбокса
 * 
 <symbol id="icon-uncheck" viewBox="0 0 448 512">
      <path
        d="M0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96ZM48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80H64C55.16 80 48 87.16 48 96Z"
        fill="black" />
    </symbol>

 <symbol id="icon-check" viewBox="0 0 34 32">
      <path fill="#2196f3" style="fill: var(--color1, #2196f3)"
        d="M4.267 0h25.6c2.356 0 4.267 1.91 4.267 4.267v23.467c0 2.356-1.91 4.267-4.267 4.267h-25.6c-2.356 0-4.267-1.91-4.267-4.267v-23.467c0-2.356 1.91-4.267 4.267-4.267z">
      </path>
      <path fill="#fff" style="fill: var(--color2, #fff); stroke: var(--color2, #fff)" stroke="#fff"
        stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="0.4267"
        d="M8.442 16.537l-0.147-0.14-2.205 2.088 7.767 7.41 16.318-15.567-2.19-2.089-14.128 13.465-5.416-5.167z"></path>
    </symbol>
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
    fetchFilm(value)
      .then(data => {
         data.sort((a, b) => b.item.release_date  - a.item.release_date);
        createMarkup(data);
        return;
      })
  } else {
    onSubmit();
  }
};
// sort - змінює вихідний масив, щоб сортувати копію, потрібно зробити поверхневу копію до виклику sort()
// const sorted = [...data].sort((a, b) => b - a);

// fetchFilm(value).sort(function(a, b){
// const dateA=new Date(a.release_date), dateB=new Date(b.release_date)
// return dateA-dateB //сортування за зростаючою датою!
// })

function onCheckedRating() {
  if (listRating.checked) {
     clearGallery();
    fetchFilm(value)
      .then(data => {
        data.sort((a, b) => b.item.vote_average - a.item.vote_average);
        createMarkup(data);
         return;
      })  
  } else {
      onSubmit();
   }
  }

// сортування по двом параметрам
// потрібно взяти результат search і відсортувати двічі.... тут проблема

function checkedAll() {

  if (listDate.checked && listRating.checked) {
    clearGallery();
    fetchFilm(value)
      .then(data => {
        data.sort((a, b) => b.item.release_date - a.item.release_date);
        // другий sort ?????

        createMarkup(data);
        return;
      })
  } else {
    onSubmit();
  } 
  }


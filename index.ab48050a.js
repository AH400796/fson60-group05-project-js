function A(A){return A&&A.__esModule?A.default:A}var g="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};const i=document.querySelector(".gallery__list"),C=document.querySelector(".modal__film-card"),B=function(A,g){i.innerHTML="";const C=g?"rating":"rating visually-hidden",B=A.results.map((A=>{if(A.media_type&&"person"===A.media_type)return;const g=A.poster_path&&null!==A.poster_path?`https://image.tmdb.org/t/p/w500${A.poster_path}`:"https://i.ibb.co/mbchPsg/no-poster.png";return`<li class="gallery__item">\n    <div class="id" hidden> ${A.id} </div>\n    <div class="thumb">\n    <img src="${g}" alt="${A.title}" width="280">\n    </div>\n    <div class="gallery__info-wrapper">\n    <p class="gallery__title">${(A.original_title||A.original_name).toUpperCase()}</p>\n    <div class="gallery__info"><span class="genres-and-year">${function(A){const g={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western",10765:"Sci-Fi & Fantasy",10759:"Action & Adventure"};return A.length<3?A.map((A=>g[A])).join(", "):A.map((A=>g[A])).slice(0,2).join(", ")+", Other"}(A.genre_ids)} | ${Number.parseInt(A.release_date||A.first_air_date)||"-"}</span><span class="${C}">${A.vote_average.toFixed(1)}</span></div></div></li>`})).join("");i.insertAdjacentHTML("beforeend",B)};const I=function(A,g,i,B,I){const E=`<div class="thumb_modal-card"><img class="modal__card-img img" src="${A.poster_path&&null!==A.poster_path?`https://image.tmdb.org/t/p/original/${A.poster_path}`:"https://i.ibb.co/mbchPsg/no-poster.png"}" alt="${A.original_title}" \n        width="375" height="478"></div>\n      <div class="modal__card"> \n        <h3 class="modal__card-title">${A.title}</h3> \n        <ul class="modal__card-list list"> \n          <li class="card__item"> \n            <h4 class="card__item-title">Vote / Votes</h4> \n            <p class="card__item-vote">${A.vote_average?A.vote_average.toFixed(1):"0"}</p> \n            <span class="card__item-slash">/</span> \n            <p class="card__item-votes">${A.vote_count}</p> \n           <li class="card__item"> \n            <h4 class="card__item-title">Popularity</h4> \n            <p class="card__item-popularity">${A.popularity?A.popularity.toFixed(1):"0"}</p> \n          </li> \n          <li class="card__item"> \n            <h4 class="card__item-title">Original&nbsp;Title</h4> \n            <p class="card__item-original">${A.original_title}</p> \n          </li> \n          <li class="card__item"> \n            <h4 class="card__item-title">Genre</h4> \n            <p class="card__item-genre">${A.genres.map((A=>A.name)).join(", ")}</p> \n          </li> \n        </ul> \n        <h4 class="card__item-about">About</h4> \n        <p id="card__item-about__text" class="card__item-about__text card__item-text">${A.overview}</p> \n         <ul class="card__btn-list list"> \n          <li class="card__btn-item"> \n            <button class="${B}">${g}</button> \n          </li> \n          <li class="card__btn-item"> \n            <button class="${I}">${i}</button> \n          </li> \n        </ul> \n      </div> `;C.insertAdjacentHTML("beforeend",E)};var E,o={};
/*!
 * TOAST UI Pagination
 * @version 3.4.1
 * @author NHN FE Development Team <dl_javascript@nhn.com>
 * @license MIT
//# sourceMappingURL=index.ab48050a.js.map
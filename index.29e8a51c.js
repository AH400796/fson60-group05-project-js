!function(){function A(A){return A&&A.__esModule?A.default:A}var g="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i=document.querySelector(".gallery__list"),C=document.querySelector(".modal__film-card"),I=function(A,g){i.innerHTML="";var C=g?"rating":"rating visually-hidden",I=A.results.map((function(A){if("person"!==A.media_type){var g,i,I=A.poster_path&&null!==A.poster_path?"https://image.tmdb.org/t/p/w500".concat(A.poster_path):"https://i.ibb.co/mbchPsg/no-poster.png";return'<li class="gallery__item">\n    <div class="id" hidden> '.concat(A.id,' </div>\n    <div class="thumb">\n    <img src="').concat(I,'" alt="').concat(A.title,'" width="280">\n    </div>\n    <div class="gallery__info-wrapper">\n    <p class="gallery__title">').concat((A.original_title||A.original_name).toUpperCase(),'</p>\n    <div class="gallery__info"><span class="genres-and-year">').concat((g=A.genre_ids,i={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western",10765:"Sci-Fi & Fantasy",10759:"Action & Adventure"},g.length<3?g.map((function(A){return i[A]})).join(", "):g.map((function(A){return i[A]})).slice(0,2).join(", ")+", Other")," | ").concat(Number.parseInt(A.release_date||A.first_air_date),'</span><span class="').concat(C,'">').concat(A.vote_average.toFixed(1),"</span></div></div></li>")}})).join("");i.insertAdjacentHTML("beforeend",I)};var B,o=function(A){var g='<img class="modal__card-img img" src="https://image.tmdb.org/t/p/original/'.concat(A.poster_path,'" alt="').concat(A.original_title,'" \n        width="375" height="478"> \n      <div class="modal__card"> \n        <h3 class="modal__card-title">').concat(A.title,'</h3> \n        <ul class="modal__card-list list"> \n          <li class="card__item"> \n            <h4 class="card__item-title">Vote / Votes</h4> \n            <p class="card__item-vote">').concat(A.vote_average?A.vote_average.toFixed(1):"0",'</p> \n            <span class="card__item-slash">/</span> \n            <p class="card__item-votes">').concat(A.vote_count,'</p> \n \n          <li class="card__item"> \n            <h4 class="card__item-title">Popularity</h4> \n            <p class="card__item-popularity">').concat(A.popularity?A.popularity.toFixed(1):"0",'</p> \n          </li> \n          <li class="card__item"> \n            <h4 class="card__item-title">Original Title</h4> \n            <p class="card__item-original">').concat(A.original_title,'</p> \n          </li> \n          <li class="card__item"> \n            <h4 class="card__item-title">Genre</h4> \n            <p class="card__item-genre">').concat(A.genres.map((function(A){return A.name})).join(", "),'</p> \n          </li> \n        </ul> \n        <h4 class="card__item-about">About</h4> \n        <p class="card__item-about__text card__item-text">').concat(A.overview,'</p> \n \n        <ul class="card__btn-list list"> \n          <li class="card__btn-item"> \n            <button class="card__btn">add to Watched</button> \n          </li> \n          <li class="card__btn-item"> \n            <button class="card__btn">add to queue</button> \n          </li> \n        </ul> \n      </div> ');C.insertAdjacentHTML("beforeend",g)},E={};window,
/*!
 * TOAST UI Pagination
 * @version 3.4.1
 * @author NHN FE Development Team <dl_javascript@nhn.com>
 * @license MIT
 */
//# sourceMappingURL=index.29e8a51c.js.map
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { searchFilm } from './fetch';
import { clearGallery } from './utility-functions';
import { getTrendingFilms } from './fetch';
import { createMarkup } from './create-markup';
import { removeSpinner, addSpinner } from './spinner';

export const startPagination = function (totalFilms) {
  const screenWidth = window.screen.width;
  let pagBtnNumder = 5;
  if (screenWidth < 400) {
    pagBtnNumder = 3;
  }
  let page = 1;
  const container = document.getElementById('pagination');
  const options = {
    totalItems: totalFilms,
    itemsPerPage: 20,
    visiblePages: pagBtnNumder,
    usageStatistics: false,
    page,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton: '<a href="#" class="tui-page-btn tui-{{type}}">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + '</a>',
      disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + '</span>',
      moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' + '<span class="tui-ico-ellip">...</span>' + '</a>',
    },
  };

  const pagination = new Pagination(container, options);
};

export const setTrendPagination = function (page) {
  const paginationBtns = document.querySelector('.tui-pagination');
  paginationBtns.addEventListener('click', onClick);
  function onClick() {
    for (const key of Object.entries(paginationBtns.children)) {
      if (key[1].className.includes('selected')) {
        page = Number(key[1].textContent);
      }
    }
    renderTrendPaginationQuery(page);
  }
};

export const setSearchPagination = function (value, page) {
  const paginationBtns = document.querySelector('.tui-pagination');
  paginationBtns.addEventListener('click', onClick);
  function onClick() {
    for (const key of Object.entries(paginationBtns.children)) {
      if (key[1].className.includes('selected')) {
        page = Number(key[1].textContent);
      }
    }
    renderSearchPaginationQuery(value, page);
  }
};

function renderTrendPaginationQuery(pageNumber) {
  clearGallery();
  getTrendingFilms(pageNumber)
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    });
  // .finally(removeSpinner);
}

function renderSearchPaginationQuery(filmName, pageNumber) {
  clearGallery();
  searchFilm(filmName, pageNumber)
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, something went wrong!');
    });
  // .finally(removeSpinner);
}

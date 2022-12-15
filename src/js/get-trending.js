
API_KEY = 'fbee7941f117d258bba2ad0706e433a4';
BASE_URL = 'https://api.themoviedb.org/3/';

async function getTrendingFilms() {
    const response = await fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}`);
    const responseData = await response.json();
    createMarkup(responseData)
}

getTrendingFilms()

function createMarkup(data) {
    let markup = data.results.map(item => {
        return `<div class="gallery__item">
    <img src="https://www.themoviedb.org/t/p/original${item.poster_path}" alt="${item.original_title}">
    <h2 class="gallery__title">${item.original_title}</h2>
    <p class="gallery__info">${item.genre_ids} | ${item.release_date} ${item.vote_average}</p></div>`;
    }).join('');
    const gallery = document.querySelector('.gallery');
    gallery.insertAdjacentHTML('beforeend', markup);
}


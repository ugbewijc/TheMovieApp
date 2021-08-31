import './stylesheets/main.css';
import {loadMovies} from './scripts/moviesApi.js'

const movie_panel = document.getElementById('home_panel');

let modalElement;
let movie_current_page;
let movie_total_page;

const displayMovies = (movies) => {
  try {
    for (let movie of movies) {
      const {backdrop_path,id,original_title,overview,release_date,vote_average} = movie;
      const movie_element = document.createElement('figure');
      movie_element.className = 'movie';
      movie_element.innerHTML = `
      <img class="movie__img" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="${original_title}">
      <article id="${id}" class="modal">
        <div class="modal__content">
          <span class="modal__close-button">close</span>
          <img class="modal__img" src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="${original_title}">
          <h3>${original_title}</h3>
          <p>${overview}</p>
          <p>Release Date: ${release_date}</p>
        </div>
      </article>
      <figcaption>
        <button  class="movie__title" data-id="${id}" type="button" name="${original_title}">${original_title}
          <span class="movie__rating">${vote_average}</span>
        </button>
      `;
      movie_panel.appendChild(movie_element);
    }
  } catch (e) {}
};

const getMovies = (pageNumber=1) => {
  try {
    loadMovies(pageNumber).then(res => {
      movie_current_page = res?.page;
      movie_total_page = res?.total_pages;
      displayMovies(res?.results);
    });
  } catch (e) {}
};

const toggleModal = (elemt) => {
  elemt.classList.toggle("show-modal");
};

const onclickEvent = (e) => {
  if (modalElement && (e.target.classList.contains("show-modal") || e.target.classList.contains("modal__close-button"))){
    toggleModal(modalElement);
  }
  if (e.target.dataset.id) {
    modalElement= document.getElementById(`${e.target.dataset.id}`);
    toggleModal(modalElement);
  }
};

getMovies();

document.addEventListener("click", onclickEvent);
window.addEventListener('scroll',()=>{
  const{scrollTop,clientHeight,scrollHeight}=document.documentElement;
  if (((scrollTop+clientHeight)>=(scrollHeight))&&(movie_total_page>movie_current_page)) {
    getMovies((movie_current_page+1));
  }
});

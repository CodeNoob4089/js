let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let movieId = urlParams.get("id");

let movie = {};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MThiNWFlOTkyMWVhMDg3NDA3Yjc0ZGE0N2M4YjkwZSIsInN1YiI6IjY0NzQxYWYwOTQwOGVjMDBlMTRkMjIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uhe1VABbC4KF0emSaa_XiCC-VvcoKEXHKc9lyAGEqKk",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
  .then((response) => response.json())
  .then((data) => {
    movie = data;
    showMovieDetails();
  })
  .catch((err) => console.error(err));

function showMovieDetails() {
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  const detail = document.createElement("div");
  detail.className = "info";
  detail.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
    <h2>${movie.title}</h2>
    <p>개봉일: ${movie.release_date}</p>
    <p>줄거리: ${movie.overview}</p>
    <p class="rating">평점: ${movie.vote_average}</p>
  `;
  movieContainer.appendChild(detail);
}

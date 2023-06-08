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
  <div class="poster">
  <img alt="포스터" src="https://image.tmdb.org/t/p/w300/${
    movie.poster_path
  }" />
  </div>
  <div class="desc">
  <h1>${movie.title}</h1>
  <h3>${movie.release_date}</h3>
  <h2>${movie.vote_average.toFixed(1)}</h2>
  <ul>
  ${movie.genres.map((el) => {
    return `<li>${el.name}</li>`;
  })}
  </ul>
  <p>${movie.overview}</p>

  </div>
  `;
  document.title = `${movie.title} | 상세보기`;
  movieContainer.appendChild(detail);
}

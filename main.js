const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MThiNWFlOTkyMWVhMDg3NDA3Yjc0ZGE0N2M4YjkwZSIsInN1YiI6IjY0NzQxYWYwOTQwOGVjMDBlMTRkMjIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uhe1VABbC4KF0emSaa_XiCC-VvcoKEXHKc9lyAGEqKk",
  },
};

const topMovie1 = document.getElementById("topMovie1");
const topMovie2 = document.getElementById("topMovie2");
const topMovie3 = document.getElementById("topMovie3");

let movies = [];


fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    movies = data.results;
    displayMovies(movies);
    displayTopMovies(movies);
  })
  .catch((err) => console.error(err));

function displayTopMovies(movies) {
  topMovie1.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movies[1].poster_path}" alt="${movies[1].title}" />
    `;
  topMovie2.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movies[0].poster_path}" alt="${movies[0].title}" />
    `;
  topMovie3.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movies[2].poster_path}" alt="${movies[2].title}" />
    `;
}



function displayMovies(movies) {
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
        <h2>${movie.title}</h2>
        <p>내용 요약: ${movie.overview}</p>
        <p class="rating">평점: ${movie.vote_average}</p>
      `;
    card.setAttribute("data-id", movie.id);
    card.addEventListener("click", function (event) {
      const id = event.currentTarget.getAttribute("data-id");
      window.location.href = `subpage.html?id=${id}`;
    });
    movieContainer.appendChild(card);
  });
}

function filter() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let search = movies.filter(function (movie) {
    return movie.title.toLowerCase().includes(input);
  });

  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  search.forEach(function (movie) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
        <h2>${movie.title}</h2>
        <p>내용 요약: ${movie.overview}</p>
        <p class="rating">평점: ${movie.vote_average}</p>
      `;

    movieContainer.appendChild(card);
  });
}

let String = window.location.search;
let urlParam = new URLSearchParams(String);
let movieId = urlParam.get("id");

let movies = [];
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
    movies = data.results;
    Showmovies(movies);
  })
  .catch((err) => console.error(err));

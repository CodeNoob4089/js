let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let movieId = urlParams.get("id");
const back = document.querySelector(".background");


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
    loadComments();
  })
  .catch((err) => console.error(err));



function showMovieDetails() {
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  const detail = document.createElement("div");
  detail.className = "info";
  detail.innerHTML = `
    <div class="poster">
      <img alt="포스터" src="https://image.tmdb.org/t/p/w300/${movie.poster_path
    }" />
    </div>
    <div>
      <h1>${movie.title}</h1>
      <h3>${movie.release_date}</h3>
      <h3>평점 : ${movie.vote_average.toFixed(1)}</h3>
      <p>${movie.overview}</p>
    </div>
  `;
  document.title = `${movie.title} | 상세보기`;
  movieContainer.appendChild(detail);
  back.style.backgroundImage = `url(https://image.tmdb.org/t/p/w300/${movie.backdrop_path})`;
}

const commentsContainer = document.getElementById("comments-container"); //댓글 전체
const commentForm = document.getElementById("comment-form");
const nicknameInput = document.getElementById("nickname-input"); //닉네임
const passwordInput = document.getElementById("password-input"); // 비밀번호
const contentInput = document.getElementById("content-input"); // 댓글 내용
const deleteAllButton = document.getElementById("delete-all-button"); // 전체삭제

// 내가 공부할부분
// 댓글 배열
let comments = [];

// 댓글 작성
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nickname = nicknameInput.value.trim();
  const password = passwordInput.value;
  const content = contentInput.value.trim();

  if (!nickname || !password || !content) {
    alert("닉네임, 비밀번호, 댓글 내용을 모두 입력해주세요.");
    return;
  }

  const comment = {
    id: movieId,
    nickname: nickname,
    password: password,
    content: content,
    date: new Date().toLocaleString(),
  };

  // 기존 댓글 배열에 추가
  comments.push(comment);

  // 댓글 배열을 로컬 스토리지에 저장
  saveComments();

  // 댓글 입력 양식 초기화
  nicknameInput.value = "";
  passwordInput.value = "";
  contentInput.value = "";

  // 댓글 목록 다시 불러오기
  loadComments();
});

// 댓글 목록 불러오기
function loadComments() {
  commentsContainer.innerHTML = "";

  // 로컬 스토리지에서 댓글 배열 불러오기
  const storedComments = localStorage.getItem("comments");
  if (storedComments) {
    comments = JSON.parse(storedComments);
  }

  // 해당 영화의 댓글만 출력
  const movieComments = comments.filter((comment) => comment.id === movieId);

  // 각 댓글을 출력
  movieComments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const nicknamePara = document.createElement("p");
    nicknamePara.className = "nickname";
    nicknamePara.textContent = comment.nickname;
    commentDiv.appendChild(nicknamePara);

    const contentPara = document.createElement("p");
    contentPara.className = "content";
    contentPara.textContent = comment.content;
    commentDiv.appendChild(contentPara);

    const datePara = document.createElement("p");
    datePara.className = "date";
    datePara.textContent = comment.date;
    commentDiv.appendChild(datePara);

    // 수정 버튼
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => {
      showEditCommentForm(comment.id);
    });
    commentDiv.appendChild(editButton);

    // 삭제 버튼
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      deleteComment(comment.id);
    });
    commentDiv.appendChild(deleteButton);

    commentsContainer.appendChild(commentDiv);
  });
}

// 댓글 삭제
function deleteComment(commentId) {
  const comment = comments.find((comment) => comment.id === commentId);

  if (!comment) {
    alert("해당 댓글을 찾을 수 없습니다.");
    return;
  }

  const password = prompt("비밀번호를 입력하세요.");

  if (password !== comment.password) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const confirmed = confirm("정말로 삭제하시겠습니까?");
  if (confirmed) {
    // 해당 id의 댓글 제외하고 다시 저장
    comments = comments.filter((comment) => comment.id !== commentId);

    // 댓글 배열을 로컬 스토리지에 저장
    saveComments();

    // 댓글 목록 다시 불러오기
    loadComments();
  }
}

// 댓글 수정 폼 보여주기
function showEditCommentForm(commentId) {
  const comment = comments.find((comment) => comment.id === commentId);

  if (!comment) {
    alert("해당 댓글을 찾을 수 없습니다.");
    return;
  }

  const password = prompt("비밀번호를 입력하세요.");

  if (password !== comment.password) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const editedContent = prompt("댓글을 수정해주세요.", comment.content);

  if (editedContent !== null) {
    const confirmed = confirm("댓글을 수정하시겠습니까?");
    if (confirmed) {
      comment.content = editedContent;
      comment.date = new Date().toLocaleString();

      // 댓글 배열을 로컬 스토리지에 저장
      saveComments();

      // 댓글 목록 다시 불러오기
      loadComments();
    }
  }
}
// 모든 댓글 삭제
deleteAllButton.addEventListener("click", () => {
  const password = prompt("비밀번호를 입력하세요.");

  if (password !== "1234") {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const confirmed = confirm("정말로 모든 댓글을 삭제하시겠습니까?");
  if (confirmed) {
    // 댓글 배열 초기화
    comments = [];

    // 댓글 배열을 로컬 스토리지에 저장
    saveComments();

    // 댓글 목록 다시 불러오기
    loadComments();
  }
});

// 댓글 배열을 로컬 스토리지에 저장
function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}
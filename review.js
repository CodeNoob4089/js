//localStorage에 저장된 값 화면에 띄워주기
let commentLength = localStorage.length; //localStorage에 저장된 data 갯수

//저장된 key값(작성자명) 배열로 만들기
let keys = [];
for (let i = 0; i < commentLength; i++) {
  let key = localStorage.key(i);
  keys.push(key);
}
let comments = [];
keys.map((key) => {
  let comment = JSON.parse(localStorage.getItem(key));
  comments.push(comment);
});
comments.sort((a, b) => new Date(b["date"]) - new Date(a["date"])); //시간순 정렬

const commentDiv = document.querySelector("#review-list");
comments.map((comment) => {
  const commentUl = document.createElement("ul");
  commentUl.innerHTML = `<label>작성자</label><li>${comment.username}</li>
  <label>리뷰</label><li>${comment.review}</li>
    <button class="edit">수정</button>
    <button id="${comment.username}" class="delete">삭제</button>`;
  commentDiv.appendChild(commentUl);
});

//작성 시간
let today = new Date();
// let todayYear = today.getFullYear();
// let todayMonth = today.getMonth();
// let todayDate = today.getDate();

//저장 버튼
function submit() {
  const username = document.querySelector(".username").value; //작성자
  const review = document.querySelector(".review").value; //리뷰
  const newPassword = document.querySelector(".password").value; //비밀번호
  let comment = {
    username: username,
    review: review,
    password: newPassword,
    date: today,
  };

  // 작성자명 있는 경우 비밀번호 확인
  if (keys.includes(username) == true) {
    let password = JSON.parse(localStorage.getItem(username));
    password = password.password;
    if (password == newPassword) {
      localStorage.setItem(username, JSON.stringify(comment));
      alert("저장 했습니다!");
      location.reload();
    } else {
      alert("비밀번호가 일치하지 않습니다!");
      // location.reload();
    }
  } else {
    //작성자명 없는 경우
    if (newPassword) {
      if (newPassword.length < 4) {
        alert("비밀번호를 4글자 이상 입력해주세요!");
      } else {
        alert("저장 했습니다!");
        // localStorage.removeItem(username, JSON.stringify(comment));
        localStorage.setItem(username, JSON.stringify(comment));
        location.reload();
      }
    } else if (newPassword == false) {
      alert("비밀번호를 한글자 이상 입력해주세요!");
    }
  }
}

function submitBtn() {
  submit();
}
const submitbutton = document.querySelector(".submit-button");
submitbutton.addEventListener("click", submitBtn);

// 삭제 버튼
function deleteBtn(event) {
  if (event.target.matches(".delete")) {
    const username = event.target.id;
    let password = JSON.parse(localStorage.getItem(username));
    password = password.password;
    const newPassword = prompt("비밀번호를 입력하세요!");
    console.log(username, password, newPassword);

    if (newPassword == password) {
      const result = confirm("정말 삭제하시겠습니까?");
      if (result) {
        localStorage.removeItem(username);
        alert("삭제되었습니다!");
        location.reload();
      }
    } else if (newPassword === null) return;
    else {
      alert("비밀번호가 일치하지 않습니다!");
    }
  }
}

//수정 버튼
function editBtn(event) {
  console.log(event.target.className);
  const parent = event.target.parentNode;
  if (event.target.matches(".edit")) {
    window.scrollTo(0, 0);
    const username = parent.querySelectorAll("li")[0].innerHTML;
    const review = parent.querySelectorAll("li")[1].innerHTML;
    const newPassword = document.querySelector(".password").value;

    document.querySelector(".username").value = username;
    document.querySelector(".review").value = review;
  }
}

let editForm = document.createElement("input");
editForm.innerHTML = `<button>저장</button>`;

commentDiv.addEventListener("click", deleteBtn);
commentDiv.addEventListener("click", editBtn);

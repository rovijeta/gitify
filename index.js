const searchbar = document.querySelector(".search-bar");
const profilecontainer = document.querySelector(".profile-container");
const input = document.getElementById("input");
// console.log(input);
const url = "https://api.github.com/users/";
const noresults = document.getElementById("no-result");
// console.log(noresults);
const searchbtn = document.getElementById("submit-btn");
const avatar = document.getElementById("avatar");
// console.log(avatar);
const userName = document.getElementById("name");
const userId = document.getElementById("User-name");
const userBio = document.getElementById("User-bio");
const repo = document.getElementById("repo_info");
const followers = document.getElementById("followers_info");
const following = document.getElementById("following_info");
const profilebtn = document.getElementById("view_profile");
// const giturl = url + "web-designe";

searchbtn.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
  input.value = "";
});

input.addEventListener("keydown", function (e) {
  if (e.kay == "Enter") {
    if (input.value !== "") {
      getUserData(url + input.value);
    }
  }
});

input.addEventListener("input", function () {
  noresults.style.display = "none";
});

function getUserData(githubUrl) {
  fetch(githubUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}
// getUserData(giturl);

function updateProfile(data) {
  if (data.message !== "Not found") {
    noresults.style.display = "none";

    avatar.setAttribute("src", `${data.avatar_url}`);
    console.log(avatar.getAttribute("src"));
    userName.innerText = `${data.name}`;
    userId.innerText = `${data.login}`;
    userBio.innerText =
      data.bio == null ? "This Profile has no bio" : `${data.bio}`;
    repo.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    profilebtn.setAttribute("href", `${data.html_url}`);
  } else {
    noresults.style.display = "block";
  }
}

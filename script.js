let postContainer;
let navBar;
let placeTypeArray;
let placeType;
let homepage = document.querySelector("#homepage");
let travelPage = document.querySelector("#travel-page");
let commentsBox;
let upvoteBox;
let popUpBox;
let popupLeave;
let playCircle;
let boxes;
let errorMsg = `We're sorry, but the feature you're trying to access is currently
unavailable as it is still being developed. Please check back later
for updates. Thank you for your patience.`;
let popUpText = document.querySelector("#popup-text");
popUpText.textContent = errorMsg;

// In Homepage
const advCard = document.querySelector("#adv-card");
const natureCard = document.querySelector("#nature-card");
const religionCard = document.querySelector("#religion-card");
const historyCard = document.querySelector("#history-card");
// In Travel Page
const advPage = document.querySelector("#adv-page");
const naturePage = document.querySelector("#nature-page");
const religionPage = document.querySelector("#religion-page");
const historyPage = document.querySelector("#history-page");
const featuredPage = document.querySelector("featured-page");

const elements = document.querySelectorAll(".see-more");
const featuredImgs = document.querySelectorAll(".featured-img");

elements.forEach((element) => {
  element.addEventListener("click", () => {
    toggleState();
  });
});

featuredImgs.forEach((element) => {
  element.addEventListener("click", () => {
    toggleState();
  });
});
const cards = document.querySelectorAll(".home-card");
const navOptions = document.querySelectorAll(".nav-options");

function handleCardClick(target) {
  target.forEach((card) => {
    card.addEventListener("click", function () {
      let thisID = this.id;
      if (thisID === "religious-card") {
        addJSON("http://127.0.0.1:5500/holy_sites.json");
        navOptions[0].classList.add("active");
      } else if (thisID === "nature-card") {
        addJSON("http://127.0.0.1:5500/nature.json");
        navOptions[1].classList.add("active");
      } else if (thisID === "history-card") {
        addJSON("http://127.0.0.1:5500/historical_sites.json");
        navOptions[2].classList.add("active");
      } else if (thisID === "adv-card") {
        addJSON("http://127.0.0.1:5500/adventure.json");
        navOptions[3].classList.add("active");
      } else if (thisID === "featured-card") {
        addJSON("http://127.0.0.1:5500/featured.json");
        navOptions[4].classList.add("active");
      }
    });
  });
}

handleCardClick(cards);
handleCardClick(navOptions);
const navItems = document.querySelectorAll(".nav-options");

navItems.forEach((navItem) => {
  navItem.addEventListener("click", function () {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    this.classList.add("active");
  });
});

function toggleState() {
  travelPage.style.display = "grid";
  travelPage.scrollIntoView();
}

function addJSON(jsonLink) {
  const jsonURL = jsonLink;
  fetch(jsonURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (placeData) {
      placeType = placeData;
      navBar = document.querySelectorAll(".nav-bar")[0];
      postContainer = document.querySelectorAll(".post-container")[0];

      postContainer.innerHTML = "";
      for (i = 0; i < placeType.length; i++) {
        let tags = placeType[i].tags;
        const formattedTags = tags.map((tag) => `#${tag}`).join(" ");
        postContainer.innerHTML += `<li class="post-box">
          <div class="upvote-counter">
            <img
              src="up-arrow.png"
              alt="arrow pointing upwards"
              class="up-arrow"
            />
            <span class="current-count"> ${placeType[i].upvotes}</span>
          </div>
          <div class="image-box">
            <img
              src="${placeType[i].picture_link}"
              alt="img"
              class="img-div"
            />

            <a href="#popup" class="play-circle"
              ><img
                src="play-arrow.png"
                alt="play triangle"
                class="play-triangle"
            /></a>
          </div>
          <div class="details-box">
            <div class="name-box">
              <h2 class="place-name clamp">${placeType[i].place_name}</h2>
              <a href="#" class="place-link">${placeType[i].place_website}</a>
            </div>
            <div class="place-data">
              <p class="post-data">${placeType[i].published_time}hrs ago by</p>
              <i class="post-user clamp">${placeType[i].publisher}</i>
              <p class="tags clamp">
                <span class="hashtag">${formattedTags} </span>
              </p>
            </div>
          </div>
          <div class="comments-box">
            <img
              src="comment.png"
              alt="comments-box-image"
              class="comments-box-image"
            />
            <p class="clamp">${placeType[i].comments}</p>
          </div>
        </li>`;
      }
      popupLeave = document.querySelector("#popup-leave");

      popUpBox = document.querySelector("#popup");

      popupLeave.addEventListener("click", function () {
        popUpBox.style.display = "none";
      });
    });
}

function openPopupComments() {
  commentsBox = document.querySelectorAll(".comments-box");
  commentsBox.forEach((item) => {
    item.addEventListener("click", function () {
      popUpBox.style.display = "grid";
    });
  });
}
function openPopupUpvotes() {
  upvoteBox = document.querySelectorAll(".upvote-counter");
  upvoteBox.forEach((item) => {
    item.addEventListener("click", function () {
      popUpBox.style.display = "grid";
    });
  });
}

function openPopupVideo() {
  playCircle = document.querySelectorAll(".play-circle");
  playCircle.forEach((item) => {
    item.addEventListener("click", function () {
      popUpBox.style.display = "grid";
    });
  });
}

openPopupComments();
openPopupUpvotes();
openPopupVideo();

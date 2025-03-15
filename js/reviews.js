function onLoad() {
  fetchJSONData();
}

function onClickIndex(event) {
  let children = document.getElementById("index").children;

  for (const element of children) {
    element.firstChild.style.fontWeight = "normal";
  }

  event.target.style.fontWeight = "bold";
}

function initReviews(reviews) {
  // Index
  const indexEl = document.getElementById("index");
  indexEl.innerHTML = reviews
    .map((review) => `<p><a href="#${review.id}">${review.title}</a></p>`)
    .join("");

  indexEl.addEventListener("click", onClickIndex);

  // Reviews
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = reviews
    .map(
      (review) => `
    <h1 id="${review.id}">${review.title}</h1>
    <div class="film-details">
      <p class="rating">${"★".repeat(review.rating)}</p>
      <p class="bullet-spacer">•</p>
      <p>${review.duration}</p>
      <p class="bullet-spacer">•</p>
      <p>${review.year}</p>
      <p class="bullet-spacer">•</p>
      <p class="watch-date">${review.watchDate}</p>
    </div>
    <div class="film-review">
      ${review.content.map((para) => `<p>${para}</p>`).join("")}
    </div>
  `
    )
    .join("");
}

function fetchJSONData() {
  fetch(
    "https://gist.githubusercontent.com/raulberari/0d206e63880062b162d16aa4f2c3e914/raw"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      initReviews(data);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

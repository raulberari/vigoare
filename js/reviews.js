function onLoad() {
  fetchJSONData();
}

function onClickIndex(event) {
  const popupIndex = document.getElementById("popup-index");
  let children = popupIndex.children;

  for (const element of children) {
    element.firstChild.style.fontWeight = "normal";
  }

  event.target.style.fontWeight = "bold";
}

function initReviews(reviews) {
  // Index
  const indexHTML = reviews
    .map((review) => `<p><a href="#${review.id}">${review.title}</a></p>`)
    .join("");

  // Reviews
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = reviews
    .map(
      (review) => `
        <h1 id="${review.id}">${review.title}</h1>
        <div class="review-image">
            ${
              review.image
                ? `<a href="${review.image}" target="_blank">
                    <img src="${review.image}" alt="${review.title} cinematography" width=100%>
                  </a>`
                : `<div class="image-placeholder"></div>`
            }
        </div>
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

  window.reviewsIndexHTML = indexHTML;

  const overlay = document.getElementById("index-popup-overlay");

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeIndexPopup();
    }
  });
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

function toggleIndexPopup() {
  const overlay = document.getElementById("index-popup-overlay");
  if (overlay.style.display === "flex") {
    closeIndexPopup();
  } else {
    openIndexPopup();
  }
}

function openIndexPopup() {
  const overlay = document.getElementById("index-popup-overlay");
  const popupIndex = document.getElementById("popup-index");

  // Load the index content from the stored HTML
  popupIndex.innerHTML = window.reviewsIndexHTML;

  // Add click event to popup index links
  popupIndex.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      onClickIndex(event);
      closeIndexPopup();
    }
  });

  overlay.style.display = "flex";

  // Add ESC key listener
  document.addEventListener("keydown", handleEscKey);
}

function closeIndexPopup() {
  const overlay = document.getElementById("index-popup-overlay");
  overlay.style.display = "none";

  // Remove ESC key listener
  document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    closeIndexPopup();
  }
}

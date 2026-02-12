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
    .map(
      (review) =>
        `<p data-director="${review.director}"><a href="#${review.id}">${review.title} (${review.year})</a></p>`,
    )
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
    `,
    )
    .join("");

  window.reviewsIndexHTML = indexHTML;

  const overlay = document.getElementById("index-popup-overlay");
  Events.onClickOutside(overlay, closeIndexPopup);

  window.location.hash = window.location.hash;
}

async function fetchJSONData() {
  try {
    const data = await fetchData("./data/reviews.json");
    initReviews(data);
  } catch (error) {
    console.error("Failed to load reviews data:", error);
  }
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
  const searchInput = document.getElementById("index-search");

  popupIndex.innerHTML = window.reviewsIndexHTML;

  searchInput.value = "";

  searchInput.addEventListener("input", filterReviews);
  searchInput.focus();

  popupIndex.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      onClickIndex(event);
      closeIndexPopup();
    }
  });

  overlay.style.display = "flex";

  window.removeEscListener = Events.onEscape(closeIndexPopup);
}

function closeIndexPopup() {
  const overlay = document.getElementById("index-popup-overlay");
  overlay.style.display = "none";

  // Remove ESC key listener
  if (window.removeEscListener) {
    window.removeEscListener();
    window.removeEscListener = null;
  }
}

function filterReviews() {
  const searchTerm = document
    .getElementById("index-search")
    .value.toLowerCase();
  const popupIndex = document.getElementById("popup-index");
  const allReviews = popupIndex.getElementsByTagName("p");

  for (const item of allReviews) {
    const title = item.textContent.toLowerCase();
    const director = item.getAttribute("data-director").toLowerCase();

    if (title.includes(searchTerm) || director.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}

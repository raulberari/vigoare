function onLoad() {
  window.photos = [];
  window.themeManager = new ThemeManager();
  fetchJSONData();
}

const photoCount = {
  structures: 75,
  industry: 25,
  light: 27,
  nature: 24,
  noise: 26,
};

const newPhotos = {
  structures: [75],
  industry: [25],
  light: [27],
  nature: [23, 24],
  noise: [26],
};

async function fetchJSONData() {
  try {
    const data = await fetchData(
      "https://gist.githubusercontent.com/raulberari/05acdedc2aff60d2b940ca73ca654404/raw"
    );
    initPhotos(data);
  } catch (error) {
    console.error("Failed to load subpages data:", error);
  }
}

function initPhotos(descriptions) {
  const pageName = document.body.getAttribute("data-name");

  window.photoGrid = new PhotoGrid(
    pageName,
    photoCount[pageName],
    newPhotos[pageName]
  );

  window.photoGrid.setupIntersectionObserver(descriptions);

  // Initial load
  window.photoGrid.loadPhotos(descriptions);

  // Reflow photos on window resize
  window.addEventListener("resize", () => {
    window.photoGrid.reflowPhotos();
  });
}

function reflowPhotos() {
  if (window.photoGrid) {
    window.photoGrid.reflowPhotos();
  }
}

setTimeout(function () {
  const quoteText = document.querySelector(".quote-text");
  quoteText.classList.add("visible");
}, 1000);

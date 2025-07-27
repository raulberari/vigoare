function onLoad() {
  window.photos = [];
  window.themeManager = new ThemeManager();
  fetchJSONData();
}

const photoCount = {
  architecture: 71,
  industry: 26,
  light: 30,
  lines: 26,
  me: 45,
  nature: 25,
  noise: 25,
};

const newPhotos = {
  architecture: [71],
  industry: [26],
  light: [30],
  lines: [26],
  me: [45],
  nature: [24, 25],
  noise: [25],
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

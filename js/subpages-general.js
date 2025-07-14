function onLoad() {
  window.photos = [];
  window.themeManager = new ThemeManager();
  fetchJSONData();
}

const photoCount = {
  architecture: 112,
  industry: 33,
  light: 39,
  lines: 44,
  me: 56,
  nature: 38,
  noise: 29,
};

const newPhotos = {
  architecture: [112],
  industry: [33],
  light: [39],
  lines: [44],
  me: [56],
  nature: [37, 38],
  noise: [29],
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

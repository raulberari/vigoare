function onLoad() {
  fetchJSONData();
}

const photoCount = 24;

function initPhotos(descriptions) {
  const container = document.getElementById("stills-container");

  const indexes = [];
  for (let i = 0; i < photoCount; i++) {
    indexes.push(i);
  }
  shuffleArray(indexes);

  for (let i = 0; i < photoCount; i++) {
    const idx = indexes[i] + 1;
    const name = "stills" + idx;

    const img = DOM.createImageElement(
      `./images/subpages/stills/stills${idx}.jpg`,
      descriptions[name] || ""
    );
    img.title = descriptions[name] || "";

    container.appendChild(img);
  }
}

async function fetchJSONData() {
  try {
    const data = await fetchData(
      "https://gist.githubusercontent.com/raulberari/cc8ee000f618f099c59df869d3fb6d63/raw"
    );
    initPhotos(data);
  } catch (error) {
    console.error("Failed to load stills data:", error);
  }
}

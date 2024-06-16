function onLoad() {
  fetchJSONData();
}

const photoCount = 24;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initPhotos(descriptions) {
  const container = document.getElementById("stills");

  const indexes = [];
  for (let i = 0; i < photoCount; i++) {
    indexes.push(i);
  }
  shuffleArray(indexes);

  for (let i = 0; i < photoCount; i++) {
    const img = document.createElement("img");
    const idx = indexes[i] + 1;
    const name = "stills" + idx;

    img.src = `./images/subpages/stills/stills` + idx + ".jpg";
    img.className = "item";
    img.title = descriptions[name] ?? "";
    img.loading = "lazy";

    container.appendChild(img);
  }
}

function fetchJSONData() {
  fetch(
    "https://gist.githubusercontent.com/raulberari/cc8ee000f618f099c59df869d3fb6d63/raw"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      initPhotos(data);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

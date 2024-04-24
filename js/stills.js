function onLoad() {
  initPhotos();
}

const photoCount = 19;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initPhotos() {
  const container = document.getElementById("stills");

  const indexes = [];
  for (let i = 0; i < photoCount; i++) {
    indexes.push(i);
  }
  shuffleArray(indexes);

  console.log("here");
  for (let i = 0; i < photoCount; i++) {
    const img = document.createElement("img");
    const idx = indexes[i] + 1;

    img.src = `../images/subpages/stills/stills` + idx + ".jpg";
    img.className = "item";
    img.loading = "lazy";

    container.appendChild(img);
  }
}

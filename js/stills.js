function onLoad() {
  initPhotos();
}

const photoCount = 19;

const descriptions = {
  1: "Blade (1998)",
  2: "California Dreamin' (2007)",
  3: "Chocolat (1988)",
  4: "Heat (1995)",
  5: "Made in Hong Kong (1997)",
  6: "Red Desert (1966)",
  7: "Still Life (2006)",
  8: "Nostalgia (1983)",
  9: "Wicker Man (1973)",
  10: "Hard Boiled (1992)",
  11: "The Lovely Month of May (1963)",
  12: "Paris, Texas (1984)",
  13: "Weekend (1967)",
  14: "Wild at Heart (1990)",
  15: "Possession (1981)",
  16: "Bleeder (1999)",
  17: "R.M.N. (2022)",
  18: "The World (2005)",
  19: "La Jetée (1962)",
};

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

  for (let i = 0; i < photoCount; i++) {
    const img = document.createElement("img");
    const idx = indexes[i] + 1;

    img.src = `../images/subpages/stills/stills` + idx + ".jpg";
    img.className = "item";
    img.title = descriptions[idx];
    img.loading = "lazy";

    container.appendChild(img);
  }
}

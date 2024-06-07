function onLoad() {
  fetchJSONData();
  storage();
}

const colors = {
  WHITE: "#fafafa",
  BLACK: "#0f0f0f",
};

const photoCount = {
  architecture: 114,
  industry: 32,
  light: 39,
  lines: 48,
  me: 53,
  nature: 35,
  noise: 29,
};

const newPhotos = {
  architecture: [113, 114],
  industry: [31, 32],
  light: [39],
  lines: [48],
  me: [52, 53],
  nature: [35],
  noise: [29],
};

function fetchJSONData() {
  fetch(
    "https://gist.githubusercontent.com/raulberari/05acdedc2aff60d2b940ca73ca654404/raw"
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initPhotos(descriptions) {
  const grid = document.getElementById("grid");
  const pageName = document.body.getAttribute("data-name");

  // Add new photos
  for (let i = 0; i < newPhotos[pageName].length; i++) {
    const img = document.createElement("img");
    const idx = newPhotos[pageName][i];
    const name = pageName + idx;
    let modifiedDescription = descriptions[name] ?? "";
    modifiedDescription = modifiedDescription.replaceAll(", ", "<br>");

    img.src = `../images/subpages/${pageName}/${pageName}` + idx + ".jpg";
    img.className = "item";
    img.alt = descriptions[name] ?? "";
    img.loading = "lazy";

    const text = document.createElement("h1");
    text.className = "new-item-text";
    text.innerHTML = "NEW";
    text.style.display = "block";

    const description = document.createElement("h1");
    description.className = "description";
    description.innerHTML = modifiedDescription;
    description.lang = "en";

    const descriptionContainer = document.createElement("div");
    descriptionContainer.className = "description-container";
    descriptionContainer.style.display = "none";
    descriptionContainer.appendChild(description);

    const container = document.createElement("div");
    container.className = "new-item-container";
    container.appendChild(text);
    container.appendChild(descriptionContainer);
    container.appendChild(img);

    if (modifiedDescription) {
      container.addEventListener("click", function () {
        if (
          text.style.display === "none" &&
          descriptionContainer.style.display === "none"
        ) {
          descriptionContainer.style.display = "flex";
        } else if (
          text.style.display === "block" &&
          descriptionContainer.style.display === "none"
        ) {
          text.style.display = "none";
        } else if (
          text.style.display === "none" &&
          descriptionContainer.style.display === "flex"
        ) {
          descriptionContainer.style.display = "none";
          text.style.display = "block";
        }
      });
    } else {
      container.addEventListener("click", function () {
        if (text.style.display === "none") {
          text.style.display = "block";
        } else {
          text.style.display = "none";
        }
      });
    }

    grid.appendChild(container);
  }

  // Shuffle the rest of the photos and add them
  const indexes = [];
  for (let i = 0; i < photoCount[pageName]; i++) {
    indexes.push(i);
  }
  shuffleArray(indexes);
  for (let i = 0; i < photoCount[pageName]; i++) {
    const idx = indexes[i] + 1;

    if (!newPhotos[pageName].includes(idx)) {
      const img = document.createElement("img");
      const name = pageName + idx;

      img.src = `../images/subpages/${pageName}/${pageName}` + idx + ".jpg";
      img.className = "item";
      img.alt = descriptions[name] ?? "";
      img.loading = "lazy";

      let modifiedDescription = descriptions[name] ?? "";
      modifiedDescription = modifiedDescription.replaceAll(", ", "<br>");

      const description = document.createElement("h1");
      description.className = "description";
      description.innerHTML = modifiedDescription;
      description.lang = "en";

      const descriptionContainer = document.createElement("div");
      descriptionContainer.className = "description-container";
      descriptionContainer.style.display = "none";
      descriptionContainer.appendChild(description);

      const container = document.createElement("div");
      container.className = "item-container";
      container.appendChild(descriptionContainer);
      container.appendChild(img);

      if (modifiedDescription) {
        container.addEventListener("click", function () {
          if (descriptionContainer.style.display === "none") {
            descriptionContainer.style.display = "flex";
          } else {
            descriptionContainer.style.display = "none";
          }
        });
      }
      grid.appendChild(container);
    }
  }
}

function changeColour() {
  const nightModeButton = document.getElementById("nightModeButton");
  const columnButton = document.getElementById("columnsButton");
  const title = document.getElementsByClassName("title")[0];

  if (localStorage.getItem("BGColor") === colors.BLACK) {
    document.body.style.background = colors.WHITE;

    title.style.color = colors.BLACK;
    nightModeButton.style.borderColor = colors.BLACK;
    columnButton.style.borderColor = colors.BLACK;
    columnButton.style.color = colors.BLACK;

    localStorage.setItem("BGColor", colors.WHITE);
  } else {
    document.body.style.background = colors.BLACK;

    title.style.color = colors.WHITE;
    nightModeButton.style.borderColor = colors.WHITE;
    columnButton.style.borderColor = colors.WHITE;
    columnButton.style.color = colors.WHITE;

    localStorage.setItem("BGColor", colors.BLACK);
  }
}

function storage() {
  const nightModeButton = document.getElementById("nightModeButton");
  const columnButton = document.getElementById("columnsButton");
  const title = document.getElementsByClassName("title")[0];

  if (localStorage.getItem("columnNumber") > 1) {
    changeColumns();
  } else {
    document.getElementById("columnsButton").innerText = "1";
  }

  if (localStorage.getItem("BGColor") === colors.BLACK) {
    document.body.style.background = colors.BLACK;

    title.style.color = colors.WHITE;
    nightModeButton.style.borderColor = colors.WHITE;
    columnButton.style.borderColor = colors.WHITE;
    columnButton.style.color = colors.WHITE;
  } else {
    document.body.style.background = colors.WHITE;

    title.style.color = colors.BLACK;
    nightModeButton.style.borderColor = colors.BLACK;
    columnButton.style.borderColor = colors.BLACK;
    columnButton.style.color = colors.BLACK;
  }
}

function changeColumns() {
  const grid = document.getElementById("grid");
  let oneColumnWidth;

  if (window.innerWidth > 1280) {
    oneColumnWidth = "45%";
  } else if (window.innerWidth > 800) {
    oneColumnWidth = "70%";
  } else {
    oneColumnWidth = "80%";
  }

  if (grid.style.columnCount > 1) {
    grid.style.columnCount = 1;
    grid.style.width = oneColumnWidth;

    document.getElementById("columnsButton").innerText = "1";

    localStorage.setItem("columnNumber", 1);
  } else {
    let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;

    if (numberOfColumns == 1) {
      numberOfColumns = 2;
    }

    grid.style.columnCount = numberOfColumns;
    grid.style.width = "90%";

    document.getElementById("columnsButton").innerText =
      numberOfColumns.toString();

    localStorage.setItem("columnNumber", numberOfColumns);
  }
}

function onResize() {
  let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;
  if (numberOfColumns == 1) {
    numberOfColumns = 2;
  }
  const grid = document.getElementById("grid");

  if (window.innerWidth > 1280) {
    oneColumnWidth = "45%";
  } else if (window.innerWidth > 800) {
    oneColumnWidth = "70%";
  } else {
    oneColumnWidth = "80%";
  }

  if (grid.style.columnCount > 1) {
    grid.style.columnCount = numberOfColumns;
  } else {
    grid.style.width = oneColumnWidth;
  }
}

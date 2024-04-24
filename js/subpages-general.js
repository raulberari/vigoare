function onLoad() {
  initPhotos();
  storage();
}

const colors = {
  WHITE: "#fafafa",
  BLACK: "#0f0f0f",
};

const photoCount = {
  architecture: 113,
  industry: 30,
  light: 38,
  lines: 47,
  me: 56,
  nature: 33,
  noise: 28,
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initPhotos() {
  const grid = document.getElementById("grid");
  const pageName = document.body.getAttribute("data-name");

  const indexes = [];
  for (let i = 0; i < photoCount[pageName]; i++) {
    indexes.push(i);
  }
  shuffleArray(indexes);

  for (let i = 0; i < photoCount[pageName]; i++) {
    const img = document.createElement("img");
    const idx = indexes[i] + 1;

    img.src = `../images/subpages/${pageName}/${pageName}` + idx + ".jpg";
    img.className = "item";
    img.loading = "lazy";

    grid.appendChild(img);
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
  const item = document.getElementsByClassName("item");
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
    for (let i = 0; i < item.length; i++) {
      item[i].style.paddingBottom = "2em";
    }

    document.getElementById("columnsButton").innerText = "1";

    localStorage.setItem("columnNumber", 1);
  } else {
    let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;

    if (numberOfColumns == 1) {
      numberOfColumns = 2;
    }

    grid.style.columnCount = numberOfColumns;
    grid.style.width = "90%";

    for (let i = 0; i < item.length; i++) {
      item[i].style.paddingBottom = "1em";
    }
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

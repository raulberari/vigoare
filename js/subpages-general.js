function onLoad() {
  window.photos = [];
  fetchJSONData();
  storage();
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
  const pageName = document.body.getAttribute("data-name");

  function createNewPhoto(i) {
    const img = document.createElement("img");
    const idx = newPhotos[pageName][i];
    const name = pageName + idx;
    let modifiedDescription = descriptions[name] ?? "";

    const description = document.createElement("div");
    description.className = "description";
    description.lang = "en";
    for (const part of modifiedDescription.split(", ")) {
      const descriptionPart = document.createElement("span");
      descriptionPart.innerHTML = part;

      description.appendChild(descriptionPart);
    }

    img.src = `./images/subpages/${pageName}/${pageName}` + idx + ".jpg";
    img.className = "item";
    img.alt = descriptions[name] ?? "";
    img.loading = "lazy";

    const text = document.createElement("h1");
    text.className = "new-item-text";
    text.innerHTML = "NEW";
    text.style.display = "block";

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

    return container;
  }

  function createNormalPhoto(idx) {
    const img = document.createElement("img");
    const name = pageName + idx;

    img.src = `./images/subpages/${pageName}/${pageName}` + idx + ".jpg";
    img.className = "item";
    img.alt = descriptions[name] ?? "";
    img.loading = "lazy";

    let modifiedDescription = descriptions[name] ?? "";

    const description = document.createElement("div");
    description.className = "description";
    description.lang = "en";
    for (const part of modifiedDescription.split(", ")) {
      const descriptionPart = document.createElement("span");
      descriptionPart.innerHTML = part;

      description.appendChild(descriptionPart);
    }

    const descriptionContainer = document.createElement("div");
    descriptionContainer.className = "description-container";
    descriptionContainer.style.display = "none";
    descriptionContainer.appendChild(description);

    const container = document.createElement("div");
    container.className = "item-container";
    container.appendChild(descriptionContainer);

    // Add the info button if there is a description
    if (modifiedDescription) {
      const infoButton = document.createElement("div");
      infoButton.className = "info-button";
      infoButton.style.display = "none";
      container.appendChild(infoButton);
    }

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

    return container;
  }

  function showInfoButtons() {
    const infoButtons = document.querySelectorAll(".info-button");
    infoButtons.forEach((button) => {
      button.style.display = "block";
    });
  }

  function loadPhotos() {
    // Add new photos
    if (loadedPhotosCount === 0) {
      for (let i = 0; i < newPhotos[pageName].length; i++) {
        const container = createNewPhoto(i);

        window.photos.push(container);
      }
    }

    // Lazy load, a batch at a time
    const start = loadedPhotosCount;
    const end = Math.min(
      loadedPhotosCount + photosPerLoad,
      photoCount[pageName]
    );

    // Add the rest of the photos
    for (let i = start; i < end; i++) {
      const idx = indexes[i] + 1;

      if (!newPhotos[pageName].includes(idx)) {
        const container = createNormalPhoto(idx);
        window.photos.push(container);
      }
    }

    loadedPhotosCount = end;

    // Reflow photos into columns
    reflowPhotos();

    // If all photos are loaded, disconnect the observer and show the quote text
    if (loadedPhotosCount >= photoCount[pageName]) {
      document.getElementsByClassName("quote-text")[0].style.display = "block";
      observer.disconnect();
    }

    setTimeout(() => {
      showInfoButtons();
    }, 200);
  }

  window.photos = [];
  const indexes = [];
  for (let i = 0; i < photoCount[pageName]; i++) {
    indexes.push(i);
  }
  shuffleArray(indexes);

  let loadedPhotosCount = 0;
  const photosPerLoad = Math.max(10, getColumnCount() * 3);

  // Set up Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        loadedPhotosCount < photoCount[pageName]
      ) {
        loadPhotos();
      }
    },
    { threshold: 0.1 }
  );

  // Observer trigger element
  const trigger = document.createElement("div");
  trigger.style.height = "50px";
  trigger.style.width = "100%";
  document.body.appendChild(trigger);
  observer.observe(trigger);

  // Initial load
  loadPhotos();

  // Reflow photos on window resize or column toggle
  window.addEventListener("resize", reflowPhotos);
}

function getColumnCount() {
  return localStorage.getItem("columnNumber") ?? 1;
}

function reflowPhotos() {
  const grid = document.getElementById("grid");
  // Clear existing columns
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Create new columns
  const columnCount = getColumnCount();
  const columns = [];
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement("div");
    column.className = "grid-column";
    grid.appendChild(column);
    columns.push(column);
  }

  // Distribute photos into columns
  window.photos.forEach((photo, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].appendChild(photo);
  });
}

function changeThemeColor(colorScheme) {
  const color = colorScheme === "light" ? "#fafafa" : "#0f0f0f";
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", color);
}

function changeColour() {
  const root = document.querySelector(":root");

  if (localStorage.getItem("colorScheme") === "dark") {
    root.style.colorScheme = "light";
    localStorage.setItem("colorScheme", "light");
    changeThemeColor("light");
  } else {
    root.style.colorScheme = "dark";
    localStorage.setItem("colorScheme", "dark");
    changeThemeColor("dark");
  }
}

function storage() {
  let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;
  if (numberOfColumns === 1) {
    numberOfColumns = 2;
  }

  // Set default to multiple columns on first load
  if (!localStorage.getItem("columnNumber")) {
    localStorage.setItem("columnNumber", numberOfColumns);
  }

  if (localStorage.getItem("columnNumber") > 1) {
    changeColumns("storage");
  } else {
    document.getElementById("columnsButton").innerText = "1";
  }

  const root = document.querySelector(":root");
  if (localStorage.getItem("colorScheme") === "dark") {
    root.style.colorScheme = "dark";
    changeThemeColor("dark");
  } else {
    root.style.colorScheme = "light";
    changeThemeColor("light");
  }
}

function changeColumns(origin) {
  const grid = document.getElementById("grid");
  let oneColumnWidth;

  if (window.innerWidth > 1280) {
    oneColumnWidth = "45%";
  } else if (window.innerWidth > 800) {
    oneColumnWidth = "70%";
  } else {
    oneColumnWidth = "80%";
  }

  if (localStorage.getItem("columnNumber") > 1 && origin !== "storage") {
    grid.style.width = oneColumnWidth;

    document.getElementById("columnsButton").innerText = "1";

    localStorage.setItem("columnNumber", 1);
  } else {
    let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;

    if (numberOfColumns === 1) {
      numberOfColumns = 2;
    }

    grid.style.width = "90%";

    document.getElementById("columnsButton").innerText =
      numberOfColumns.toString();

    localStorage.setItem("columnNumber", numberOfColumns);
  }

  reflowPhotos();
}

function onResize() {
  let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;
  if (numberOfColumns === 1) {
    numberOfColumns = 2;
  }
  const grid = document.getElementById("grid");
  const columnButton = document.getElementById("columnsButton");

  if (window.innerWidth > 1280) {
    oneColumnWidth = "45%";
  } else if (window.innerWidth > 800) {
    oneColumnWidth = "70%";
  } else {
    oneColumnWidth = "80%";
  }

  if (localStorage.getItem("columnNumber") > 1) {
    columnButton.innerText = numberOfColumns.toString();
    localStorage.setItem("columnNumber", numberOfColumns);
  } else {
    grid.style.width = oneColumnWidth;
    localStorage.setItem("columnNumber", 1);
  }
}

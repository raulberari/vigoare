class PhotoGrid {
  constructor(pageName, photoCount, newPhotos) {
    this.pageName = pageName;
    this.photoCount = photoCount;
    this.newPhotos = newPhotos;
    this.photos = [];
    this.loadedPhotosCount = 0;
    this.photosPerLoad = Math.max(10, this.getColumnCount() * 3);
    this.observer = null;
  }

  getColumnCount() {
    return Storage.getNumber("columnNumber", 1);
  }

  createNewPhoto(i, descriptions) {
    const idx = this.newPhotos[i];
    const name = this.pageName + idx;
    const description = descriptions[name] || "";

    const img = DOM.createImageElement(
      `./images/subpages/${this.pageName}/${this.pageName}${idx}.jpg`,
      description
    );

    const text = DOM.createElement("h1", "new-item-text", "NEW");
    text.style.display = "block";

    const descriptionContainer = this.createDescriptionContainer(description);

    const container = DOM.createElement("div", "new-item-container");
    container.appendChild(text);
    container.appendChild(descriptionContainer);
    container.appendChild(img);

    this.addPhotoInteraction(
      container,
      text,
      descriptionContainer,
      description
    );
    return container;
  }

  createNormalPhoto(idx, descriptions) {
    const name = this.pageName + idx;
    const description = descriptions[name] || "";

    const img = DOM.createImageElement(
      `./images/subpages/${this.pageName}/${this.pageName}${idx}.jpg`,
      description
    );

    const descriptionContainer = this.createDescriptionContainer(description);
    const container = DOM.createElement("div", "item-container");
    container.appendChild(descriptionContainer);

    let infoButton = null;
    if (description) {
      infoButton = DOM.createElement("div", "info-button");
      infoButton.style.display = "none";
      container.appendChild(infoButton);
    }

    container.appendChild(img);

    // Show info button only when image loads
    if (description && infoButton) {
      img.onload = () => {
        infoButton.style.display = "block";
      };
    }

    if (description) {
      container.addEventListener("click", () => {
        const isVisible = descriptionContainer.style.display === "flex";
        descriptionContainer.style.display = isVisible ? "none" : "flex";
      });
    }

    return container;
  }

  createDescriptionContainer(description) {
    const container = DOM.createElement("div", "description-container");
    container.style.display = "none";

    const descriptionDiv = DOM.createElement("div", "description");
    descriptionDiv.lang = "en";

    description.split(", ").forEach((part) => {
      const span = DOM.createElement("span", "", part);
      descriptionDiv.appendChild(span);
    });

    container.appendChild(descriptionDiv);
    return container;
  }

  addPhotoInteraction(container, text, descriptionContainer, description) {
    if (description) {
      container.addEventListener("click", () => {
        const textVisible = text.style.display === "block";
        const descVisible = descriptionContainer.style.display === "flex";

        if (!textVisible && !descVisible) {
          descriptionContainer.style.display = "flex";
        } else if (textVisible && !descVisible) {
          text.style.display = "none";
        } else if (!textVisible && descVisible) {
          descriptionContainer.style.display = "none";
          text.style.display = "block";
        }
      });
    } else {
      container.addEventListener("click", () => {
        text.style.display = text.style.display === "none" ? "block" : "none";
      });
    }
  }

  loadPhotos(descriptions) {
    // Add new photos on first load
    if (this.loadedPhotosCount === 0) {
      for (let i = 0; i < this.newPhotos.length; i++) {
        this.photos.push(this.createNewPhoto(i, descriptions));
      }
    }

    // Lazy load batch
    const start = this.loadedPhotosCount;
    const end = Math.min(start + this.photosPerLoad, this.photoCount);

    // Create shuffled indexes
    const indexes = Array.from({ length: this.photoCount }, (_, i) => i);
    shuffleArray(indexes);

    // Add regular photos
    for (let i = start; i < end; i++) {
      const idx = indexes[i] + 1;
      if (!this.newPhotos.includes(idx)) {
        this.photos.push(this.createNormalPhoto(idx, descriptions));
      }
    }

    this.loadedPhotosCount = end;
    this.reflowPhotos();

    // Check if all photos loaded
    if (this.loadedPhotosCount >= this.photoCount) {
      const quoteText = document.querySelector(".quote-text");
      if (quoteText) {
        quoteText.style.display = "block";
      }
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  reflowPhotos() {
    const grid = document.getElementById("grid");

    // Clear existing columns
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    // Create new columns
    const columnCount = this.getColumnCount();
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
      const column = DOM.createElement("div", "grid-column");
      grid.appendChild(column);
      columns.push(column);
    }

    // Distribute photos into columns
    this.photos.forEach((photo, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].appendChild(photo);
    });
  }

  setupIntersectionObserver(descriptions) {
    this.descriptions = descriptions;
    this.observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          this.loadedPhotosCount < this.photoCount
        ) {
          this.loadPhotos(descriptions);
        }
      },
      { threshold: 0.1 }
    );

    const trigger = DOM.createElement("div");
    trigger.style.height = "50px";
    trigger.style.width = "100%";
    document.body.appendChild(trigger);
    this.observer.observe(trigger);
  }
}

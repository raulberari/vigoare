class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.setDefaultColumns();
    this.applyStoredTheme();
    this.applyStoredColumns();
    window.addEventListener("resize", () => this.onResize());
  }

  setDefaultColumns() {
    let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;
    if (numberOfColumns === 1) numberOfColumns = 2;

    if (!Storage.get("columnNumber")) {
      Storage.set("columnNumber", numberOfColumns);
    }
  }

  applyStoredTheme() {
    const root = document.querySelector(":root");
    const colorScheme = Storage.get("colorScheme", "light");

    root.style.colorScheme = colorScheme;
    changeThemeColor(colorScheme);
  }

  applyStoredColumns() {
    const columnNumber = Storage.getNumber("columnNumber", 1);

    if (columnNumber > 1) {
      this.changeColumns("storage");
    } else {
      const button = document.getElementById("columnsButton");
      if (button) button.innerText = "1";
    }
  }

  toggleTheme() {
    const root = document.querySelector(":root");
    const currentScheme = Storage.get("colorScheme", "light");
    const newScheme = currentScheme === "dark" ? "light" : "dark";

    root.style.colorScheme = newScheme;
    Storage.set("colorScheme", newScheme);
    changeThemeColor(newScheme);
  }

  getOneColumnWidth() {
    if (window.innerWidth > 1280) return "45%";
    if (window.innerWidth > 800) return "70%";
    return "80%";
  }

  changeColumns(origin) {
    const grid = document.getElementById("grid");
    const columnButton = document.getElementById("columnsButton");
    const currentColumns = Storage.getNumber("columnNumber", 1);

    if (currentColumns > 1 && origin !== "storage") {
      // Switch to single column
      grid.style.width = this.getOneColumnWidth();
      if (columnButton) columnButton.innerText = "1";
      Storage.set("columnNumber", 1);
    } else {
      // Switch to multiple columns
      let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;
      if (numberOfColumns === 1) numberOfColumns = 2;

      grid.style.width = "90%";
      if (columnButton) columnButton.innerText = numberOfColumns.toString();
      Storage.set("columnNumber", numberOfColumns);
    }

    if (window.photoGrid) {
      window.photoGrid.reflowPhotos();
    }
  }

  onResize() {
    let numberOfColumns = Math.floor(window.innerWidth / 400) + 1;
    if (numberOfColumns === 1) numberOfColumns = 2;

    const grid = document.getElementById("grid");
    const columnButton = document.getElementById("columnsButton");
    const currentColumns = Storage.getNumber("columnNumber", 1);

    if (currentColumns > 1) {
      if (columnButton) columnButton.innerText = numberOfColumns.toString();
      Storage.set("columnNumber", numberOfColumns);
    } else {
      grid.style.width = this.getOneColumnWidth();
      Storage.set("columnNumber", 1);
    }
  }
}

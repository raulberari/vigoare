async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Unable to fetch data:", error);
    throw error;
  }
}

function relativeTimeSince(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const diffInMs = currentDate - inputDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function changeThemeColor(colorScheme) {
  const color = colorScheme === "light" ? "#fafafa" : "#0f0f0f";
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", color);
}

const Storage = {
  get: (key, defaultValue = null) => localStorage.getItem(key) || defaultValue,
  set: (key, value) => localStorage.setItem(key, value),
  getNumber: (key, defaultValue = 0) =>
    parseInt(localStorage.getItem(key)) || defaultValue,
};

const DOM = {
  createElement: (tag, className = "", innerHTML = "") => {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (innerHTML) {
      element.innerHTML = innerHTML;
    }
    return element;
  },

  createImageElement: (src, alt = "", className = "item") => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = className;
    img.loading = "lazy";
    return img;
  },
};

const Events = {
  onEscape: (callback) => {
    const handler = (event) => {
      if (event.key === "Escape") callback();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  },

  onClickOutside: (element, callback) => {
    const handler = (event) => {
      if (event.target === element) callback();
    };
    element.addEventListener("click", handler);
    return () => element.removeEventListener("click", handler);
  },
};

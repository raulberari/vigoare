function onLoad() {
  fetchJSONData();
}

function relativeTimeSince(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  const diffInMs = currentDate - inputDate;

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "today";
  } else if (diffInDays === 1) {
    return "yesterday";
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else {
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }
}

function initComments(data) {
  const container = document.getElementsByClassName("text-grid")[0];

  container.innerHTML += data.comments
    .map(
      (comment) => `
      <div class="comment">
        <div class="text-container">
          <div class="comment-header">
            <span class="comment-author">${comment.name}</span>
            <p class="bullet-spacer">•</p>
            <div class="comment-date">
              ${relativeTimeSince(comment.date)}
            </div>
          </div>
          <div class="comment-content">
            <p>${comment.content}</p>
          </div>
        </div>
      </div>
      `
    )
    .join("");
}

function fetchJSONData() {
  fetch(
    "https://gist.githubusercontent.com/raulberari/04a64dcd7ab34489e45740226e0a4a72/raw"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      initComments(data);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

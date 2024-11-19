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

  const comments = data.comments;

  for (const comment of comments) {
    const commentContainer = document.createElement("div");
    commentContainer.className = "comment";

    const commentHeader = document.createElement("div");
    commentHeader.className = "comment-header";

    const commentAuthor = document.createElement("span");
    commentAuthor.className = "comment-author";
    commentAuthor.textContent = comment.name;

    const commentDateTooltip = document.createElement("span");
    commentDateTooltip.className = "tooltip-text";
    commentDateTooltip.textContent = comment.date;

    const commentDate = document.createElement("div");
    commentDate.className = "comment-date";
    commentDate.textContent = relativeTimeSince(comment.date);
    commentDate.appendChild(commentDateTooltip);

    commentHeader.appendChild(commentAuthor);
    commentHeader.appendChild(commentDate);

    const commentContent = document.createElement("div");
    commentContent.className = "comment-content";

    const content = document.createElement("p");
    content.innerText = comment.content;

    commentContent.appendChild(content);

    const textContainer = document.createElement("div");
    textContainer.className = "text-container";
    textContainer.appendChild(commentHeader);
    textContainer.appendChild(commentContent);

    commentContainer.appendChild(textContainer);

    container.appendChild(commentContainer);
  }
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

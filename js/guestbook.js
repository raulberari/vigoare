function onLoad() {
  fetchJSONData();
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

    const commentDate = document.createElement("span");
    commentDate.className = "comment-date";
    commentDate.textContent = comment.date;

    commentHeader.appendChild(commentAuthor);
    commentHeader.appendChild(commentDate);

    const commentContent = document.createElement("div");
    commentContent.className = "comment-content";

    const content = document.createElement("p");
    content.innerText = comment.content;

    commentContent.appendChild(content);

    commentContainer.appendChild(commentHeader);
    commentContainer.appendChild(commentContent);

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

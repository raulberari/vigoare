function onLoad() {
  fetchJSONData();
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

async function fetchJSONData() {
  try {
    const data = await fetchData(
      "https://gist.githubusercontent.com/raulberari/04a64dcd7ab34489e45740226e0a4a72/raw"
    );
    initComments(data);
  } catch (error) {
    console.error("Failed to load guestbook data:", error);
  }
}

const API = "https://682364aa65ba058033969579.mockapi.io";

document.addEventListener("DOMContentLoaded", () => {
  getPosts();

  document.getElementById("createPostForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("titleInput").value;
    const content = document.getElementById("contentInput").value;
    await createPost(title, content);
    e.target.reset();
  });

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deletePostButton")) {
      const id = e.target.dataset.id;
      await deletePost(id);
    } else if (e.target.classList.contains("editPostButton")) {
      const id = e.target.dataset.id;
      const newTitle = prompt("Новий заголовок");
      const newContent = prompt("Новий зміст");
      if (newTitle && newContent) await updatePost(id, newTitle, newContent);
    }
  });

  document.addEventListener("submit", async (e) => {
    if (e.target.classList.contains("createCommentForm")) {
      e.preventDefault();
      const id = e.target.dataset.id;
      const input = e.target.querySelector(".commentInput");
      if (input && input.value.trim()) {
        await createComment(id, input.value.trim());
      }
    }
  });
});

async function getPosts() {
  try {
    const res = await fetch(`${API}/posts?_embed=comments`);
    const posts = await res.json();
    renderPosts(posts);
  } catch (err) {
    console.error("Помилка завантаження постів:", err);
  }
}

async function createPost(title, content) {
  await fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });
  getPosts();
}

async function updatePost(id, title, content) {
  await fetch(`${API}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });
  getPosts();
}

async function deletePost(id) {
  await fetch(`${API}/posts/${id}`, {
    method: "DELETE" });
  getPosts();
}

async function createComment(postId, text) {
  await fetch(`${API}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, text })
  });
  getPosts();
}

function renderPosts(posts) {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
      <div class="post_main">
        <h2 class="post_title">${post.title}</h2>
        <p class="post_content">${post.content}</p>
      </div>
      <div class="post_buttons">
        <button class="editPostButton post_edit_button" data-id="${post.id}">Редагувати</button>
        <button class="deletePostButton post_del_button" data-id="${post.id}">Видалити</button>
      </div>
      <div class="comments_box">
        <h3 class="comment">Коментарі</h3>
        <ul class="comments_list">
          ${post.comments.length === 0 ? '<li class="comment_items">Немає коментарів</li>' : ""}
          ${post.comments.map(c => `<li>${c.text}</li>`).join("")}
          ${post.comments.length === 4 ? '<li class="comment_items">Максимальна кількість коментарів до посту - 4</li>' : ""}
        </ul>
        <form class="createCommentForm" data-id="${post.id}">
          ${post.comments.length >= 4 ? "" : `<input type="text" class="commentInput comment_input" placeholder="Новий коментар" required>`}
          ${post.comments.length >= 4 ? "" : `<button type="submit" class="comment_add_button">Додати коментар</button>`}
        </form>
      </div>
    `;
    container.appendChild(div);
  });
}

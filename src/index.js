import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  createComment,
} from "./api.js";
import { renderPosts } from "./posts.js";

const createPostForm = document.getElementById("createPostForm");
const postsContainer = document.getElementById("postsContainer");
createPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("titleInput").value;
  const content = document.getElementById("contentInput").value;
  await createPost(title, content);
  const posts = await getPosts();
  renderPosts(posts);
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("editPostButton")) {
    const id = e.target.dataset.id;
    const newTitle = prompt("Новий заголовок:");
    const newContent = prompt("Новий зміст:");
    if (newTitle && newContent) {
      await updatePost(id, newTitle, newContent);
      const posts = await getPosts();
      renderPosts(posts);
    }
  }

  if (e.target.classList.contains("deletePostButton")) {
    const id = e.target.dataset.id;
    await deletePost(id);
    const posts = await getPosts();
    renderPosts(posts);
  }
});

document.addEventListener("submit", async (e) => {
  if (e.target.classList.contains("createCommentForm")) {
    e.preventDefault();
    const commentInput = e.target.querySelector(".commentInput");
    const postId = e.target.closest(".post").dataset.id;
    const comment = commentInput.value;
    await createComment(postId, comment);
    const posts = await getPosts();
    renderPosts(posts);
  }
});

(async function startApp() {
  const posts = await getPosts();
  renderPosts(posts);
})();

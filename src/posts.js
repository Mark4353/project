export const renderPosts = (posts) => {
  const container = document.querySelector(".posts_container"); 
  container.innerHTML = posts.map(post => `
    <div class="post" data-id="${post.id}">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-description">${post.content}</p>
      <button class="editPostButton" data-id="${post.id}">Редагувати</button>
      <button class="deletePostButton" data-id="${post.id}">Видалити</button>
      <form class="createCommentForm">
        <input type="text" class="commentInput" placeholder="Коментар" required />
        <button type="submit">Додати коментар</button>
      </form>
    </div>
  `).join("");
};

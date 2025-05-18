const API_URL = "https://682364aa65ba058033969579.mockapi.io/api";

export async function getPosts() {
  try {
    const res = await fetch(`${API_URL}?embed=comments`);
    return await res.json();
  } catch (error) {
    console.error("Помилка завантаження постів:", error);
    return [];
  }
}

export async function createPost(title, content) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, comments: [] }),
    });
  } catch (error) {
    console.error("Помилка створення поста:", error);
  }
}

export async function updatePost(id, title, content) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
  } catch (error) {
    console.error("Помилка оновлення поста:", error);
  }
}

export async function deletePost(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Помилка видалення поста:", error);
  }
}

export async function createComment(postId, comment) {
  try {
    const post = await fetch(`${API_URL}/${postId}`).then((res) => res.json());
    post.comments.push(comment);
    await fetch(`${API_URL}/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
  } catch (error) {
    console.error("Помилка додавання коментаря:", error);
  }
}

const API_URL = "https://682364aa65ba058033969579.mockapi.io/api/posts";

export async function getPosts() {
  try {
    const postsRes = await fetch(`${API_URL}`);
    const commentsRes = await fetch(`${API_URL}/1/comments`);

    const posts = await postsRes.json();
    const comments = await commentsRes.json();

    return posts.map((post) => ({
      ...post,
      comments: comments.filter((c) => c.postId === post.id),
    }));
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

export async function createComment(postId, text) {
  try {
    await fetch(`https://682364aa65ba058033969579.mockapi.io/api/posts/1/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, text }),
    });
  } catch (error) {
    console.error("Помилка додавання коментаря:", error);
  }
}
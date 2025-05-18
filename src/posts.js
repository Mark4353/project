export function renderPosts(posts) {
    console.log(posts);
  const container = document.getElementById('postsContainer');
  const templateSource = document.getElementById('post-template').innerHTML;
  const template = Handlebars.compile(templateSource);
  const html = template({ posts });
  container.innerHTML = html;
}

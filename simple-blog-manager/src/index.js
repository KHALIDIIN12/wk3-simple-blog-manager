document.addEventListener("DOMContentLoaded", () => {

  const postsContainer = document.getElementById("posts-container");
  const form = document.getElementById("post-form");

  function loadPosts() {
    fetch("http://localhost:3000/posts") 
      .then(res => res.json())
      .then(data => {
        postsContainer.innerHTML = ""; 
        data.forEach(post => displayPost(post));
      });
  }
  
  function displayPost(post) {
    const div = document.createElement("div"); 
    div.className = "post"; 
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p><strong>By:</strong> ${post.author}</p>
      <img src="${post.image}" alt="Post image" width="150">
      <p>${post.content}</p>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postsContainer.appendChild(div); 
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const newPost = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      image: document.getElementById("image").value || "https://via.placeholder.com/150",
      content: document.getElementById("content").value
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(post => {
      displayPost(post);
      form.reset(); 
    });
  });

  window.deletePost = function(id) {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      loadPosts(); 
    });
  }
  loadPosts();
});
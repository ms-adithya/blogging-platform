import { getBlogPosts, createBlogPost, loginUser, logoutUser } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  await displayBlogPosts(); // Load blog posts on page load
  setupEventListeners(); // Set up button click listeners
});

// Function to display blog posts on the page
async function displayBlogPosts() {
  const blogPosts = await getBlogPosts();
  const blogContainer = document.getElementById("blog-container");

  blogContainer.innerHTML = ""; // Clear previous content

  blogPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
    `;
    blogContainer.appendChild(postElement);
  });
}

// Function to handle registration
async function handleRegister(event) {
  event.preventDefault();
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  try {
    const response = await fetch(
      "https://blogging-platform-2135.onrender.com/api/auth/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    alert("Registration successful! You can now log in.");
    document.getElementById("register-form").reset();
  } catch (error) {
    console.error("Error registering:", error);
    alert("Error during registration. Please try again.");
  }
}

// Function to handle login
async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const token = await loginUser(username, password);
  if (token) {
    alert("Login successful!");
    document.getElementById("login-form").reset();
    updateUIAfterLogin();
  } else {
    alert("Login failed! Please check your credentials.");
  }
}

// Function to handle logout
function handleLogout() {
  logoutUser();
  updateUIAfterLogout();
  alert("Logged out successfully!");
}

// Function to handle blog post creation
async function handleCreatePost(event) {
  event.preventDefault();
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  const newPost = await createBlogPost(title, content);
  if (newPost) {
    alert("Blog post created successfully!");
    document.getElementById("create-post-form").reset();
    displayBlogPosts(); // Refresh the blog posts list
  } else {
    alert("Failed to create blog post. Make sure you're logged in.");
  }
}

// Function to update UI after login
function updateUIAfterLogin() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("logout-button").style.display = "block";
  document.getElementById("create-post-section").style.display = "block";
}

// Function to update UI after logout
function updateUIAfterLogout() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("register-section").style.display = "block";
  document.getElementById("logout-button").style.display = "none";
  document.getElementById("create-post-section").style.display = "none";
}

// Function to set up event listeners
function setupEventListeners() {
  document
    .getElementById("register-form")
    .addEventListener("submit", handleRegister);
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document
    .getElementById("logout-button")
    .addEventListener("click", handleLogout);
  document
    .getElementById("create-post-form")
    .addEventListener("submit", handleCreatePost);

  // Check if user is logged in on page load
  if (localStorage.getItem("accessToken")) {
    updateUIAfterLogin();
  } else {
    updateUIAfterLogout();
  }
}

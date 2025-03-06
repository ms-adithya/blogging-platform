const apiBaseUrl = "https://blogging-platform-2135.onrender.com/api"; // Base API URL

// Function to get the stored access token
function getAccessToken() {
  return localStorage.getItem("accessToken");
}

// Fetch blog posts (No authentication needed)
async function getBlogPosts() {
  try {
    const response = await fetch(`${apiBaseUrl}/blogposts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Create a new blog post (Requires authentication)
async function createBlogPost(title, content) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error("No access token found. Please log in.");
    return null;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/blogposts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating blog post:", error);
    return null;
  }
}

// User login and store token
async function loginUser(username, password) {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed! Invalid credentials.");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access); // Store access token
    console.log("Login successful!");
    return data.access;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

// Logout user (Remove stored token)
function logoutUser() {
  localStorage.removeItem("accessToken");
  console.log("User logged out.");
}

export { getBlogPosts, createBlogPost, loginUser, logoutUser };

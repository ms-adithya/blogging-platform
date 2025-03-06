const apiUrl = "https://blogging-platform-2135.onrender.com/api/blogposts/"; // Corrected API endpoint

// Fetch blog posts
async function getBlogPosts() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // No Authorization header needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export { getBlogPosts };

const apikey = "5000ce8fe88a4bf0a634c2d60a4a7abc";  // Ideally, do not hardcode API keys

const blockContainer = document.getElementById("blog-container");

// Fetch random news articles
async function fetchRandomNews() {
  try {
    const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apikey}`;
    const response = await fetch(apiurl);
    const data = await response.json();

    if (response.ok) {
      return data.articles;
    } else {
      console.error("Error fetching news:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

// Function to display articles in the UI
function displayBlogs(articles) {
  blockContainer.innerHTML = "";  // Clear container before adding new articles

  if (articles.length === 0) {
    blockContainer.innerHTML = "<p>No articles available at the moment.</p>";
    return;
  }

  articles.forEach(article => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    // Article Image (use placeholder if not available)
    const img = document.createElement("img");
    img.src = article.urlToImage ? article.urlToImage : "https://via.placeholder.com/300x200?text=No+Image";
    img.alt = article.title;

    // Article Title (truncate if too long)
    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 ? article.title.substring(0, 30) + "..." : article.title;
    title.textContent = truncatedTitle;

    // Article Description (truncate if too long)
    const description = document.createElement("p");
    description.textContent = article.description ? article.description : "No description available.";

    // Append elements to the card
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    // Add the blog card to the container
    blockContainer.appendChild(blogCard);
  });
}

// Fetch and display the news articles on page load
(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error displaying blogs", error);
    blockContainer.innerHTML = "<p>Failed to load articles. Please try again later.</p>";
  }
})();

// Add event listener to search button
document.getElementById("search-button").addEventListener("click", async () => {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    try {
      const articles = await fetchNews(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("Error searching for news", error);
      blockContainer.innerHTML = "<p>Failed to search articles. Please try again later.</p>";
    }
  } else {
    alert("Please enter a search term.");
  }
});

// Function to fetch news based on search query
async function fetchNews(query) {
  try {
    const apiurl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}`;  // Change to lowercase 'apikey'
    const response = await fetch(apiurl);
    const data = await response.json();

    if (response.ok) {
      return data.articles;
    } else {
      console.error("Error fetching news:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching news", error);
    return [];
  }
}
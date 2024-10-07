const apiKey = "5000ce8fe88a4bf0a634c2d60a4a7abc";
const blogContainer = document.getElementById("blog-container");
const modal = document.getElementById("modal");
const closeButton = document.querySelector(".close-button");
const articleTitle = document.getElementById("article-title");
const articleDescription = document.getElementById("article-description");
const articleLink = document.getElementById("article-link");

async function fetchNews(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'https://via.placeholder.com/300x200';
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title.length > 30 ? article.title.substring(0, 30) + "..." : article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        
        // Adding event listener to open modal
        blogCard.addEventListener("click", () => {
            openModal(article);
        });

        blogContainer.appendChild(blogCard);
    });
}

function openModal(article) {
    articleTitle.textContent = article.title;
    articleDescription.textContent = article.description || "No description available.";
    articleLink.href = article.url;
    modal.style.display = "block";
}

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.getElementById("search-button").addEventListener("click", async () => {
    const query = document.getElementById("search-input").value;
    const articles = await fetchNews(query);
    displayBlogs(articles);
});

// Load some news on initial load
(async () => {
    const articles = await fetchNews("latest");
    displayBlogs(articles);
})();

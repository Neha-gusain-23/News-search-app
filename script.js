const apikey = "5000ce8fe88a4bf0a634c2d60a4a7abc";

const blockcontainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apikey}`;
    const response = await fetch(apiurl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}

function displayBlogs(articles) {
  blockcontainer.innerHTML = "";
  articles.forEach(article => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 ? article.title.substring(0, 30) + "..." : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blockcontainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error displaying blogs", error);
  }
})();

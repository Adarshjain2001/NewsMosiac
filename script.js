const API_KEY = "0316cea0510358b70fd7ac922e144e43";
const BASE_URL = "https://gnews.io/api/v4/search?q=";

function fetchNews(query = "latest") {
    document.getElementById("loading").style.display = "block";

    fetch(`${BASE_URL}${query}&lang=en&country=us&token=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loading").style.display = "none";
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = "";

            if (!data.articles || data.articles.length === 0) {
                newsContainer.innerHTML = "<p>No articles found.</p>";
                return;
            }

            data.articles.forEach(article => {
                const newsCard = document.createElement("div");
                newsCard.classList.add("news-card");
                newsCard.innerHTML = `
                    <img src="${article.image || 'https://via.placeholder.com/600x400'}" alt="News Image">
                    <h2>${article.title}</h2>
                    <p>${article.description || "No description available."}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                `;
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => {
            document.getElementById("loading").style.display = "none";
            console.error("Error fetching news:", error);
        });
}

window.onload = () => fetchNews();

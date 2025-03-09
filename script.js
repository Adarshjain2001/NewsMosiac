const API_KEY = "9ef9cc0a0afe47fea3879166619dcc5a";
const BASE_URL = "https://newsapi.org/v2/top-headlines?q=India&sortBy=popularity";

function fetchNews(query = "latest") {
    document.getElementById("loading").style.display = "block";
    fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loading").style.display = "none";
            if (!data.articles) {
                console.error("No articles found:", data);
                return;
            }
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = "";
            data.articles.forEach(article => {
                const newsCard = document.createElement("div");
                newsCard.classList.add("news-card");
                newsCard.innerHTML = `
                    <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
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

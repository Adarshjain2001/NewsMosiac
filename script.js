const API_KEY = "4707e76408294ec7a52c329e45bf69f1";
const BASE_URL = "https://newsapi.org/v2/everything?q=";

function fetchNews(query = "latest") {
    document.getElementById("loading").style.display = "block";
    fetch(`${BASE_URL}${query}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loading").style.display = "none";
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = "";
            data.articles.forEach(article => {
                const newsCard = document.createElement("div");
                newsCard.classList.add("news-card");
                newsCard.innerHTML = `
                    <img src="${article.urlToImage}" alt="News Image">
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
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

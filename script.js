const API_KEY = "4707e76408294ec7a52c329e45bf69f1";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Latest"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        showLoader();
        const res = await fetch(`${url}${encodeURIComponent(query)}&apiKey=${API_KEY}`);
        const data = await res.json();
        hideLoader();

        if (res.status !== 200) {
            throw new Error(`API Error: ${data.message || "Unable to fetch news"}`);
        }

        if (!data.articles || data.articles.length === 0) {
            showError("No articles found for this topic.");
            return;
        }

        bindData(data.articles);
    } catch (error) {
        hideLoader();
        console.error("Fetch Error:", error);
        showError("Failed to fetch news. Please try again.");
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    if (!cardsContainer || !newsCardTemplate) {
        console.error("Error: Missing template or container elements.");
        return;
    }

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    if (!newsImg || !newsTitle || !newsSource || !newsDesc) {
        console.error("Error: Template elements not found.");
        return;
    }

    newsImg.src = article.urlToImage || "fallback-image.jpg";
    newsTitle.textContent = article.title || "No title available";
    newsDesc.textContent = article.description || "No description available";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.textContent = `${article.source.name || "Unknown Source"} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (!navItem) {
        console.error(`Error: Navigation item '${id}' not found.`);
        return;
    }

    if (curSelectedNav) {
        curSelectedNav.classList.remove("active");
    }
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

if (searchButton && searchText) {
    searchButton.addEventListener("click", () => {
        const query = searchText.value.trim();
        if (query) {
            fetchNews(query);
            if (curSelectedNav) {
                curSelectedNav.classList.remove("active");
                curSelectedNav = null;
            }
        }
    });
} else {
    console.error("Error: Search button or input field not found.");
}

function showLoader() {
    if (document.querySelector(".loader-container")) return;

    const loaderContainer = document.createElement("div");
    loaderContainer.className = "loader-container";
    loaderContainer.innerHTML = `<div class="loader"></div>`;
    document.body.appendChild(loaderContainer);
}

function hideLoader() {
    const loaderContainer = document.querySelector(".loader-container");
    if (loaderContainer) {
        loaderContainer.remove();
    }
}

function showError(message) {
    const cardsContainer = document.getElementById("cards-container");
    if (cardsContainer) {
        cardsContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }
}

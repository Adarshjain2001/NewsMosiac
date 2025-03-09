
# 📰 News Mosiac

This is a simple frontend web application that displays the latest news articles using the **GNews API**.

## 🔍 Features

- Fetches real-time news articles using the GNews API.
- Clean and responsive layout.
- Displays article image, title, description, and link to the full article.
- Minimal and beginner-friendly code structure.

## 🚀 Live Demo

> [https://newsmosiac.vercel.app/]

## 📦 Technologies Used

**Frontend:**
- HTML - Structure of the application.
- CSS - Styling for an engaging and user-friendly design.
- JavaScript - Handles dynamic content fetching and interactive features.
- 
**API:**
- [GNews API](https://gnews.io/) - Utilizes the News API to retrieve live news updates.
  
## 🔧 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Adarshjain2001/NewsMosiac.git
   ```
2. Replace the API_KEY in script.js with your own key from https://gnews.io:
   ```bash
   const API_KEY = "YOUR_GNEWS_API_KEY";
   ```
3. Open index.html in your browser:
   ```bash
   # Optionally use Live Server or open manually
   open index.html
   ```

## 💡 Customize

- Change the search query by editing the fetchNews() call in script.js:
```bash
   fetchNews("technology"); // or "sports", "health", etc.
   ```
- You can also add a search box or category filter—PRs are welcome!

## 🛑 Note on API Usage

- Up to 100 requests per day
- Limited to 10 articles per request

## 👤Usage

- Filter News: Select a category to view news articles from that section.
- Search: Use the search bar to find specific news topics.
- Responsive Navigation: Browse news comfortably across different devices.

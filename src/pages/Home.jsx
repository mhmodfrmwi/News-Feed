import Article from "@/components-2/Article";
import { useEffect, useState } from "react";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = "12389e6670c344bcbc03f6a6d1276ae3";

  useEffect(() => {
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json`;
    const cachedNews = localStorage.getItem("news");

    if (cachedNews) {
      setArticles(JSON.parse(cachedNews));
    } else {
      console.log("done");
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok: " + res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.articles) {
            setArticles(data.articles);
            localStorage.setItem("news", JSON.stringify(data.articles));
          } else {
            throw new Error("Data format is not as expected");
          }
        })
        .catch((error) => {
          setError(error.message);
          console.error("Fetching error:", error);
        });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (articles.length > 0) {
        localStorage.setItem("news", JSON.stringify(articles));
      }
    };
  }, [articles]);

  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      {error ? (
        <p>Error: {error}</p>
      ) : articles.length > 0 ? (
        articles.map((article, index) => (
          <Article
            key={index}
            image={article.urlToImage}
            title={article.title}
            description={article.description} // Fixed spelling
            author={article.author}
            publishedAt={article.publishedAt}
          />
        ))
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
};

export default Home;

import Article from "@/components-2/Article";
import Header from "@/components-2/Header";
import { useEffect, useState } from "react";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("au");

  useEffect(() => {
    console.log(`Category: ${category}, Country: ${country}`);
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/${country}.json`;
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
  }, [category, country]);

  return (
    <div className="flex flex-col gap-5">
      <Header onCategoryChange={setCategory} onCountryChange={setCountry} />
      <div className="flex flex-col gap-2 p-4 w-full">
        {error ? (
          <p>Error: {error}</p>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <Article
              key={index}
              image={article.urlToImage}
              title={article.title}
              description={article.description}
              author={article.author}
              publishedAt={article.publishedAt}
            />
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default Home;

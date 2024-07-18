import React, { useEffect, useState } from "react";
import { CircularProgress } from "@chakra-ui/react";
import Article from "@/components-2/Article";
import Header from "@/components-2/Header";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("au");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/${country}.json`;
    setLoading(true);
    setError(false);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.articles) {
          setArticles(data.articles);
        } else {
          throw new Error("Data format is not as expected");
        }
        setTimeout(() => {
          setLoading(false); // Ensure loading state is set to false here
        }, 500);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setLoading(false); // Ensure loading state is set to false here
        }, 2000); // Ensure loading state is set to false here as well
      });
  }, [category, country]);

  return (
    <div className="flex flex-col gap-5">
      <Header onCategoryChange={setCategory} onCountryChange={setCountry} />
      <div className="flex flex-col gap-2 p-4 w-full items-center">
        {loading && <CircularProgress isIndeterminate />}
        {error && <p>Something went wrong..!</p>}
        {!loading && !error && articles.length > 0
          ? articles.map((article, index) => (
              <Article
                key={index}
                image={article.urlToImage}
                title={article.title}
                description={article.description}
                content={article.content}
                author={article.author}
                publishedAt={article.publishedAt}
              />
            ))
          : !loading && !error && <p>No articles found</p>}
      </div>
    </div>
  );
};

export default Home;

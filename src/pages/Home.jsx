import React, { useEffect, useState } from "react";
import { CircularProgress } from "@chakra-ui/react";
import Article from "@/components-2/Article";
import Header from "@/components-2/Header";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("general");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/gb.json`;
    setLoading(true);
    setError(false);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

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
        setLoading(false);
        clearTimeout(timer); // Clear the timeout if data fetch is completed
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        clearTimeout(timer); // Clear the timeout if there is an error
      });
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setFilteredData(
        articles.filter((article) =>
          article.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // Cleanup timeout on unmount or when searchValue changes
  }, [searchValue, articles]);

  return (
    <div className="flex flex-col gap-5">
      <Header onCategoryChange={setCategory} onSearchHandler={setSearchValue} />
      <div className="flex flex-col gap-2 p-4 w-full items-center">
        {loading && <CircularProgress isIndeterminate color="green.300" />}
        {error && <p>Something went wrong..!</p>}
        {!loading && !error && filteredData.length > 0
          ? filteredData.map((article, index) => (
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

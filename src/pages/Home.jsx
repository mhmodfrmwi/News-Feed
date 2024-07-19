import React, { useEffect, useState } from "react";
import { CircularProgress } from "@chakra-ui/react";
import Article from "@/components-2/Article";
import Header from "@/components-2/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components-2/Logo";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("general");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  useEffect(() => {
    const url = `http://localhost:3000/articles`;
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
        console.log(data);
        if (data) {
          setArticles(
            category !== "general"
              ? data.filter((article) => article.source?.id == category)
              : data
          );
        } else {
          throw new Error("Data format is not as expected");
        }
        setLoading(false);
        clearTimeout(timer);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        clearTimeout(timer);
      });
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setFilteredData(
        articles.filter(
          (article) =>
            article.content
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            article.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
            article.author?.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, articles]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredData.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(filteredData.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 min-h-screen dark:text-cyan-50">
      <Logo />
      <Header onCategoryChange={setCategory} onSearchHandler={setSearchValue} />
      <div className="flex flex-col gap-2 p-4 w-full items-center">
        {loading && <CircularProgress isIndeterminate color="green.300" />}
        {error && <p>Something went wrong..!</p>}
        {!loading && !error && currentArticles.length > 0
          ? currentArticles.map((article, index) => (
              <Link to={`/${article.title}`} key={index}>
                <Article
                  image={article.urlToImage}
                  title={article.title}
                  description={article.description}
                  content={article.content}
                  author={article.author}
                  publishedAt={article.publishedAt}
                />
              </Link>
            ))
          : !loading && !error && <p>No articles found</p>}

        <div className="flex justify-center items-center mt-4">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

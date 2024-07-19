import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components-2/Header";
import Logo from "@/components-2/Logo";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("http://localhost:3000/articles");
        const data = await response.json();
        const foundArticle = data.find((article) => article.title === id);
        if (foundArticle) {
          setArticle(foundArticle);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 dark:text-slate-50">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 dark:text-slate-50">
      <Logo />
      <div className="w-4/5 mx-auto bg-white dark:bg-sky-950 shadow-lg rounded-lg overflow-hidden mt-6 p-4">
        {article.urlToImage && (
          <img
            className="w-full h-auto"
            src={article.urlToImage}
            alt={article.title}
          />
        )}
        <div className="p-6 text-start">
          <h1 className="text-3xl font-bold mb-4 max-[768px]:text-xl">
            {article.title}
          </h1>
          <p className="text-gray-300 text-xl mb-6">{article.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
            <span>Author: {article.author}</span>
            <span>
              Published At: {new Date(article.publishedAt).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed">{article.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;

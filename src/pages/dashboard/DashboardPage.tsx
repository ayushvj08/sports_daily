import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../context/articles/action";
import { Article } from "../../context/types";

const DashboardPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const response = await fetchArticles();
    if (response.ok) setArticles(response.data);
    // else setError()
  };
  return (
    <div className="max-w-4xl">
      {articles.length}
      Articles:
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <p>Title: {article.title}</p>
            <p>summary: {article.summary}</p>
            <img width={200} src={article.thumbnail} alt="article-thimbnail" />
          </div>
        );
      })}
    </div>
  );
};
export default DashboardPage;

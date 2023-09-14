import { useEffect, useState } from "react";
import { Sport } from ".";
import { fetchArticles } from "../../context/articles/action";
import ArticleCard from "./ArticleCard";
import { Article } from "../../context/types";

const ArticleList = (props: { sport: Sport }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArticles = async () => {
    const response = await fetchArticles();
    if (response.ok) {
      const newArticles = response.data.filter(
        (ar: Article) =>
          JSON.stringify(ar.sport) === JSON.stringify(props.sport)
      );
      setArticles(newArticles);
    }
    // else setError()
  };

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-lg p-1 mb-4 mr-2">No Articles found</div>
    );
  }

  return (
    <div className="mr-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
export default ArticleList;

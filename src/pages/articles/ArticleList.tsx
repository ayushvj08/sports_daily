import { useContext } from "react";
import ArticleCard from "./ArticleCard";
import { Article, Sport } from "../../context/types";
import { ArticleContext } from "../../context/articles/context";

const ArticleList = (props: { sport: Sport }) => {
  const { articleState } = useContext(ArticleContext);

  if (articleState.isLoading) {
    return <>Loading Articles! Hang Up...</>;
  }

  if (articleState.articles.length === 0) {
    return (
      <div className="bg-white rounded-lg p-1 mb-4 mr-2">
        No Articles Found!
      </div>
    );
  }

  const filterArticles = () => {
    return articleState.articles.filter(
      (article: Article) => article.sport.id === props.sport.id
    );
  };
  return (
    <div className="mr-4">
      {filterArticles().length === 0 ? (
        <div className="bg-white rounded-lg p-1 mb-4 mr-2">
          No Articles Found!
        </div>
      ) : (
        filterArticles().map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
};
export default ArticleList;

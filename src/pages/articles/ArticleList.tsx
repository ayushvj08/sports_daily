import { useContext } from "react";
import ArticleCard from "./ArticleCard";
import { Article, Sport } from "../../context/types";
import { ArticleContext } from "../../context/articles/context";

const ArticleList = (props: { sport: Sport }) => {
  const { articleState } = useContext(ArticleContext);
  // const [articles, setArticles] = useState<Article[]>(articleState.articles);
  // const getArticles = async () => {
  //   //
  //   if (articleState.articles.length != 0) {
  //     const newArticles = articleState.articles.filter(
  //       (article: Article) =>
  //         JSON.stringify(article.sport) === JSON.stringify(props.sport)
  //     );
  //     setArticles(newArticles);
  //   }
  // };
  // useEffect(() => {
  //   getArticles();
  // }, []);
  if (articleState.isLoading) {
    return <>Loading Articles! Hang Up...</>;
  }

  if (articleState.articles.length === 0) {
    console.log("ok");
    return (
      <div className="bg-white rounded-lg p-1 mb-4 mr-2">
        No Articles Found!
      </div>
    );
  }

  const getFilteredArticles = () => {
    return articleState.articles.filter(
      (article: Article) =>
        JSON.stringify(article.sport) === JSON.stringify(props.sport)
    );
  };
  return (
    <div className="mr-4">
      {getFilteredArticles().length === 0 ? (
        <div className="bg-white rounded-lg p-1 mb-4 mr-2">
          No Articles Found!
        </div>
      ) : (
        getFilteredArticles().map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
    </div>
  );
};
export default ArticleList;

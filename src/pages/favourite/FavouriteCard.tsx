import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleContext } from "../../context/articles/context";
import { PreferencesContext } from "../../context/preferences/context";
import { getFilteredArticles } from "../../context/articles/action";
import { ThemeContext } from "../../context/theme/context";

const FavouriteCard = () => {
  const { articleState } = useContext(ArticleContext);
  const { preferencesState } = useContext(PreferencesContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  let articles;
  if (
    preferencesState.preferences.sports.length == 0 &&
    preferencesState.preferences.teams.length == 0
  ) {
    // articles = getFilteredArticles(articleState, preferencesState);
    articles = articleState.articles;
  } else {
    articles = getFilteredArticles(articleState, preferencesState);
  }
  return (
    <div className="mx-2 mt-4 flex flex-col gap-4">
      {articles?.slice(0, 5)?.map((article) => {
        return (
          <div
            key={article.id}
            className={`${theme} dark:bg-gray-950 bg-white py-2 rounded`}
          >
            <p className="text-lg pl-3 mb-2 font-semibold">{article.title}</p>
            <p className="text-gray-500 pl-3">{article.summary}</p>
            <div className="flex items-center justify-center">
              <button
                onClick={() => navigate(`${article.id}`)}
                className="bg-gray-800 my-3 py-1 rounded w-11/12 text-white"
              >
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FavouriteCard;

import { useContext, useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { ArticleContext } from "../../context/articles/context";
import Favourite from "../favourite";
import MatchCards from "../matches/MatchCards";
import { fetchPreferences } from "../../context/preferences/action";
import { PreferencesContext } from "../../context/preferences/context";
import ArticleContainer from "./ArticleContainer";

const Articles: React.FC = () => {
  const { articleDispatch } = useContext(ArticleContext);
  const { preferencesDispatch } = useContext(PreferencesContext);

  useEffect(() => {
    fetchArticles(articleDispatch);
    fetchPreferences(preferencesDispatch);
  }, [articleDispatch, preferencesDispatch]);

  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto pl-4">
        <p className="text-3xl font-semibold pt-4 mb-3">Live Scores</p>
        <MatchCards />

        <p className="text-3xl font-semibold my-3">Trending News</p>
        <div className="flex flex-row flex-wrap justify-between">
          <ArticleContainer />
          <Favourite />
        </div>
      </div>
    </div>
  );
};
export default Articles;

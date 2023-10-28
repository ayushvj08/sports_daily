import { useContext, useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { ArticleContext } from "../../context/articles/context";
import Favourite from "../favourite";
import MatchCards from "../matches/MatchCards";
import { fetchPreferences } from "../../context/preferences/action";
import { PreferencesContext } from "../../context/preferences/context";
import ArticleTabPanels from "./ArticleTabPanels";
import { ThemeContext } from "../../context/theme/context";
import { Outlet } from "react-router-dom";

const Articles: React.FC = () => {
  const { articleDispatch } = useContext(ArticleContext);
  const { preferencesDispatch } = useContext(PreferencesContext);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    fetchArticles(articleDispatch);
    fetchPreferences(preferencesDispatch);
  }, [articleDispatch, preferencesDispatch]);

  return (
    <>
      <div className={`${theme} bg-gray-200`}>
        <div className="max-w-7xl mx-auto pl-4">
          <p className="text-3xl font-semibold pt-4 mb-3">Live Scores</p>
          <MatchCards />

          <p className="text-3xl font-semibold my-3">Trending News</p>
          <div className="flex flex-row flex-wrap justify-between">
            <ArticleTabPanels />
            <Favourite />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Articles;

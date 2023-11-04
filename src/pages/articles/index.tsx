import { useContext } from "react";
import Favourite from "../favourite";
import MatchCards from "../matches/MatchCards";
import ArticleTabPanels from "./ArticleTabPanels";
import { ThemeContext } from "../../context/theme/context";
import { Outlet } from "react-router-dom";
// import ErrorBoundary from "../../components/ErrorBoundary";

const Articles: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`${theme} min-h-screen bg-gray-200`}>
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

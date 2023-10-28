import { useContext, useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import { Tab } from "@headlessui/react";
// import ListPrefferedArticles from "../favourite/ListPreferredArticles";
import { Sport } from "../../context/types";
import {
  fetchSports,
  getFilteredArticles,
} from "../../context/articles/action";
import ArticleCard from "./ArticleCard";
import { ArticleContext } from "../../context/articles/context";
import { PreferencesContext } from "../../context/preferences/context";

const ArticleTabPanels = () => {
  const { articleState } = useContext(ArticleContext);
  const { preferencesState } = useContext(PreferencesContext);
  const [sports, setSports] = useState<Sport[]>([]);
  const hasSetPreferences = !!localStorage.getItem("preferences");
  useEffect(() => {
    getSports();
  }, []);

  const getSports = async () => {
    const response = await fetchSports();
    if (response.ok) setSports(response.data.sports);
    else console.warn(response.error);
  };

  return (
    <div className="sm:w-3/4 mx-auto">
      <Tab.Group>
        <Tab.List className="flex flex-wrap gap-6 mb-3">
          {hasSetPreferences ? <Tab className="">Your News</Tab> : null}

          {sports.map((sport: Sport) => (
            <Tab className="" key={sport.id}>
              {sport.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {hasSetPreferences ? (
            <Tab.Panel>
              <div className="mr-8">
                {getFilteredArticles(articleState, preferencesState).map(
                  (article) => {
                    return <ArticleCard key={article.id} article={article} />;
                  }
                )}
              </div>
            </Tab.Panel>
          ) : null}

          {sports.map((sport: Sport) => (
            <Tab.Panel key={sport.id}>
              <ArticleList key={sport.id} sport={sport} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default ArticleTabPanels;

import { useContext, useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import { API_ENDPOINT } from "../../config/constant";
import { Tab } from "@headlessui/react";
import { fetchArticles } from "../../context/articles/action";
import { ArticleContext } from "../../context/articles/context";
import Favourite from "../favourite";
import MatchCards from "../matches/MatchCards";
import { fetchPreferences } from "../../context/preferences/action";
import { PreferencesContext } from "../../context/preferences/context";
import ArticleCard from "./ArticleCard";
import { Article } from "../../context/types";
export type Sport = {
  id: 5;
  name: "Table Tennis";
};
const Articles: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const { articleState, articleDispatch } = useContext(ArticleContext);
  const { preferencesDispatch } = useContext(PreferencesContext);

  useEffect(() => {
    fetchPreferences(preferencesDispatch);
    fetchArticles(articleDispatch);
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/sports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSports(data.sports);
    } catch (error) {
      console.log(error);
    }
  };
  const getFilteredArticles = () => {
    let filteredArticles: Article[] = [];
    let filteredTeamArticles: Article[] = [];

    const mypreferredSports = JSON.parse(
      localStorage.getItem("preferences") || ""
    ).preferences.sports;
    if (mypreferredSports.length > 0)
      filteredArticles = articleState.articles.filter((article) => {
        if (mypreferredSports.includes(article.sport.id)) return article;
      });

    const mypreferredTeams = JSON.parse(
      localStorage.getItem("preferences") || ""
    ).preferences.teams;
    if (mypreferredTeams.length > 0)
      filteredTeamArticles = articleState.articles.filter((article) => {
        if (
          mypreferredTeams.includes(article.teams[0]?.id) ||
          mypreferredTeams.includes(article.teams[1]?.id)
        )
          return article;
      });

    filteredTeamArticles.forEach((article) => {
      if (!filteredArticles.includes(article)) filteredArticles.push(article);
    });
    return filteredArticles;
  };
  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl pt-6 mx-auto">
        <p className="text-3xl font-semibold my-2">Live Now</p>
        <MatchCards />
        <p className="text-3xl font-semibold my-2">Trending News</p>
        <div className="flex flex-row flex-wrap justify-between">
          <div className="sm:w-3/4">
            <Tab.Group>
              <Tab.List>
                {JSON.parse(localStorage.getItem("preferences") || "")
                  ?.preferences ? (
                  <Tab className="mr-4 mb-2">Your News</Tab>
                ) : null}

                {sports.map((sport: Sport) => (
                  <Tab className="mr-4 mb-2" key={sport.id}>
                    {sport.name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                {JSON.parse(localStorage.getItem("preferences") || "")
                  ?.preferences ? (
                  <Tab.Panel>
                    <div className="mr-4">
                      {getFilteredArticles().map((article) => {
                        return (
                          <ArticleCard key={article.id} article={article} />
                        );
                      })}
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
          <Favourite />
        </div>
      </div>
    </div>
  );
};
export default Articles;

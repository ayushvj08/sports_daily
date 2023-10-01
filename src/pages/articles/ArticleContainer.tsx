import { useEffect, useState, useContext } from "react";
import ArticleList from "./ArticleList";
import { API_ENDPOINT } from "../../config/constant";
import { Tab } from "@headlessui/react";
import ArticleCard from "./ArticleCard";
import { ArticleContext } from "../../context/articles/context";
import { getFilteredArticles } from "../../context/articles/action";

export type Sport = {
  id: 5;
  name: "Table Tennis";
};

const ArticleContainer = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const { articleState } = useContext(ArticleContext);

  useEffect(() => {
    fetchSports();
  });
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

  return (
    <div className="sm:w-3/4">
      <Tab.Group>
        <Tab.List>
          {localStorage.getItem("preferences") ? (
            JSON.parse(localStorage.getItem("preferences") || "")
              ?.preferences ? (
              <Tab className="mr-4 mb-2">Your News</Tab>
            ) : null
          ) : null}

          {sports.map((sport: Sport) => (
            <Tab className="mr-4 mb-2" key={sport.id}>
              {sport.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {localStorage.getItem("preferences") ? (
            JSON.parse(localStorage.getItem("preferences") || "")
              ?.preferences ? (
              <Tab.Panel>
                <div className="mr-4">
                  {getFilteredArticles(articleState).map((article) => {
                    return <ArticleCard key={article.id} article={article} />;
                  })}
                </div>
              </Tab.Panel>
            ) : null
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
export default ArticleContainer;

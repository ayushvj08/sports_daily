import { useEffect, useState } from "react";
import MatchCards from "../matches/MatchCards";
import ArticleList from "./ArticleList";
import Favourite from "./Favourite";
import { API_ENDPOINT } from "../../config/constant";
import { Tab } from "@headlessui/react";
import { Outlet } from "react-router-dom";
export type Sport = {
  id: 5;
  name: "Table Tennis";
};
const Dashboard: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  useEffect(() => {
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

  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl pt-6 mx-auto">
        <MatchCards />
        <p className="text-3xl font-semibold my-2">Trending News</p>
        <div className="flex flex-row flex-wrap justify-between">
          <div className="sm:w-3/4">
            <Tab.Group>
              <Tab.List>
                {sports.map((sport: Sport) => (
                  <Tab className="mr-4 mb-2" key={sport.id}>
                    {sport.name}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
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
      <Outlet />
    </div>
  );
};
export default Dashboard;

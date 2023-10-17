import { useContext, useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constant";
import { Match } from ".";
import { ThemeContext } from "../../context/theme/context";

const MatchCards = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchMatches();
  }, []);
  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_ENDPOINT}/matches`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // console.log(data);
      setMatches(data.matches);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {matches.map((match) => {
        return match.isRunning ? (
          <div
            key={match.id}
            className={`${theme} dark:bg-gray-900 w-72 bg-white rounded-lg shadow-md p-4 mr-4 mb-6 transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110 duration-200`}
          >
            <div className="text-xl font-bold mb-2">{match.sportName}</div>
            <div> {match.location}</div>
            <br />
            <div className="text-gray-500">{match.name}</div>
          </div>
        ) : null;
      })}
    </div>
  );
};
export default MatchCards;

import { useContext, useEffect, useState } from "react";
import { Sport, Team } from "../../context/types";
import { PreferencesContext } from "../../context/preferences/context";

const initialState = {
  sport: {} as Sport,
  team: {} as Team,
};
const FavouriteForm = () => {
  const { preferencesDispatch } = useContext(PreferencesContext);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // console.log(state);
    preferencesDispatch({
      type: "FETCH_PREFERENCES_SUCCESS",
      payload: { sports: [state.sport], teams: [state.team] },
    });
  }, [state, preferencesDispatch]);

  const favSports = JSON.parse(localStorage.getItem("preferences") || "")
    .preferences.sports;
  const favTeams = JSON.parse(localStorage.getItem("preferences") || "")
    .preferences.teams;

  // const formChange = async () => {
  //   console.log(state);
  //   preferencesDispatch({
  //     type: "FETCH_PREFERENCES_SUCCESS",
  //     payload: { sports: [state.sport], teams: [state.team] },
  //   });
  // };

  return (
    <form className="">
      <select
        className="text-gray-500 my-1 rounded"
        name="favSports"
        onChange={(e) => {
          setState((state) => ({
            ...state,
            sport: JSON.parse(e.target.value),
          }));
        }}
      >
        <option key={"55"}>-- Select Your Favoutite Sport --</option>
        {favSports.map((fs: Sport) => {
          return (
            <option value={JSON.stringify(fs)} className="" key={fs.id}>
              {fs.name}
            </option>
          );
        })}
      </select>
      <select
        className="text-gray-500 my-1 rounded"
        name="favTeam"
        onChange={(e) =>
          setState((state) => ({ ...state, team: JSON.parse(e.target.value) }))
        }
      >
        <option key={"sd"}>-- Select Your Favoutite Team --</option>
        {favTeams.map((ft: Team) => (
          <option value={JSON.stringify(ft)} key={ft.id}>
            {ft.name}
          </option>
        ))}
      </select>
    </form>
  );
};
export default FavouriteForm;

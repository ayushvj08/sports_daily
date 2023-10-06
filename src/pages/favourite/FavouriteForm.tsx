import { useContext, useState } from "react";
import { Sport, Team } from "../../context/types";
import { PreferencesContext } from "../../context/preferences/context";

const initialState = {
  sport: {} as Sport,
  team: {} as Team,
};
const FavouriteForm = () => {
  const { preferencesDispatch } = useContext(PreferencesContext);
  const [state, setState] = useState(initialState);

  const favSports = JSON.parse(localStorage.getItem("preferences") || "")
    .preferences.sports;
  const favTeams = JSON.parse(localStorage.getItem("preferences") || "")
    .preferences.teams;
  const formChange = async () => {
    preferencesDispatch({
      type: "FETCH_PREFERENCES_SUCCESS",
      payload: { sports: [state.sport], teams: [state.team] },
    });
    console.log(state);
  };
  return (
    <form className="" onChange={formChange}>
      <select
        className="text-gray-500 my-1 rounded"
        onChange={(e) =>
          setState({ ...state, sport: JSON.parse(e.target.value) })
        }
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
        onChange={(e) =>
          setState({ ...state, team: JSON.parse(e.target.value) })
        }
        className="text-gray-500 my-1 rounded"
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

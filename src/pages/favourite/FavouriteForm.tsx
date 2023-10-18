import { useContext, useEffect, useState } from "react";
import { Sport, Team } from "../../context/types";
import { PreferencesContext } from "../../context/preferences/context";

const FavouriteForm = () => {
  const { preferencesState, preferencesDispatch } =
    useContext(PreferencesContext);
  const [state, setState] = useState(preferencesState.preferences);

  useEffect(() => {
    preferencesDispatch({
      type: "FETCH_PREFERENCES_SUCCESS",
      payload: { sports: state.sports as Sport[], teams: state.teams },
    });
  }, [state, preferencesDispatch]);

  const favSports = JSON.parse(localStorage.getItem("preferences") || "[]")
    .preferences?.sports;
  const favTeams = JSON.parse(localStorage.getItem("preferences") || "[]")
    .preferences?.teams;

  // const formChange = async () => {
  //   console.log(state);
  //   preferencesDispatch({
  //     type: "FETCH_PREFERENCES_SUCCESS",
  //     payload: { sports: [state.sport], teams: [state.team] },
  //   });
  // };

  return (
    <form className="ml-2">
      <select
        className="text-gray-500 block my-1 rounded"
        name="favSports"
        onChange={(e) => {
          setState((state) => ({
            ...state,
            sports: [JSON.parse(e.target.value)],
          }));
        }}
      >
        <option key={"55"} value={`{}`}>
          -- Select --
        </option>
        {favSports?.map((fs: Sport) => {
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
          setState((state) => ({
            ...state,
            teams: [JSON.parse(e.target.value)],
          }))
        }
      >
        <option key={"sd"} value={`{}`}>
          -- Select --
        </option>
        {favTeams?.map((ft: Team) => (
          <option value={JSON.stringify(ft)} key={ft.id}>
            {ft.name}
          </option>
        ))}
      </select>
    </form>
  );
};
export default FavouriteForm;

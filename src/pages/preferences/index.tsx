// import { useContext, useEffect } from "react";
// import { fetchPreferences } from "../../context/preferences/action";
// import { PreferencesContext } from "../../context/preferences/context";
import PreferencesForm from "./PreferencesForm";

const Preferences = () => {
  // const { preferencesDispatch } = useContext(PreferencesContext);
  // useEffect(() => {
  //   fetchPreferences(preferencesDispatch);
  // }, [preferencesDispatch]);
  // useEffect(() => {
  //   fetchSports();
  //   fetchTeams();
  // }, []);
  return <PreferencesForm />;
};
export default Preferences;

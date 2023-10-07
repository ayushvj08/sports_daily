import React from "react";
import { API_ENDPOINT } from "../../config/constant";
import { Actions, Preferences } from "./reducer";

export const fetchPreferences = async (preferencesDispatch: React.Dispatch<Actions>) => {
  const token = localStorage.getItem("authToken")
  preferencesDispatch({
    type: "FETCH_PREFERENCES_REQUEST",
  });
  try {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    const responseData = await response.json();
    const preferences = { sports: responseData.preferences?.sports, teams: responseData.preferences?.teams }
    preferencesDispatch({
      type: "FETCH_PREFERENCES_SUCCESS",
      payload: preferences,
    });
    localStorage.setItem("preferences", JSON.stringify(responseData))
  } catch (error) {
    console.log(error);
    preferencesDispatch({
      type: "FETCH_PREFERENCES_ERROR",
      payload: `${error}`,
    });
  }
};

export const updatePreferences = async (preferencesDispatch: React.Dispatch<Actions>, formBody: { preferences: Preferences }) => {
  const token = localStorage.getItem("authToken")
  try {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formBody),
    });
    const data = await response.json();
    preferencesDispatch({ type: "UPDATE_PREFERENCES_SUCCESS", payload: data.preferences });
    localStorage.setItem("preferences", JSON.stringify(data))

    return { ok: true }
  } catch (error) {
    console.log(error);
    return { ok: false }
  }
};

export const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return { data, ok: true }
  } catch (error) {
    console.log(error);
    return { ok: false, error }
  }
}

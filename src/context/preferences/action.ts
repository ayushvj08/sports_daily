import React from "react";
import { API_ENDPOINT } from "../../config/constant";
import { formState } from "../../pages/preferences/PreferencesForm";
import { Actions } from "./reducer";

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
    preferencesDispatch({
      type: "FETCH_PREFERENCES_SUCCESS",
      payload: responseData.preferences,
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

export const updatePreferences = async (preferencesDispatch: React.Dispatch<Actions>, responseBody: formState) => {
  const token = localStorage.getItem("authToken")
  try {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(responseBody),
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

export const fetchSports = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/sports`, {
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

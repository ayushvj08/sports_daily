import React from "react";
import { API_ENDPOINT } from "../../config/constant";
import { ArticleActions, ArticleState } from "./reducer";
import { Article, Sport, Team } from "../types";
import { PreferencesState } from "../preferences/reducer";

export const fetchArticles = async (articleDispatch: React.Dispatch<ArticleActions>) => {
  try {
    articleDispatch({ type: "FETCH_ARTICLES_REQUEST" })
    {
      const response = await fetch(`${API_ENDPOINT}/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.errors) {
        console.log(data.errors);
        return { ok: false, error: data.errors };
      }
      else {
        articleDispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data })
        // return { ok: true, data: data }
      }
    }
  } catch (error) {
    console.log(error);
    articleDispatch({ type: "FETCH_ARTICLES_ERROR", payload: `${error}` })
    // return { ok: false, error: error };
  }
};

export const fetchArticleById = async (id: string) => {
  try {
    {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.errors) {
        console.log(data.errors);
        return { ok: false, error: data.errors };
      }
      else return { ok: true, data: data };
    }
  } catch (error) {
    console.log(error);
    return { ok: false, error: error };

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



export const getFilteredArticles = (articleState: ArticleState, preferencesState: PreferencesState) => {
  let filteredArticles: Article[] = [];
  let filteredTeamArticles: Article[] = [];
  // console.log(preferencesState.preferences.sports, preferencesState.preferences.teams)
  const mypreferredSports = preferencesState.preferences.sports
  // if (mypreferredSports.length > 0)
    filteredArticles = articleState.articles.filter((article) => {

      if (mypreferredSports.some((e: Sport) => e.id === article.sport.id)) return article;
    });

  const mypreferredTeams = preferencesState.preferences.teams;
  // if (mypreferredTeams.length > 0)
    filteredTeamArticles = articleState.articles.filter((article) => {
      if (
        mypreferredTeams.some((e: Team) => e.id === article.teams[0]?.id) ||
        mypreferredTeams.some((e: Team) => e.id === article.teams[1]?.id)
      )
        return article;
    });

  filteredTeamArticles.forEach((article) => {
    if (!filteredArticles.includes(article)) filteredArticles.push(article);
  });
  return filteredArticles;
};
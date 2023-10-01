import React from "react";
import { API_ENDPOINT } from "../../config/constant";
import { ArticleActions } from "./reducer";

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

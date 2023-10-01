import React, { createContext, useReducer } from "react";
import { ArticleActions, ArticleState, articleReducer } from "./reducer";
const initialState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};
type ArticleContextType = {
  articleState: ArticleState;
  articleDispatch: React.Dispatch<ArticleActions>;
};
export const ArticleContext = createContext<ArticleContextType>({
  articleState: initialState,
  articleDispatch: () => {},
});

export const ArticleContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [articleState, articleDispatch] = useReducer(
    articleReducer,
    initialState
  );
  return (
    <ArticleContext.Provider value={{ articleState, articleDispatch }}>
      {children}
    </ArticleContext.Provider>
  );
};

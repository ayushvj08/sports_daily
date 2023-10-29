import { Suspense, useContext, useEffect } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Articles from ".";
import { fetchPreferences } from "../../context/preferences/action";
import { PreferencesContext } from "../../context/preferences/context";
import { fetchArticles } from "../../context/articles/action";
import { ArticleContext } from "../../context/articles/context";

export const ArticleContainer = () => {
  const { articleDispatch } = useContext(ArticleContext);
  const { preferencesDispatch } = useContext(PreferencesContext);

  useEffect(() => {
    fetchArticles(articleDispatch);
    fetchPreferences(preferencesDispatch);
  }, [articleDispatch, preferencesDispatch]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        {/* <ProjectList /> */}
        <Articles />
      </Suspense>
    </ErrorBoundary>
  );
};

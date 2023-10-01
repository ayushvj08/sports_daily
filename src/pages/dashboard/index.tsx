import AppBar from "../../layout/AppBar";
import { PreferencesContextProvider } from "../../context/preferences/context";
import { ArticleContextProvider } from "../../context/articles/context";
import Articles from "../articles";

const Dashboard: React.FC = () => {
  return (
    <ArticleContextProvider>
      <PreferencesContextProvider>
        <AppBar />
        <Articles />
      </PreferencesContextProvider>
    </ArticleContextProvider>
  );
};
export default Dashboard;

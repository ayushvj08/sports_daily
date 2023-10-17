import AppBar from "../../layout/AppBar";
import { PreferencesContextProvider } from "../../context/preferences/context";
import { ArticleContextProvider } from "../../context/articles/context";
import Articles from "../articles";
import { ThemeContextProvider } from "../../context/theme/context";

const Dashboard: React.FC = () => {
  return (
    <ThemeContextProvider>
      <ArticleContextProvider>
        <PreferencesContextProvider>
          <AppBar />
          <Articles />
        </PreferencesContextProvider>
      </ArticleContextProvider>
    </ThemeContextProvider>
  );
};
export default Dashboard;

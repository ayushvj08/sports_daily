import { ArticleContextProvider } from "../../context/articles/context";
import { PreferencesContextProvider } from "../../context/preferences/context";
import { ThemeContextProvider } from "../../context/theme/context";
import AppBar from "../../layout/AppBar";

const Dashboard: React.FC = () => {
  return (
    <>
      <ThemeContextProvider>
        <ArticleContextProvider>
          <PreferencesContextProvider>
            <AppBar />
            {/* <Articles /> */}
            {/* <Outlet /> */}
          </PreferencesContextProvider>
        </ArticleContextProvider>
      </ThemeContextProvider>
    </>
  );
};
export default Dashboard;

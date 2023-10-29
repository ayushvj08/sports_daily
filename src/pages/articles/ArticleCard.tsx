import { Link } from "react-router-dom";
import { Article } from "../../context/types";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme/context";

const formattedDate = (date: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  return new Date(date).toLocaleDateString("en-US", options);
};

const ArticleCard = (props: { article: Article }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-105 duration-200">
      <div
        className={`${theme} dark:bg-gray-900 0 bg-white rounded-lg mb-4 shadow-md`}
      >
        <div className="flex flex-wrap flex-row-reverse sm:flex-row sm:flex-nowrap justify-between items-center">
          <section className="w-full sm:w-2/3 mr-2 pl-4">
            <p className="text-2xl mb-3">{props.article.title}</p>
            <p className="text-lg mb-1">{props.article.sport.name}</p>
            <p className="mb-2">{props.article.summary}</p>
            <Link
              className={`${
                theme === "dark" ? "bg-gray-700" : null
              } font-semibold text-lg p-1 bg-gray-200 rounded-sm`}
              to={`${props.article.id}`}
              aria-label="Read Article..."
            >
              Read Article...
            </Link>
            <p className="text-md mt-1">{formattedDate(props.article.date)}</p>
          </section>
          <section className="sm:flex-end w-full sm:w-1/3">
            <Link className="font-semibold" to={`${props.article.id}`}>
              <img
                className="max-h-56 max-w-48 sm:rounded-r-lg"
                width={500}
                src={props.article.thumbnail}
                alt="thumbnail-image"
                aria-label="Read more about this ..."
              />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;

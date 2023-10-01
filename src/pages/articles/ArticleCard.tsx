import { Link } from "react-router-dom";
import { Article } from "../../context/types";

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
  return (
    <div className="transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-105 duration-200">
      <div className="bg-white rounded-lg mb-4 shadow-md">
        <div className="flex flex-wrap flex-row-reverse sm:flex-row sm:flex-nowrap justify-between items-center">
          <section className="w-full sm:w-2/3 mr-2 pl-4">
            <p className="text-2xl mb-3">{props.article.title}</p>
            <p className="text-lg mb-1">{props.article.sport.name}</p>
            <p className="mb-2">{props.article.summary}</p>
            <Link
              className="font-semibold text-lg p-1 bg-gray-200  rounded-sm"
              to={`articles/${props.article.id}`}
            >
              Read More
            </Link>
            <p className="text-md mt-1">{formattedDate(props.article.date)}</p>
          </section>
          <section className="sm:flex-end w-full sm:w-1/3">
            <Link className="font-semibold" to={`articles/${props.article.id}`}>
              <img
                className="max-h-48 sm:rounded-r-lg"
                width={500}
                src={props.article.thumbnail}
              />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;

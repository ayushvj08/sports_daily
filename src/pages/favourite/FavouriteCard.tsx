import { useNavigate } from "react-router-dom";

const FavouriteCard = () => {
  const article = {
    id: 74,
    title: "Excitement and Drama in Unforgettable Match",
    thumbnail:
      "https://images.pexels.com/photos/187329/pexels-photo-187329.jpeg?auto=compress&cs=tinysrgb&w=1440",
    sport: {
      id: 5,
      name: "Table Tennis",
    },
    date: "2023-08-01T12:08:33.811Z",
    summary:
      "A game filled with excitement, suspense, and drama, a true reflection of the spirit of the sport",
    teams: [
      {
        id: 20,
        name: "Stealth Strikers",
      },
      {
        id: 17,
        name: "Celestial Chargers",
      },
    ],
  };
  const navigate = useNavigate();
  return (
    <div className="mx-2 mt-4">
      <div className="bg-white py-2 text-left rounded">
        <p className="text-lg pl-3 mb-2 font-semibold">{article.title}</p>
        <p className="text-gray-500 pl-3">{article.summary}</p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate(`articles/${article.id}`)}
            className="bg-gray-800 my-3 py-1 rounded w-11/12 text-white"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
export default FavouriteCard;

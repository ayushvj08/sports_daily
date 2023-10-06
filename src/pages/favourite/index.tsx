import FavouriteCard from "./FavouriteCard";
import FavouriteForm from "./FavouriteForm";

const Favourite = () => {
  const hasSetPreferences = !!localStorage.getItem("preferences");
  // preferences Length
  return (
    <div className="w-full mx-2 sm:mx-0 sm:w-1/4 max-h-screen h-96 mb-4 text-center  rounded-lg p-2 bg-gray-300 shadow-md">
      <p className="text-xl  font-semibold">Favourites</p>
      {hasSetPreferences ? <FavouriteForm /> : null}
      <FavouriteCard />
    </div>
  );
};
export default Favourite;

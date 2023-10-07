import FavouriteCard from "./FavouriteCard";
import FavouriteForm from "./FavouriteForm";

const Favourite = () => {
  const hasSetPreferences = !!localStorage.getItem("preferences");
  // preferences Length
  return (
    // max-h-screen h-96 text-center
    <div className="sm:mx-0 sm:w-1/4">
      <div className="rounded-lg px-2 py-4 bg-gray-300 max-h-max shadow-md">
        <p className="text-xl ml-2 font-semibold">Favourites</p>
        {hasSetPreferences ? <FavouriteForm /> : null}
        <FavouriteCard />
      </div>
    </div>
  );
};
export default Favourite;

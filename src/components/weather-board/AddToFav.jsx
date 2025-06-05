import { useContext, useEffect, useState } from "react";
import HeartImg from "../../assets/heart.svg";
import RedHeartImg from "../../assets/heart-red.svg";
import { FavoriteContext, WeatherContext } from "../../context";

export default function AddToFav() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToFavorites, removeFromFavorites, favorites } =
    useContext(FavoriteContext);
  const { weatherData } = useContext(WeatherContext);
  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    const favLocationExists = favorites.find(
      (fav) => fav.location === location
    );
    if (favLocationExists) {
      setIsFavorite(favLocationExists);
    }
  }, [favorites, location]);

  const handleFavorites = () => {
    const favLocationExists = favorites.find(
      (fav) => fav.location === location
    );
    if (!favLocationExists) {
      addToFavorites(latitude, longitude, location);
    } else {
      removeFromFavorites(location);
    }
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
          onClick={handleFavorites}
        >
          <span>Add to Favorite</span>
          <img src={isFavorite ? RedHeartImg : HeartImg} alt="fav icon" />
        </button>
      </div>
    </div>
  );
}

import { FavoriteContext } from "../context";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addToFavorites = (latitude, longitude, location) => {
    setFavorites([...favorites, { latitude, longitude, location }]);
  };

  const removeFromFavorites = (location) => {
    const restFavorites = favorites.filter(
      (favorite) => favorite.location !== location
    );
    setFavorites(restFavorites);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
export default FavoriteProvider;

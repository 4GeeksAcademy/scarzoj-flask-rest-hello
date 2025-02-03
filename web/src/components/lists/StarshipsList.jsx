import { useEffect, useState } from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { isEmpty } from "lodash";

import { FavoritesContext } from "../../context/Favorites";
import { getStarships } from "../../services/api/starships";

export const Starships = () => {
  const [starships, setstarships] = useState([]);
  const { favorites, addToFavorites, deleteFavorite } =
    useContext(FavoritesContext);

  useEffect(() => {
    getStarships().then((starships) => {
      setstarships(starships);
    });
  }, []);

  const isFavorited = (id, type) => {
    return favorites.some((favorite) => {
      return favorite.id === id && favorite.type === type;
    });
  };

  return (
    <div style={{ border: "solid grey" }}>
      <h1>Starships</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {!isEmpty(starships) &&
          starships.map((starship) => {
            return (
              <div key={starship.uid} style={{ margin: "16px" }}>
                <h3>{starship.name}</h3>
                <NavLink to={`starship/${starship.uid}`}>
                  <Button>View More</Button>
                </NavLink>
                <Button
                  onClick={() => {
                    isFavorited(starship.uid, "starship")
                      ? deleteFavorite(starship.uid, "starship")
                      : addToFavorites(starship.uid, starship.name, "starship");
                  }}
                >
                  {isFavorited(starship.uid, "starship") ? "Unfav" : "Fav"}
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

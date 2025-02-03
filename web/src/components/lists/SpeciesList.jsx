import { useEffect, useState } from "react";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router";
import { isEmpty } from "lodash";

import { FavoritesContext } from "../../context/Favorites";
import { getSpeciesList } from "../../services/api/species";

export const Species = () => {
  const [speciesList, setspeciesList] = useState([]);
  const { favorites, addToFavorites, deleteFavorite } =
    useContext(FavoritesContext);

  useEffect(() => {
    getSpeciesList().then((speciesList) => {
      setspeciesList(speciesList);
    });
  }, []);

  const isFavorited = (id, type) => {
    return favorites.some((favorite) => {
      return favorite.id === id && favorite.type === type;
    });
  };

  return (
    <div style={{ border: "solid grey" }}>
      <h1>Species</h1>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {!isEmpty(speciesList) &&
          speciesList.map((species) => {
            return (
              <div key={species.uid} style={{ margin: "16px" }}>
                <h3>{species.name}</h3>
                <NavLink to={`species/${species.uid}`}>
                  <Button>View More</Button>
                </NavLink>
                <Button
                  onClick={() => {
                    isFavorited(species.uid, "species")
                      ? deleteFavorite(species.uid, "species")
                      : addToFavorites(species.uid, species.name, "species");
                  }}
                >
                  {isFavorited(species.uid, "species") ? "Unfav" : "Fav"}
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Loading } from "../components/Loading";

import { getStarship } from "../services/api/starships";

export const StarshipPage = () => {
  const [starship, setStarship] = useState({});

  const { starshipId } = useParams();

  useEffect(() => {
    getStarship(starshipId).then((starship) => {
      setStarship(starship);
    });
  }, [starshipId]);

  return isEmpty(starship) ? (
    <Loading />
  ) : (
    <>
      {!isEmpty(starship) && (
        <div style={{ justifyItems: "center" }}>
          <h1>{starship.properties.name}</h1>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {starship.properties.manufacturer}
          </div>
        </div>
      )}
    </>
  );
};

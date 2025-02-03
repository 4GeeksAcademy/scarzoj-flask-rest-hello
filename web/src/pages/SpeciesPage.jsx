import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Loading } from "../components/Loading";

import { getSpecies } from "../services/api/species";

export const SpeciesPage = () => {
  const [species, setSpecies] = useState({});

  const { speciesId } = useParams();

  useEffect(() => {
    getSpecies(speciesId).then((species) => {
      setSpecies(species);
    });
  }, [speciesId]);

  return isEmpty(species) ? (
    <Loading />
  ) : (
    <>
      {!isEmpty(species) && (
        <div style={{ justifyItems: "center" }}>
          <h1>{species.properties.name}</h1>
          <div>{species.properties.designation}</div>
        </div>
      )}
    </>
  );
};

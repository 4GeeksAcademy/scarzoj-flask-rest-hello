import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getFilm } from "../services/api/films";
import { Loading } from "../components/Loading";

export const FilmPage = () => {
  const [film, setFilm] = useState({});

  const { filmId } = useParams();

  useEffect(() => {
    getFilm(filmId).then((film) => {
      setFilm(film);
    });
  }, [filmId]);

  return isEmpty(film) ? (
    <Loading />
  ) : (
    <>
      {!isEmpty(film) && (
        <div style={{ justifyItems: "center" }}>
          <h1>{film.properties.title}</h1>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {film.properties.opening_crawl}
          </div>
        </div>
      )}
    </>
  );
};

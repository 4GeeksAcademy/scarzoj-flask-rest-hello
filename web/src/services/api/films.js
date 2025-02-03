import { baseUrl, fetchWrapper, filmsUrl } from "../api";

const filmsEndpoint = `${baseUrl}${filmsUrl}`;

export const getFilms = async () => {
  return await fetchWrapper(filmsEndpoint).then((data) => {
    return data.result;
  });
};

export const getFilm = async (filmId) => {
  return await fetchWrapper(`${filmsEndpoint}${filmId}`).then((data) => {
    return data.result;
  });
};

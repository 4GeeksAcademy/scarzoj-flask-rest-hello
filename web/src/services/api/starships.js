import { baseUrl, fetchWrapper, starshipsUrl } from "../api";

const starshipsEndpoint = `${baseUrl}${starshipsUrl}`;

export const getStarships = async () => {
  return await fetchWrapper(starshipsEndpoint).then((data) => {
    return data.results;
  });
};

export const getStarship = async (starshipId) => {
  return await fetchWrapper(`${starshipsEndpoint}${starshipId}`).then(
    (data) => {
      return data.result;
    },
  );
};

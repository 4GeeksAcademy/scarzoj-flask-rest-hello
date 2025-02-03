import { baseUrl, fetchWrapper, speciesUrl } from "../api";

const speciesEndpoint = `${baseUrl}${speciesUrl}`;

export const getSpeciesList = async () => {
  return await fetchWrapper(speciesEndpoint).then((data) => {
    return data.results;
  });
};

export const getSpecies = async (speciesId) => {
  return await fetchWrapper(`${speciesEndpoint}${speciesId}`).then((data) => {
    return data.result;
  });
};

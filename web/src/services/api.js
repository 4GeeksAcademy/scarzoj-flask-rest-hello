export const baseUrl = "https://www.swapi.tech/api/";

export const filmsUrl = "films/";
export const peopleUrl = "people/";
export const planetsUrl = "planets/";
export const speciesUrl = "species/";
export const starshipsUrl = "starships/";
export const vehiclesUrl = "vehicles/";

export const fetchWrapper = async (input, init) => {
  return await fetch(input, init)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText || response.status);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

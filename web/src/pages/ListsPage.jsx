import { Films } from "../components/lists/FilmList";
import { Species } from "../components/lists/SpeciesList";
import { Starships } from "../components/lists/StarshipsList";

export const ListsPage = () => {
  return (
    <>
      <Films />
      <Species />
      <Starships />
    </>
  );
};

import { ListsPage } from "../../pages/ListsPage";
import { FilmPage } from "../../pages/FilmPage";
import { SpeciesPage } from "../../pages/SpeciesPage";
import { StarshipPage } from "../../pages/StarshipPage";

export const routesConfig = [
  {
    name: "Root",
    path: "/",
    component: <ListsPage />,
  },
  {
    name: "Film",
    path: "/film/:filmId",
    component: <FilmPage />,
  },
  {
    name: "Species",
    path: "/species/:speciesId",
    component: <SpeciesPage />,
  },
  {
    name: "Starship",
    path: "/starship/:starshipId",
    component: <StarshipPage />,
  },
  {
    name: "All",
    path: "*",
    component: <ListsPage />,
  },
];

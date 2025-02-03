import { Routes, Route } from "react-router";

import { NavBar } from "./components/NavBar";
import { routesConfig } from "./services/routes/routesConfig";

export const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {routesConfig.map((route) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              element={route.component}
            />
          );
        })}
      </Routes>
    </>
  );
};

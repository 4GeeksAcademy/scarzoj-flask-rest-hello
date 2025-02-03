import { useContext } from "react";
import { FavoritesContext } from "../context/Favorites";
import { isEmpty } from "lodash";
import { NavLink, useLocation } from "react-router";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const NavBar = () => {
  const { favorites, deleteFavorite } = useContext(FavoritesContext);

  let location = useLocation();

  const parsedLocation = () => {
    const locations = {
      film: "Films",
      species: "Species",
      starship: "Starships",
    };
    return locations[location.pathname.split("/")[1]] || "";
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to={"/"}>
          <Navbar.Brand>SWDB</Navbar.Brand>
        </NavLink>
        <Navbar.Text>{parsedLocation()}</Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isEmpty(favorites) && (
              <NavDropdown title="Favorites" id="basic-nav-dropdown">
                {favorites.map((favorite) => {
                  return (
                    <div key={`${favorite.type}${favorite.id}`}>
                      <NavDropdown.Item>
                        <NavLink to={`${favorite.type}/${favorite.id}`}>
                          {favorite.name}
                        </NavLink>
                        <Badge
                          onClick={() => {
                            deleteFavorite(favorite.id, favorite.type);
                          }}
                        >
                          {" "}
                          X{" "}
                        </Badge>
                      </NavDropdown.Item>
                    </div>
                  );
                })}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

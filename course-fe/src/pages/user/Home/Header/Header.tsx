import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary shadow p-3 mb-5 bg-body rounded"
    >
      <Container>
        {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
        <NavLink to={"/courses"} className="navbar-brand">
          Học dễ thôi
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Form className="d-flex mx-auto w-50">
            <Form.Control
              className="me-3"
              type="search"
              placeholder="Search for courses"
              id="searchInput"
            />
            <Button
              type="submit"
              variant="outline-success"
              aria-controls="searchInput"
            >
              Search
            </Button>
          </Form>
          <nav>
            {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
            </NavDropdown> */}
            <button className="btn-login">Log in</button>
            <button className="btn-signup">Sign in</button>
          </nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

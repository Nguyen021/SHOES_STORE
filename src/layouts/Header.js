import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cookies from "react-cookies";
import { logoutUser } from "../ActionCreators/UserCreator";

function Header() {
  const [category, setCategory] = useState([]);

  const [q, setQ] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadCategory = async () => {
      let response = await Apis.get(endpoints.categories);

      setCategory(response.data);
    };
    loadCategory();
  }, []);

  const search = (eve) => {
    eve.preventDefault();
    navigate(`/?q=${q}`);
  };

  const logout = (eve) => {
    eve.preventDefault();
    cookies.remove("access_token");
    cookies.remove("user");

    dispatch(logoutUser());
  };

  let path = (
    <>
      <Link className="nav-link text-uppercase" to="/login">
        dang nhap
      </Link>
      <Link className="nav-link text-uppercase" to="/register">
        dang ky
      </Link>
    </>
  );
  const handleAvatar = (data) => {
    if (data !== null) {
      data = data.replace("/", "http://127.0.0.1:8000/static/");
      console.log(data);
    } else {
      data = "NONE";
    }
    return data;
  };
  if (user !== null && user !== undefined)
    path = (
      <>
        <Link className="nav-link text-uppercase text-success" to="/">
          {user.username}
        </Link>
        <img
          style={{ width: "45px", height: "45px" }}
          src={handleAvatar(user.avatar)}
          // src={user.avatar}
          className="rounded-circle nav-link"
          alt="Avatar"
          loading="lazy"
        />
        {/* <Link className="nav-link text-success" to="/">
          {user.avatar}
        </Link> */}
        <Link className="nav-link text-uppercase text-success" onClick={logout}>
          dang xuat
        </Link>
      </>
    );

  return (
    <>
      <Navbar bg="light" variant="light" fixed="top" className="navbar-default">
        <Container fluid>
          <Navbar.Brand href="/">SHOES STORE</Navbar.Brand>
          <Navbar.Toggle aria-controls=" responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="nav-link" to="/">
                HOME
              </Link>
              {category.map((cate) => {
                let path1 = `/?category_id=${cate.id}`;
                return (
                  <Link className="nav-link" to={path1}>
                    {cate.ten}
                  </Link>
                );
              })}

              {path}
            </Nav>
            <Form className="d-flex" onSubmit={search}>
              <Form.Control
                type="search"
                placeholder="Nhập tên cần tìm"
                className="me-2"
                aria-label="Search"
                value={q}
                onChange={(eve) => setQ(eve.target.value)}
              />
              <Button type="submit" variant="outline-secondary">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

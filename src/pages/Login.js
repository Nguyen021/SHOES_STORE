import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";

import cookies from "react-cookies";
import "./Login.scss";
import { loginUser } from "../ActionCreators/UserCreator";
const Login = function () {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      let info = await Apis.get(endpoints["oauth2-info"]);

      let res = await Apis.post(endpoints["login"], {
        client_id: info.data.client_id,
        client_secret: info.data.client_secret,
        username: username,
        password: password,
        grant_type: "password",
      });

      cookies.save("access_token", res.data.access_token);

      let user = await Apis.get(endpoints["current-user"], {
        headers: {
          Authorization: `Bearer ${cookies.load("access_token")}`,
        },
      });

      cookies.save("user", user.data);

      dispatch(loginUser(user.data));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container style={{ marginTop: "90px" }}>
      <div className="container">
        <form className="Auth-form" onSubmit={handleLoginSubmit}>
          <div className="content">
            <h3 className="title">Đăng Nhập</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                value={username}
                onChange={(eve) => setUsername(eve.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(eve) => setPassword(eve.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-secondary">
                Đăng Nhập
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};
export default Login;

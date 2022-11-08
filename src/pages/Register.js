import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { icon1 } from "../media/images/icon.PNG";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Apis, { endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastname: "",
    email: "",
  });
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const avatar = useRef();

  const navigate = useNavigate();
  const register = (event) => {
    event.preventDefault();
    let registerUser = async () => {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("avatar", avatar.current.files[0]);

      try {
        let res = await Apis.post(endpoints["register"], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.info("RESPONSER REGISTER", res.data);
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    };
    if (password !== null && password == confirmPassword) {
      registerUser();
    }
  };
  return (
    <>
      <h1 className="text-center text-success" style={{ marginTop: "90px" }}>
        DANG KY NGUOI DUNG{" "}
      </h1>
      <Container style={{ marginTop: "30px" }}>
        <Form onSubmit={register}>
          <RegisterForm
            id="firstName"
            lable="First Name"
            type="text"
            value={firstName}
            change={(event) => setFirstName(event.target.value)}
          />
          <RegisterForm
            id="lastName"
            lable="Last Name"
            type="text"
            value={lastName}
            change={(event) => setLastName(event.target.value)}
          />
          <RegisterForm
            id="email"
            lable="Email"
            type="email"
            value={email}
            change={(event) => setEmail(event.target.value)}
          />
          <RegisterForm
            id="username"
            lable="Username"
            type="text"
            value={username}
            change={(event) => setUsername(event.target.value)}
          />
          <RegisterForm
            id="password"
            lable="Password"
            type="password"
            value={password}
            change={(event) => setPassword(event.target.value)}
          />
          <RegisterForm
            id="confirmPassword"
            lable="Confirm Password"
            type="password"
            value={confirmPassword}
            change={(event) => setConfirmPassword(event.target.value)}
          />

          <Form.Group className="mb-3" controlId="avartar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" ref={avatar} />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button
            variant="secondary"
            type="submit"
            // className="btn btn-secondary"
          >
            Đăng Ký
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default Register;

const RegisterForm = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.id}>
      <Form.Label>{props.lable}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={`Enter ${props.lable}`}
        value={props.value}
        onChange={props.change}
      />
      {/* <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text> */}
    </Form.Group>
  );
};

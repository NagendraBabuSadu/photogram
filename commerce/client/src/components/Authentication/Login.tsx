import * as React from "react";
import type { UserLogin } from "../../types";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/useAuthContext";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToUser } from "../../redux/features/userSlice";
import type { RootState } from "../../redux/app/store";

interface ILoginProps {}

const initialValue: UserLogin = {
  email: "",
  password: "",
};

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [userLoginInfo, setUserLoginInfo] =
    React.useState<UserLogin>(initialValue);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userReducer);

  const { login } = useUserAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = login(userLoginInfo.email, userLoginInfo.password!);
      dispatch(
        addToUser({
          email: userLoginInfo.email,
          displayName: "",
          occupation: "",
          photoUrl: "",
          user: undefined,
        })
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center container-lg"
        style={{ height: "100vh" }}
      >
        <Container
          className="p-4 rounded"
          style={{
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 0 10px",
          }}
        >
          <Card.Body>
            <h3 className="text-center mb-2 ">Login to Mozoto</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={userLoginInfo.email}
                  onChange={(e) =>
                    setUserLoginInfo({
                      ...userLoginInfo,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={userLoginInfo.password}
                  onChange={(e) =>
                    setUserLoginInfo({
                      ...userLoginInfo,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-2">
                LOGIN
              </Button>
            </Form>
          </Card.Body>
        </Container>
      </Container>
    </>
  );
};

export default Login;

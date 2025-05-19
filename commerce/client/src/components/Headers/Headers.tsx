import * as React from "react"; background-colo
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./HeadersStyle.css";
import { useUserAuth } from "../../context/useAuthContext";
import loginIcon from "../../assets/login.gif";
import logoutIcon from "../../assets/logout.gif";
import ButtonTheme from "../ButtonTheme";
import cartIcon from "../../assets/cart.gif";

interface IHeadersProps {}

const Headers: React.FunctionComponent<IHeadersProps> = (props) => {
  interface ICartItem {
    id: number;
    dish: string;
    imgdata: string;
    address: string;
    delimg: string;
    somedata: string;
    price: number;
    rating: string;
    arrimg: string;
    qnty: number;
  }

  const { carts }: any = useSelector((state: any) => state.allCart);

  console.log("allCart", carts);

  const totalItems = (carts as ICartItem[]).reduce(
    (total, item) => total + item.qnty,
    0
  );

  const { logout, login, user } = useUserAuth();
  const [scrolled, setScrolled] = React.useState(false);
  const isLoginSuccess = !!user;
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar
        className={`custom-navbar ${
          scrolled ? "scrolled" : ""
        } justify-baseline`}
        expand="lg"
      >
        <Container className="">
          <div>
            <NavLink to="/" className="text-decoration-none ">
              <h3 style={{ color: "red" }}>Mozoto</h3>
            </NavLink>
          </div>
          <div className="d-flex" style={{ gap: "20px" }}>
            <NavLink to="/cart">
              <div id="ex4">
                <span
                  className="p1 fa-stack has-badge fa-2x"
                  data-count={totalItems}
                >
                  <img
                    src={cartIcon}
                    alt=""
                    width={40}
                    height={40}
                    style={{
                      filter: "none", 
                      mixBlendMode: "normal",
                    }}
                  />
                </span>
              </div>
            </NavLink>

            {!isLoginSuccess ? (
              <>
                <NavLink to="/login">
                  <div id="ex4" className="mt-2 p-2">
                    <button className="btn btn-primary" onClick={() => login}>
                      Login
                      <img
                        src={loginIcon}
                        alt="loginIcon"
                        style={{
                          filter: "brightness(1) invert(1)",
                          mixBlendMode: "screen",
                          width: "20px",
                        }}
                      />
                    </button>
                  </div>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/user-profile">
                  <div id="ex4">
                    <span className="p1 fa-stack has-badge fa-2x ">
                      <i
                        className="fa fa-user"
                        style={{
                          color: hover ? "red" : "purple",
                          transition: "color: 0.3s",
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      ></i>
                    </span>
                  </div>
                </NavLink>
                <NavLink to="/logout">
                  <div id="ex4" className="mt-2 p-2">
                    <button
                      className="btn btn-danger"
                      onClick={logout}
                      style={{
                        backgroundColor: "red",
                        borderColor: "red",
                      }}
                    >
                      Logout
                      <img
                        src={logoutIcon}
                        alt="logoutIcon"
                        style={{
                          filter: "brightness(1) invert(1)",
                          mixBlendMode: "screen",
                          width: "20px",
                          marginLeft: "8px",
                        }}
                      />
                    </button>
                  </div>
                </NavLink>
              </>
            )}
            <ButtonTheme></ButtonTheme>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Headers;

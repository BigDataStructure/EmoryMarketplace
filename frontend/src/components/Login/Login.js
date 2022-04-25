import React, { useContext, useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom/node_modules/react-router";
// import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const [password, setePassword] = useState("");

  const handleSubmit = (e) => {
    // console.log(email);
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);

    navigate(`/login2`, { replace: true });
  };

  return (
    <div className="login-wrapper">
      <div className="row login-background d-flex align-items-center">
        <div className="logo-wrapper">
          <img
            src="https://coursera-university-assets.s3.amazonaws.com/f8/5c185343dfb525fda5abae3e7216df/emory_square_coursera.png"
            className="rounded"
            alt="..."
            style={{ maxWidth: "5rem" }}
          />
          <h1>Emory Exchange</h1>
        </div>

        <div className="fbody">
          <form id="Login" onSubmit={handleSubmit}>
            {/*<h1 className="login-wrapper">Logo</h1>*/}
            <h4 className="m-1">
              <i className="fas fa-user m-2"></i>Emory Email
            </h4>
            <input
              className="rounded-pill custom-input mb-2"
              type="email"
              pattern=".+emory\.edu"
              size="25"
              placeholder="Enter your Emory Email"
              // ref={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <h4 className="m-2">
              <i className="fa-solid fa-lock m-2"></i>Password
            </h4>
            <input
              className="rounded-pill custom-input mb-2"
              type="password"
              size="25"
              placeholder="Enter your password"
              // ref={password}
              onChange={(e) => setePassword(e.target.value)}
            ></input>
            <br></br>
            <Link className="m-2" to="/login/forgotPassword">
              Forgot Password?
            </Link>
            <br></br>
            <div className="m-2">
              <Button
                className="rounded-pill custom-btn m-2"
                type="submit"
                form="Login"
                disabled={isFetching}
              >
                Login
                {/* {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Log In"
                )} */}
              </Button>
            </div>
            <p className="separator">or</p>
            <div className="mid">
              <LinkContainer to="/signup">
                <Button className="rounded-pill custom-btn m-2">Sign Up</Button>
              </LinkContainer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

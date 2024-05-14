import React from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import image from "../../assets/blogzz.png";
import { useState, useContext } from "react";
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";



const Component = styled(Box)`
  width: 600px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled(`img`)({
  width: "100px",
  margin: "auto",
  display: "flex",
  padding: "50px 0 0"
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 gray;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0;
`;

const Text = styled(Typography)`
  color: "#878787";
  font-size: 14px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: ""
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: ""
};

const Login = ({ setIsAuthenticated }) => {
  const [account, setAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  // importing values from context
  const { setAccounts } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    setAccount(account === "signup" ? "login" : "signup");
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const signupUser = async () => {
    try {
      const response = await API.userSignup(signup);
      if (response && response.isSuccess) {
        setError("");
        setSignup(signupInitialValues);
        setAccount("login");
      } else {
        setError("Something went wrong!!");
      }
    } catch (error) {
      setError("Something went wrong!! Please try again ");
    }
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // const loginUser = async () => {
  //   try {
  //     const response = await API.userLogin(login);
  //     console.log("Login Resposne : " ,response);
  //     if (response && response.isSuccess) {
  //       setError("");
  //       console.log("Access Token:", response.data.accessToken);
  //       console.log("Refresh Token:", response.data.refreshToken);
  //       sessionStorage.setItem(
  //         "accessToken",
  //         `Bearer ${response.data.accessToken}`
  //       );
  //       sessionStorage.setItem(
  //         "refreshToken",
  //         `Bearer ${response.data.refreshToken}`
  //       );
  //       setAccounts({
  //         username: response.data.username,
  //         name: response.data.name
  //       });
  //       setIsAuthenticated(true);
  //       setLogin(loginInitialValues);
  //       navigate("/");
  //     } else {
  //       setError("Something went wrong!!");
  //     }
  //   } catch (error) {
  //     setError("Something went wrong!! Please try again ");
  //   }
  // };
  const loginUser = async () => {
    try {
        const response = await API.userLogin(login);
        console.log("Login Response:", response);
        if (response && response.isSuccess) {
            const accessToken = response.data.data.accessToken;
            console.log("Access Token:", accessToken);
            if (!accessToken) {
                console.error("Access Token is missing in the response.");
                return;
            }
            sessionStorage.setItem("accessToken", `Bearer ${accessToken}`);
            setAccounts({
                username: response.data.username,
                name: response.data.name
            });
            setIsAuthenticated(true);
            setLogin(loginInitialValues);
            navigate("/");
        } else {
            setError("Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Login error:", error);
        setError("Something went wrong. Please try again.");
    }
};



  // const loginUser = async () => {
  //   try {
  //     const response = await API.userLogin(login);
  //     if (response && response.isSuccess) {
  //       setError("");
  //       sessionStorage.setItem(
  //         "accessToken",
  //         `Bearer ${response.data.accessToken}`
  //       );
  //       sessionStorage.setItem(
  //         "refreshToken",
  //         `Bearer ${response.data.refreshToken}`
  //       );
  //       setAccounts({
  //         username: response.data.username,
  //         name: response.data.name
  //       });
  //       setIsAuthenticated(true);
  //       setLogin(loginInitialValues);
  //       // Navigate to Home screen if authenticated
  //       navigate("/");
  //     } else {
  //       setError("Something went wrong!!");
  //     }
  //   } catch (error) {
  //     setError("Something went wrong!! Please try again ");
  //   }
  // };



  return (
    <>
      <h1
        style={{
          textAlign: "center",
          textShadow: "0 8px 8px rgba(0, 0, 0, 0.4)"
        }}
      >
        Hello Bloggers !!👋🏻
      </h1>
      <Component>
        <Box>
          <Image src={image} alt="blogzz" />
          {account === "login" ? (
            <Wrapper>
              <TextField
                onChange={(e) => onValueChange(e)}
                label="Username"
                name="username"
                variant="standard"
                value={login.username}
              />
              <TextField
                onChange={(e) => onValueChange(e)}
                label="Password"
                name="password"
                type="password"
                variant="standard"
                value={login.password}
              />
              {error && <Error>{error}</Error>}
              <LoginButton
                variant="contained"
                onClick={() => loginUser()}
              >
                Login
              </LoginButton>
              <Text style={{ textAlign: "center" }}>
                {" "}
                Don't have an Account?{" "}
              </Text>
              <SignupButton onClick={() => toggleSignup()}>
                Create an Account
              </SignupButton>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                label="First Name"
                name="firstname"
                variant="standard"
                onChange={(e) => onInputChange(e)}
                value={signup.firstname}
              />
              <TextField
                label="Last Name"
                name="lastname"
                variant="standard"
                onChange={(e) => onInputChange(e)}
                value={signup.lastname}
              />
              <TextField
                label="Username"
                name="username"
                variant="standard"
                onChange={(e) => onInputChange(e)}
                value={signup.username}
              />
              <TextField
                label="Password"
                name="password"
                variant="standard"
                onChange={(e) => onInputChange(e)}
                value={signup.password}
              />
              {error && <Error>{error}</Error>}
              <SignupButton variant="contained" onClick={() => signupUser()}>
                SignUp
              </SignupButton>
              <Text style={{ textAlign: "center" }}>
                {" "}
                Already have an Account?{" "}
              </Text>
              <LoginButton onClick={() => toggleSignup()}>Login</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </>
  );
};

export default Login;
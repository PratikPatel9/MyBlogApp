import React from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";


const Component = styled(AppBar)`
  color: #ffffff;
  box-shadow: 0px 8px 8px 0 #000;
`;

const Container = styled(Toolbar)`
  color: #ffffff;
  justify-content: center;
  & > a {
    padding: 25px;
    text-decoration : none;
    color: white;
   
  }
`;

const Header = () => {
  return (
    <Component>
      <Container>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/login">LOGOUT</Link>
      </Container>
    </Component>
  );
};

export default Header;

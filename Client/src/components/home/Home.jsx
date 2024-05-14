import React from "react";
import Banner from "../banner/Banner.jsx";
import Categories from "./Categories.jsx";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        {/* setting grids  like, i need 2 block for large screen, 2 block for small screen and 12 bols for extra small screen  */}
        <Grid item lg={2} sm={12} xs={12}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          Posts
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

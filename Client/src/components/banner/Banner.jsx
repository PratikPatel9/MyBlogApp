import React from "react";
import { Box, Typography, styled } from "@mui/material";

// const Image = styled(Box)`
//   background: url(https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=800)
//     center/65% repeat-x #000;
//   width: 100%;
//   height: 50vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   background-size: cover;
// `;
const Image = styled(Box)`
  background: url(https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=800)
    center/cover no-repeat #000;
  width: 100%; /* Set width to fill container */
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Heading = styled(Typography)`
  font-size: 70px;
  color: #ffffff;
  line-height: 1
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: rgba(255, 255, 255, 0.5);
`;

const Banner = () => {
  return (
    <Image>
      <Heading>BLOGZZ</Heading>
      <SubHeading>
        Travel More, Worry Less: Making Memories That Last a Lifetime
      </SubHeading>
    </Image>
  );
};

export default Banner;




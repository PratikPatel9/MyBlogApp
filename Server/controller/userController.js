// // import UserModel from "../models/User.js";
// import UserModel from "../models/user.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import Token from "../models/token.js";

// dotenv.config();
// export const signupUser = async (request, response) => {
//   try {
//     // const salt = await bcrypt.generateSalt();
//     const hashedPassword = await bcrypt.hash(request.body.password, 10);
//     // const user = request.body;
//     const { firstname, lastname, username, password } = request.body;

//     // Check if all required fields are provided
//     if (!firstname || !lastname || !username || !password) {
//       return response.status(400).json({ error: "All fields are required" });
//     }

//     // Create a new user instance
//     const newUser = new UserModel({
//       firstname,
//       lastname,
//       username,
//       password: hashedPassword
//     });

//     // const newUser = new UserModel(user);
//     await newUser.save();

//     return response
//       .status(200)
//       .json({ message: "Signup Successful from Backend!!" });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     response.status(500).json({ message: "Error while signing up user" });
//   }
// };

// export const loginUser = async (request, response) => {
//   let user = await UserModel.findOne({ username: request.body.username });

//   if (!user) {
//     return response.status(400).json({ message: "Username does not match" });
//   }
//   try {
//     let match = await bcrypt.compare(request.body.password, user.password);
//     // if password matched than i need to generate a tokens like accessToken and refreshToken using jwt
//     if (match) {
//       //accessToken generate using access keys from .env that will expire in 15 min
//       const accessToken = jwt.sign(
//         user.toJSON(),
//         process.env.ACCESS_SECRET_KEY,
//         { expiresIn: "15m" }
//       );
//       //refresh generate using access keys from .env
//       const refreshToken = jwt.sign(
//         user.toJSON(),
//         process.env.REFRESH_SECRET_KEY
//       );
//       // now i need to store my refresh token in variable in Token Schema db.
//       //  i dont need to store my accesstoken anywhere because it will expire in 15 min anyway, so i created new varibale where i am storing my token (newToken)

//       const newToken = new Token({ token: refreshToken });
//       await newToken.save();
//       response.status(200).json({
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//         name: user.name,
//         username: user.username
//       });
//     } else {
//       return response.status(400).json({ message: "Password does not match" });
//     }
//   } catch (error) {
//     response.status(500).json({ message: "Error while Login in user" });
//   }
// };


// import UserModel from "../models/user.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import Token from "../models/token.js";

// dotenv.config();

// export const signupUser = async (request, response) => {
//   try {
//     const { firstname, lastname, username, password } = request.body;

//     if (!firstname || !lastname || !username || !password) {
//       return response.status(400).json({ error: "All fields are required" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new UserModel({
//       firstname,
//       lastname,
//       username,
//       password: hashedPassword
//     });

//     await newUser.save();

//     return response
//       .status(200)
//       .json({ message: "Signup Successful from Backend!!" });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     response.status(500).json({ message: "Error while signing up user" });
//   }
// };

// export const loginUser = async (request, response) => {
//   try {
//     const { username, password } = request.body;
//     const user = await UserModel.findOne({ username });

//     if (!user) {
//       return response.status(400).json({ message: "Username does not exist" });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return response.status(400).json({ message: "Password does not match" });
//     }

//     const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {
//       expiresIn: "15m"
//     });

//     const refreshToken = jwt.sign(
//       user.toJSON(),
//       process.env.REFRESH_SECRET_KEY
//     );

//     const newToken = new Token({ token: refreshToken });
//     await newToken.save();

//     response.status(200).json({
//       accessToken,
//       refreshToken,
//       name: user.name,
//       username: user.username
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     response.status(500).json({ message: "Error while logging in user" });
//   }
// };



import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const { firstname, lastname, username, password } = request.body;

    if (!firstname || !lastname || !username || !password) {
      return response.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return response.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstname,
      lastname,
      username,
      password: hashedPassword
    });

    await newUser.save();

    // Return a response with a status code of 200 and the message or data
    return response
      .status(200)
      .json({
        message: "Signup Successful",
        data: { firstname, lastname, username }
      });
  } catch (error) {
    console.error("Error during signup:", error);
    return response
      .status(500)
      .json({ message: "Error while signing up user" });
  }
};

export const loginUser = async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "15m"
      }
    );
    // console.log(accessToken);
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET_KEY
    );
    // console.log(refreshToken);

    const newToken = new Token({ token: refreshToken });
    await newToken.save();

    // Return a response with a status code of 200 and the necessary data
    return response
      .status(200)
      .json({ message: "Login Successful", data: { username, accessToken } });
    // return response.status(200).json({
    //   accessToken,
    //   refreshToken,
    //   firstname: `${user.firstname}`,
    //   lastname : `${user.lastname}`,
    //   username: user.username
    // });
  } catch (error) {
    console.error("Error during login:", error);
    return response
      .status(500)
      .json({ message: "Error while logging in user" });
  }
};


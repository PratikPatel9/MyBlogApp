import mongoose from 'mongoose';
import chalk from "chalk";

const Connection = async (username, password) => {
  // const URL = `mongodb+srv://${username}:${password}@blogsz.ts2fnk7.mongodb.net/?retryWrites=true&w=majority&appName=blogsz`;
  const URL = `mongodb+srv://${username}:${password}@blogzzmern.ts2fnk7.mongodb.net/?retryWrites=true&w=majority&appName=blogsz`;
  try {
    await mongoose.connect(URL);
    console.log(chalk.green("Mongoose Connection successful !!"));
  } catch (error) {
    console.log(chalk.red("Your MongoDB connection FAILED : ", error));
  }
};

export default Connection;

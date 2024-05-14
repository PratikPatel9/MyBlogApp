// // need to import ,ulter gridfs storage to store the image to mongodb

// import { GridFsStorage } from "multer-gridfs-storage";
// import multer from "multer";
// import dotenv from "dotenv";

// // initialize dotenv file to get env file data
// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//   // i need to pass MongoDB url as object so it has to be in key-value pair
//   url: `mongodb+srv://${username}:${password}@blogzzmern.ts2fnk7.mongodb.net/?retryWrites=true&w=majority&appName=blogzzMERN`,
//   //   options: { useNewUrlParser: true },
//   //   to upload image awith validations that i want only .jpg or .png formatted file
//   file: (request, file) => {
//     const match = ["image/png", "image/jpg"];

//     // i used here ' -1' because in array if i have any image in array then it will send index numbers like 0, 1 ...
//     // but here if i dont have any image then it should be -1
//     if (match.indexOf(file.memetype) === -1) {
//       return `${Date.now()}-blog-${file.originalname}`; //setting up validation that image should not allow file to upload duplicate so i am concatinatinf with date with milisec to original file name
//     }
//     // if it matches then i am storing
//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-blog-${file.originalname}`
//     };
//   }
// });

// // to upload image to storage i need to use multer.
// export default multer({ storage });

// import { GridFsStorage } from "multer-gridfs-storage";
// import multer from "multer";
// import dotenv from "dotenv";

// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;


// const storage = new GridFsStorage({
//   url: `mongodb+srv://${username}:${password}@blogzzmern.ts2fnk7.mongodb.net/?retryWrites=true&w=majority&appName=blogzzMERN`,
//   //options: { useNewUrlParser: true }, // Uncomment and provide desired options
//   file: (request, file) => {
//     const match = ["image/png", "image/jpeg"]; // Updated to "image/jpeg"

//     if (match.indexOf(file.mimetype) === -1) {
//       return `${Date.now()}-blog-${file.originalname}`;
//     }

//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-blog-${file.originalname}`
//     };
//   }
// });

// export default multer({ storage });

// import { GridFsStorage } from "multer-gridfs-storage";
// import multer from "multer";
// import dotenv from "dotenv";

// dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

// // Check if environment variables are set
// if (!username || !password) {
//   console.error(
//     "DB_USERNAME or DB_PASSWORD environment variables are not set."
//   );
//   process.exit(1); // Exit the application if environment variables are missing
// }

// const storage = new GridFsStorage({
//   // url: `mongodb+srv://${username}:${password}@blogzzmern.ts2fnk7.mongodb.net/?retryWrites=true&w=majority&appName=blogzzMERN`,
//   url: `mongodb+srv://${username}:${password}@blogzzmern.ts2fnk7.mongodb.net/blogzzmern?retryWrites=true&w=majority`,

//   // importnat functionality for upload images
//   file: (request, file) => {
//     const match = ["image/png", "image/jpeg", "image/jpg"]; 
//     // console.log(match);

//     if (match.indexOf(file.mimetype) === -1) {
//       return `${Date.now()}-blog-${file.originalname}`;
//     }

//     return {
//       bucketName: "photos",
//       filename: `${Date.now()}-blog-${file.originalname}`
//     };
//   }
// });

// const upload = multer({ storage });

// export default upload;



// latest
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Check if environment variables are set
if (!username || !password) {
  console.error(
    "DB_USERNAME or DB_PASSWORD environment variables are not set."
  );
  process.exit(1); // Exit the application if environment variables are missing
}

const storage = new GridFsStorage({
   url: `mongodb+srv://${username}:${password}@blogzzmern.ts2fnk7.mongodb.net/blogzzmern?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpg"];

        if(match.indexOf(file.mimetype) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 

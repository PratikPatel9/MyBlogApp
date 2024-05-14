import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:3001";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadImage = (request, response) => {
  if (!request.file) return response.status(404).json("File not found");

  const imageUrl = `${url}/file/${request.file.filename}`;

  response.status(200).json(imageUrl);
};


// export const getImage = async (request, response) => {
//   try {
//     const file = await gfs.files.findOne({ filename: request.params.filename });
//     // const readStream = gfs.createReadStream(file.filename);
//     // readStream.pipe(response);
//     const readStream = gridfsBucket.openDownloadStream(file._id);
//     readStream.pipe(response);
//   } catch (error) {
//     response.status(500).json({ msg: error.message });
//   }
// };

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    if (!file) {
      return response.status(404).json({ msg: "File not found" });
    }
    // const readStream = gfs.createReadStream(file.filename);
    // readStream.pipe(response);

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};







// export const getImage = async (request, response) => {
//   try {
//     const file = await gfs.files.findOne({ filename: request.params.filename });
//     console.log("Requested Filename:", request.params.filename);
//     console.log(file);
//     if (!file || !file._id) {
//       return response.status(404).json({ msg: "File not found" });
//     }

//     // const readStream = gfs.createReadStream(file.filename);
//     // readStream.pipe(response);

//     const readStream = gridfsBucket.openDownloadStream(file._id);
//     console.log(readStream);
//     readStream.pipe(response);
//     console.log(readStream.pipe.response);
//   } catch (error) {
//     response.status(500).json({ msg: error.message });
//   }
// };

// import grid from "gridfs-stream";
// import mongoose from "mongoose";

// const conn = mongoose.connection;
// let gfs, gridfsBucket;
// conn.once("open", () => {
//   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "fs"
//   });
//   gfs = grid(conn.db, mongoose.mongo);
//   gfs.collection("fs");
// });

// // A url where server is running
// const url = "http://localhost:3001";

// export const uploadImage = (request, response) => {
//   // if request file is not present then i am sending response with status 404 with message
//   if (!request.file) {
//     return response.status(404).json({ message: "File not found!" });
//   }
//   //   if files present in database then it should be uploaded and need to use that url of file that i need to return with proper filename
//   const imageUrl = `${url}/file/${request.file.filename}`;
//   response.status(200).json(imageUrl);
// };

// // Image API t get Images from MongoDb Database that I have uploaded above method but i need to import "npm i gridfs-stream"
// export const getImage = async (request, response) => {
//   try {
//     const file = await gfs.files.findOne({ filename: request.params.filename });
//     const readStream = gridfsBucket.openDownloadStream(file._id);
//     readStream.pipe(response);
//   } catch (error) {
//     return response.status(500).json({ message: error.message });
//   }
// };

//

// export default uploadImage;

// // A url where server is running
// const url = "http://localhost:3001";

//  export const uploadImage = (request, response) => {
//   if (!request.file) {
//     return response.status(404).json({ message: "File not found!" });
//   }
//   const imageUrl = `${url}/file/${request.file.filename}`;
//   console.log("Uploaded image : ", imageUrl );
//   response.status(200).json(imageUrl);

// };

// import grid from "gridfs-stream";
// import mongoose from "mongoose";

// const conn = mongoose.connection;
// let gfs, gridfsBucket;
// conn.once("open", () => {
//   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "fs"
//   });
//   gfs = grid(conn.db, mongoose.mongo);
//   gfs.collection("fs");
// });

// // A url where server is running
// const url = "http://localhost:3001";

// export const uploadImage = (request, response) => {
//   // if request file is not present then i am sending response with status 404 with message
//   if (!request.file) {
//     return response.status(404).json({ message: "File not found!" });
//   }
//   //   if files present in database then it should be uploaded and need to use that url of file that i need to return with proper filename
//   const imageUrl = `${url}/file/${request.file.filename}`;
//   response.status(200).json(imageUrl);
// };

// // Image API t get Images from MongoDb Database that I have uploaded above method but i need to import "npm i gridfs-stream"
// export const getImage = async (request, response) => {
//   try {
//     const file = await gfs.files.findOne({ filename: request.params.filename });
//     const readStream = gridfsBucket.openDownloadStream(file._id);
//     readStream.pipe(response);
//   } catch (error) {
//     return response.status(500).json({ message: error.message });
//   }
// };

//

// export default uploadImage;

// // A url where server is running
// const url = "http://localhost:3001";

//  export const uploadImage = (request, response) => {
//   if (!request.file) {
//     return response.status(404).json({ message: "File not found!" });
//   }
//   const imageUrl = `${url}/file/${request.file.filename}`;
//   console.log("Uploaded image : ", imageUrl );
//   response.status(200).json(imageUrl);

// };

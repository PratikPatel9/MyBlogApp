// import React, { useState, useEffect, useContext } from "react";
// import {
//   Box,
//   FormControl,
//   styled,
//   InputBase,
//   Button,
//   TextareaAutosize
// } from "@mui/material";
// import { AddCircle as Add } from "@mui/icons-material";
// import { useLocation } from "react-router-dom";
// import { DataContext } from "../../context/DataProvider";
// import { API } from "../../service/api";

// const Container = styled(Box)`
//   margin: 60px 100px;
// `;

// const Image = styled("img")({
//   width: "100%",
//   height: "50vh",
//   objectFit: "cover"
// });

// const StyledFormControl = styled(FormControl)`
//   margin-top: 10px;
//   display: flex;
//   flex-direction: row;
// `;

// const InputTextField = styled(InputBase)`
//   flex: 1;
//   margin: 0 30px;
//   font-size: 25px;
// `;

// const Textarea = styled(TextareaAutosize)`
//   width: 100%;
//   font-size: 18px;
//   margin-top: 50px;
//   border: none;
//   &:focus-visible {
//     outline: none;
//   }
// `;

// const initialPostObject = {
//   title: "",
//   description: "",
//   picture: "",
//   username: "",
//   categories: "",
//   createdDate: new Date()
// };

// const CreatePost = () => {
//   const [post, setPost] = useState(initialPostObject);
//   const [file, setFile] = useState("");
//   const { accounts } = useContext(DataContext);
//   const location = useLocation();
//   const url =
//     post.picture ||
//     "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=800";

//  const handleChange = (e) => {
//    setPost({ ...post, [e.target.name]: e.target.value });
//  };

//   useEffect(() => {
//     const getImage = async () => {
//       if (file) {
//         try {
//           const data = new FormData();
//           // data.append("name", file.name);
//           data.append("file", file);

//           const response = await API.uploadFile(data);
//           // setPost({ ...post, picture: response.data });
//           setPost((prevPost) => ({ ...prevPost, picture: response.data }));
//         } catch (error) {
//           console.error("Error uploading file:", error);
//         }
//       }
//     };
//     getImage();
//     // setPost({
//     //   ...post,
//     //   categories: location.search?.split("=")[1] || "All",
//     //   username: accounts.username
//     // });
//     setPost((prevPost) => ({
//       ...prevPost,
//       categories: location.search?.split("=")[1] || "All",
//       username: accounts.username
//     }));
//   }, [file, location, accounts]);

//   // const handlePublish = async () => {
//   //   try {
//   //     // Send post data to API for publishing
//   //     console.log("Post data:", post);
//   //     // Reset post state after publishing
//   //     setPost(initialPostObject);
//   //   } catch (error) {
//   //     console.error("Error publishing post:", error);
//   //   }
//   // };

//   return (
//     <Container>
//       <Image src={url} alt="banner" />
//       <StyledFormControl>
//         <label htmlFor="fileInput">
//           <Add fontSize="large" color="action" />
//         </label>
//         <input
//           type="file"
//           id="fileInput"
//           style={{ display: "none" }}
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <InputTextField
//           placeholder="Title"
//           onChange={(e) => handleChange(e)}
//           name="title"
//           value={post.title}
//         />
//         <Button variant="contained" >
//           Publish
//         </Button>
//       </StyledFormControl>
//       <Textarea
//         minRows={5}
//         placeholder="Tell Your Stories .... "
//         onChange={(e) => handleChange(e)}
//         name="description"
//         value={post.description}
//       />
//     </Container>
//   );
// };

// export default CreatePost;

// import React from "react";
// import { useState, useEffect, useContext } from "react";
// import {
//   Box,
//   FormControl,
//   styled,
//   InputBase,
//   Button,
//   TextareaAutosize
// } from "@mui/material";
// import { AddCircle as Add } from "@mui/icons-material";
// import { useLocation } from "react-router-dom"; //its same like useParams()
// import { DataContext } from "../../context/DataProvider";
// import { API } from "../../service/api";

// const Container = styled(Box)`
//   margin: 60px 100px;
// `;

// const Image = styled("img")({
//   width: "100%",
//   height: "50vh",
//   objectFit: "cover"
// });

// const StyledFormControl = styled(FormControl)`
//   margin-top: 10px;
//   display: flex;
//   flex-direction: row;
// `;

// const InputTextField = styled(InputBase)`
//   flex: 1;
//   margin: 0 30px;
//   font-size: 25px;
// `;

// const Textarea = styled(TextareaAutosize)`
//   width: 100%;
//   font-size: 18px;
//   margin-top: 50px;
//   border: none;
//   &: focus-visible {
//     outline: none;
//   }
// `;

// const initialPostObject = {
//   title: "",
//   description: "",
//   picture: "",
//   username: "",
//   categories: "",
//   createdDate: new Date()
// };

// const CreatePost = () => {
//   const [post, setPost] = useState(initialPostObject);
//   const [file, setFile] = useState("");
//   const { accounts } = useContext(DataContext);
//   //   const navigate = useNavigate();
//   const location = useLocation();
//   const url = post.picture
//     ? post.picture
//     : "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=800";

//   const handleChange = (e) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     const getImage = async () => {
//       if (file) {
//         const data = new FormData();
//         data.append("name", file.name);
//         data.append("file", file);

//         const response = await API.uploadFile(data);
//         post.picture = response.data;
//       }
//     };
//     getImage();
//     post.categories = location.search?.split("=")[1] || "All";
//     post.username = accounts.username;
//   }, [file]);

//   return (
//     <div>
//       <Container>
//         <Image src={url} alt="banner" />
//         <StyledFormControl>
//           <label htmlFor="fileInput">
//             <Add fontSize="large" color="action" />
//           </label>
//           <input
//             type="file"
//             id="fileInput"
//             style={{ display: "none" }}
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <InputTextField
//             placeholder="Title"
//             onChange={(e) => handleChange(e)}
//             name="title"
//             value={post.title}
//           />
//           <Button variant="contained">Publish</Button>
//         </StyledFormControl>
//         <Textarea
//           minRows={5}
//           placeholder="Tell Your Stories .... "
//           onChange={(e) => handleChange(e)}
//           name="description"
//           value={post.description}
//         />
//       </Container>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  styled,
  InputBase,
  Button,
  TextareaAutosize
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)`
  margin: 60px 100px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover"
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 18px;
  margin-top: 50px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const initialPostObject = {
  title: "",
  description: "",
  picture: null,
  username: "",
  categories: "",
  createdDate: new Date()
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPostObject);
  const [file, setFile] = useState(""); // Change initial state to null
  const { accounts } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const url =
    post.picture ||
    "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=800";

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("file", file);
        const response = await API.uploadFile(data);
        setPost({ ...post, picture: response.data });
      }
    };
    getImage();
    setPost((prevPost) => ({
      ...prevPost,
      categories: location.search?.split("=")[1] || "All",
      username: accounts.username
    }));
  }, [file]);

  const savePost = async () => {
    const response = await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
    }
  };
//  onChange={(e) => setFile(e.target.files[0])}
  return (
    <Container>
      <Image src={url} alt="banner" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
         
        />
        <InputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
          value={post.title}
        />
        <Button variant="contained" onClick={() => savePost()}>
          Publish
        </Button>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Tell Your Stories .... "
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

export default CreatePost;




// useEffect(() => {
  //   const getImage = async () => {
  //     if (file) {
  //       const data = new FormData();
  //       console.log(data);
  //       data.append("name", file.name);
  //       data.append("file", file);
  //       const response = await API.uploadFile(data);
  //       console.log(" Lets check which file response we get : ", response);
  //       //  setPost({ ...post, picture: response.data });
  //       // post.picture = response.data;
  //       setPost((prevPost) => ({
  //         ...prevPost,
  //         picture: response.data
  //       }));
  //     }
  //   };
  //   getImage();
  //   // below logic indicates that i am trying to get an array of categories after = sign
  //   post.categories = location.search?.split("=")[1] || "All";
  //   post.username = accounts.username;
  // }, [file]);

  // const handlePublish = async () => {
  //   try {
  //     console.log("Post data:", post);
  //     // You should send 'post' data to the server for publishing here
  //     // Reset post state after publishing
  //     setPost(initialPostObject);
  //   } catch (error) {
  //     console.error("Error publishing post:", error);
  //   }
  // }
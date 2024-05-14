import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { AddCircle as Add } from "@mui/icons-material";

const Container = styled(Box)`
  margin: 50px 100px;
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
// this is my initial Post how post look like and submit as form
const initialPost = {
  title: "",
  description: "",
  picture: null,
  username: "",
  categories: "",
  createdDate: new Date()
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { accounts } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=800";
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        console.log(data);

        // API Call
        const response = await API.uploadFile(data);
        post.picture = response.data;
        console.log(post.picture);
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";

    console.log(post.categories);
    post.username = accounts.username;
  }, [file]);

  const savePost = async () => {
    await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
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
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputTextField
            placeholder="Title"
            onChange={(e) => handleChange(e)}
            name="title"
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
        />
      </Container>
    </>
  );
};
export default CreatePost;

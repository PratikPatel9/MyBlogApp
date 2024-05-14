import Post from "../models/Post.js";

export const createPost = async (request, resposne) => {
  try {
    const post = await new Post(request.body);
    post.save();
    return resposne.status(200).json("Post saved Successfully");
  } catch (error) {
    return resposne.status(500).json(error);
  }
};

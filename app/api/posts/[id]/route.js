import Post from "@models/postModel";
import connectDB from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const post = await Post.findById(params.id).populate("author");

    if (!post) return new Response("Post Not Found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const requestedPost = await req.json();

  try {
    await connectDB();

    // Find the existing post by ID
    const existingPost = await Post.findById(params.id);

    if (!existingPost) return new Response("post not found", { status: 404 });

    // Update the post with new data
    Object.assign(existingPost, requestedPost);

    await existingPost.save();

    return new Response("Successfully updated the posts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating post", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    // Find the post by ID and remove it
    await Post.findByIdAndRemove(params.id);

    return new Response("post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting post", { status: 500 });
  }
};

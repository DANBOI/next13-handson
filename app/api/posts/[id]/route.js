import Post from "@models/postModel";
import connectDB from "@utils/db";

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

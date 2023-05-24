import Post from "@models/postModel";
import connectDB from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const posts = await Post.find({ author: params.id }).populate("author");
    console.log(posts);
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts created by user", {
      status: 500,
    });
  }
};

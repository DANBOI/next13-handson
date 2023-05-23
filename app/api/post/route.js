import Post from "@models/postModel";
import connectDB from "@utils/db";

export const POST = async (req) => {
  const { userId, content, tag } = await req.json();

  try {
    await connectDB();
    const newpost = Post.create({ author: userId, content, tag });
    return new Response(JSON.stringify(newpost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};

import User from "@models/userModel";
import connectDB from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const user = await User.findOne({ _id: params.id });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", {
      status: 500,
    });
  }
};

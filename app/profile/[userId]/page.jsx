"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@components/Card";

export default function UserProfile({ params }) {
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  //for test
  // const session = { user: { id: "646b5f8820006f4aaeebab3a" } };

  const { userId } = params; //    /profile/:userId
  const isMyProfile = userId === session?.user.id;

  useEffect(() => {
    userId &&
      (async () => {
        let res = await fetch(`/api/users/${userId}/posts`);
        setUserPosts(await res.json());

        res = await fetch(`/api/users/${userId}`);
        const { username } = await res.json();
        setUserName(username);
      })();
  }, [userId]);

  const handleEdit = (post) => router.push(`/update?postId=${post._id}`);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (!hasConfirmed) return;
    try {
      await fetch(`/api/posts/${post._id.toString()}`, { method: "DELETE" });

      const filteredPosts = userPosts.filter(({ _id }) => _id !== post._id);
      setUserPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {isMyProfile ? "My" : `${userName}'s`} Profile
        </span>
      </h1>
      <p className="lead_text text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
        recusandae? Accusantium porro pariatur, voluptas expedita quod excepturi
        ex quidem ducimus ipsa eveniet vero at nostrum. Laborum ipsum officiis
        nisi quos.
      </p>

      {/* Posts list */}
      <div className="mt-16 post_layout">
        {userPosts.map((post) => (
          <Card
            isMyProfile={isMyProfile}
            key={post._id}
            userId={userId}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}

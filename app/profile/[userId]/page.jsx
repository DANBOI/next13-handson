"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Card from "@components/Card";

export default function Profile() {
  const [myPosts, setMyPosts] = useState([]);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { userId } = params; //    /profile/:userId
  const userName = searchParams.get("userName");

  useEffect(() => {
    userId &&
      (async () => {
        const res = await fetch(`/api/users/${userId}/posts`);
        const data = await res.json();
        setMyPosts(data);
      })();
  }, [userId]);

  const handleEdit = (post) => {
    router.push(`/update?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/posts/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter(({ _id }) => _id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{userName}'s Profile</span>
      </h1>
      <p className="lead_text text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
        recusandae? Accusantium porro pariatur, voluptas expedita quod excepturi
        ex quidem ducimus ipsa eveniet vero at nostrum. Laborum ipsum officiis
        nisi quos.
      </p>

      {/* Posts list */}
      <div className="mt-16 post_layout">
        {myPosts.map((post) => (
          <Card
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

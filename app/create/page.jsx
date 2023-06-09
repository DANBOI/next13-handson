"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

export default function CreatePost() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ content: "", tag: "" });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ userId, ...post }),
      });

      if (res.ok) {
        //redirect
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
}

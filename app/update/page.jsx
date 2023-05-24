"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

export default function UpdatePost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ content: "", tag: "" });

  useEffect(() => {
    postId &&
      (async () => {
        const res = await fetch(`/api/posts/${postId}`);
        const { content, tag } = await res.json();
        setPost({ content, tag });
      })();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Missing PostId!");

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(post),
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
}

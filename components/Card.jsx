"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Card({
  userId,
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}) {
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  //for test
  const session = { user: { id: "646b5f8820006f4aaeebab3a" } };

  const editable =
    userId === session?.user.id && pathName.startsWith("/profile");

  const handleProfileClick = () => {
    const userName = userId === session?.user.id ? "My" : post.author.username;
    router.push(`/profile/${userId}?userName=${userName}`);
  };

  const handleCopy = () => {
    //★windows.navigator
    navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="post_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.author.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {post.author.username}
            </h3>
            <p className="text-sm text-gray-500">{post.author.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied ? "/tick.svg" : "/copy.svg"}
            alt="copy_icon"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700">{post.content}</p>
      <p
        className={`text-sm blue_gradient ${
          handleTagClick && "cursor-pointer"
        }`}
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {editable && (
        <div className="mt-5 flex_center gap-4 border-t border-gray-100 pt-3 text-sm">
          <p
            className="text-cyan-500 cursor-pointer"
            onClick={() => handleEdit(post)}
          >
            Edit
          </p>
          <p
            className=" text-red-500 cursor-pointer"
            onClick={() => handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

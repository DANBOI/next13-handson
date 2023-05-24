"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Card({
  isMyProfile = false,
  userId,
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [copied, setCopied] = useState(false);

  const handleProfileClick = () => router.push(`/profile/${userId}`);

  const handleCopy = () => {
    //★windows.navigator
    navigator.clipboard.writeText(post.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="post_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className={`flex-1 flex justify-start items-center gap-3 ${
            !pathName.startsWith("/profile") && "cursor-pointer"
          }`}
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

      {isMyProfile && (
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

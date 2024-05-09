import React from "react";

export default function CommentUpdateHistoryCard({ comment }) {
  return (
    <div className="shadow-sm border rounded-lg p-6" key={comment?.commentId}>
      <div className="flex gap-2">
        <div className="w-12 h-12 rounded-full">
          <img
            alt="hehe"
            className="w-full h-full object-cover rounded-full"
            src={bill}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between  gap-10">
            <p className="font-bold text-violet-950">
              {comment?.user?.username}
            </p>
          </div>
          <p className="text-sm font-semibold">{comment?.commentContent}</p>
        </div>
      </div>
    </div>
  );
}

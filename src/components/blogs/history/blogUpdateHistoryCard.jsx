import React from "react";
import TimeConverter from "../../../utils/formatDateTime";

export default function BlogUpdateHistoryCard({ history }) {
  console.log(history);
  return (
    <div
      key={history}
      className="px-6 border pb-6 pt-2 rounded-lg shadow-md w-full cursor-pointer"
    >
      <div className=" flex gap-4 text-sm">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xl first-letter:capitalize">
            {history?.blogTitle}
          </p>
          <p className="line-clamp-6 text-balance">
            {history?.blogContent} ash sdh sd shds ds hdhs dhs dh shdhs dh hsc
            dshd sd shdu shudhsu dhush duhs duhusdn sjnhds dusudsud usdu s
            udusssssssss dsu dsu du shusdsd s dss s fssdnsd usdu hsu dhs udh
            sudhsu hd
          </p>
          Updated on: {TimeConverter(history?.createdAt)}
        </div>

        <img
          className="w-[10rem] h-[10rem] object-cover rounded-lg"
          src={history?.blogImageUrl}
        ></img>
      </div>
    </div>
  );
}

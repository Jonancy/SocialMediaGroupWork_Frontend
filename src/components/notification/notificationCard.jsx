import React from "react";
import TimeConverter from "../../utils/formatDateTime";

const NotificationCard = ({ noti }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto w-[40rem]">
      <h3 className="text-lg font-bold mb-2">{noti?.senderId?.username}</h3>
      <p className="text-gray-700 mb-2">
        {noti?.content == 1 ? "Reacted" : "Commented"} on your post: "{}"
      </p>
      <p className="text-gray-500 text-sm">
        Created on {TimeConverter(noti?.createdAt)}
      </p>
    </div>
  );
};

export default NotificationCard;

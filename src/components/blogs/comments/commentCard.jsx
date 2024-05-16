import React, { useState } from "react";
import bill from "../../../assets/bil.webp";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getLocalStorage } from "../../../utils/localStorage";
import {
  deleteBlogComments,
  editBlogComments,
  getBlogCommentHistory,
  postBlogCommentVote,
} from "../../../services/client/blog-comments.service";
import { toast } from "react-toastify";
import NotificationCard from "../../notification/notificationCard";
import TimeConverter from "../../../utils/formatDateTime";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

export default function CommentCard({ comment, getBlogDetails }) {
  const currentUser = getLocalStorage().id;

  console.log(comment);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.commentContent);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const user_id = getLocalStorage().id;

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await editBlogComments(editedContent, comment?.commentId);
      console.log(res.data);
      toast.success(res.data.message);
      setEditing(false);
      getBlogDetails();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const voteComments = async (vote) => {
    try {
      const res = await postBlogCommentVote(comment?.commentId, vote);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const handleDelete = () => {
    // Open confirmation dialog
    setShowConfirmationDialog(true);
  };

  const handleChange = (e) => {
    setEditedContent(e.target.value);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteBlogComments(comment?.commentId);
      console.log(res.data);
      toast.success(res.data.message);
      setShowConfirmationDialog(false);
      getBlogDetails();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    getCommentHistory();
  };

  const getCommentHistory = async () => {
    try {
      const res = await getBlogCommentHistory(comment?.commentId);
      console.log(res.data);
      setNotificationHistory(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  // const hasVoted = comment?.commentVotes?.filter(
  //   (vote) => vote.user.userId === user_id
  // );

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

            {currentUser === comment?.user?.userId && (
              <div className="flex items-center gap-2 text-sm">
                <button onClick={handleEdit}>
                  <FaEdit />
                </button>
                <button onClick={handleDelete}>
                  <FaTrash />
                </button>
                <button onClick={handleOpenDialog}>View History</button>
              </div>
            )}
          </div>
          {editing ? (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={editedContent}
                onChange={handleChange}
                // onBlur={handleSaveEdit}
                className="border border-gray-300 rounded-lg p-1 mt-2"
              />
              <button
                onClick={handleSaveEdit}
                className="py-1 px-2 rounded-lg hover:bg-opacity-90 duration-300 bg-purple-950 text-white font-semibold text-sm"
              >
                Confirm
              </button>
              <button
                onClick={handleEdit}
                className="py-1 px-2 rounded-lg bg-gray-400 hover:bg-gray-500 duration-300 text-white font-semibold text-sm"
              >
                <p>Cancel</p>
              </button>
            </div>
          ) : (
            <p className="text-sm font-semibold">{comment?.commentContent}</p>
          )}
          <div className="flex gap-4 items-center mt-2">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => voteComments(true)}
            >
              <BiSolidUpvote
              // className={`${
              //   comment?.commentVotes?.length > 0 &&
              //   comment?.commentVotes?.some(
              //     (vote) => vote?.user?.userId == user_id
              //   )
              //     ? "text-violet-950"
              //     : "text-gray-200"
              // }`}
              />
              {/* <p className="text-sm">{blog?.totalUpVote} upvotes</p> */}
              <p className="text-sm">0 upvotes</p>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => voteComments(false)}
            >
              <BiSolidDownvote
                className="text-violet-950"

                // className={`${
                //   userVote?.isVote == false ? "text-violet-950" : "text-white"
                // }`}
              />
              {/* <p className="text-sm">{blog?.totalDownVote} downvotes</p> */}
              <p className="text-sm">1 downvotes</p>
            </div>
          </div>
        </div>
        {/* Confirmation Dialog */}
        <Dialog
          open={showConfirmationDialog}
          onClose={() => setShowConfirmationDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this comment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={confirmDelete}
              variant="contained"
              color="secondary"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setShowConfirmationDialog(false)}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog maxWidth="lg" open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Comments history</DialogTitle>
          <DialogContent>
            <div className="flex flex-col gap-2">
              {notificationHistory?.length > 0 ? (
                notificationHistory?.map((noti) => (
                  <div className="bg-white rounded-lg shadow-md p-4  mx-auto w-[30rem]">
                    <h3 className="text-lg font-bold mb-2">
                      {/* {noti?.senderId?.username} */}
                    </h3>
                    <p className="text-gray-700 mb-2">{noti?.commentContent}</p>
                    <p className="text-gray-500 text-sm">
                      Updated on {TimeConverter(noti?.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="w-[30rem]">No history yet</p>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

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
} from "../../../services/client/blog-comments.service";
import { toast } from "react-toastify";

export default function CommentCard({ comment, getBlogDetails }) {
  const currentUser = getLocalStorage().id;

  console.log(comment);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.commentContent);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

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
      </div>
    </div>
  );
}

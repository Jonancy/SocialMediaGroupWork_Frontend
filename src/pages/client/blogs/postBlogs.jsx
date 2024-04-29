import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { postBlogs } from "../../../services/client/blogs.service";
import * as Yup from "yup";
import { getLocalStorage } from "../../../utils/localStorage";

export default function PostBlogs() {
  //TODO: Need to fix the UI
  const [viewFile, setViewFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const initialValues = {
    BlogTitle: "",
    BlogContent: "",
    BlogImage: null,
  };

  const blogsPostSchema = Yup.object({
    BlogTitle: Yup.string()
      .min(6, "Title must be at least 6 letters")
      .max(100, "Title must be below 100 letters")
      .required(),
    BlogContent: Yup.string().required(),
    BlogImage: Yup.string().required(),
  });

  const user_id = getLocalStorage().id;

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: blogsPostSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("BlogTitle", values.BlogTitle);
      formData.append("BlogContent", values.BlogContent);
      formData.append("BlogImage", values.BlogImage);
      await submitBlog(formData);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFieldValue("BlogImage", file);

    //!This is for image view of the form
    const fileURL = URL.createObjectURL(file);
    setViewFile(fileURL);
  };

  const handleRemovePicture = () => {
    setViewFile(null);
    setFieldValue("BlogImage", null);
  };

  const submitBlog = async (formData) => {
    if (user_id != null) {
      try {
        const res = await postBlogs(formData, user_id);
        console.log(res.data);
        toast.success(res.data.message);

        //!Reset the fields
        resetForm();
        setViewFile(null);
        setIsLoading(false);
      } catch (error) {
        console.error(error.response.data.message);
        toast.error("sasa");
      }
    } else {
      setIsLoading(false);
      toast.error("Please login and continue!");
    }
  };

  console.log(values);

  const navigate = useNavigate();

  const cancelNavigate = () => {
    //   navigate(`/vendor/${hotel_name}/settings`);
  };

  return (
    <div className="flex justify-center items-center p-10">
      <form
        className="flex flex-col gap-6 shadow-md rounded-lg p-6 border w-[60%] "
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">New post</h1>
          <Link
            to={`/home`}
            className=" rounded-full  p-2 hover:bg-neutral-100  text-2xl"
          >
            <RxCross1 />
          </Link>
        </div>
        <div className="">
          <TextField
            label="Title"
            name="BlogTitle"
            value={values.BlogTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className="w-[20rem]"
          ></TextField>
          {errors.BlogTitle && touched.BlogTitle ? (
            <p className="text-red-600">{errors.BlogTitle}</p>
          ) : null}
        </div>
        <div className="">
          <textarea
            placeholder="Write your post here..."
            name="BlogContent"
            value={values.BlogContent}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border w-full p-4 outline-blue-500 h-32 rounded-md "
          ></textarea>
          {errors.BlogContent && touched.BlogContent ? (
            <p className="text-red-600">{errors.BlogContent}</p>
          ) : null}
        </div>
        <div className="flex flex-col items-center justify-center w-[50%]">
          {viewFile ? (
            <div className="relative rounded-lg w-full h-60 ">
              <div className=" rounded-xl h-full">
                <img
                  src={viewFile}
                  className="w-full h-full rounded-lg object-cover"
                  alt="Preview"
                />
              </div>
              <div
                className=" text-white text-xl rounded-full p-1 absolute top-4 right-4 cursor-pointer"
                onClick={handleRemovePicture}
              >
                <RxCross1 />
              </div>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                onBlur={handleBlur}
                accept="image/*"
              />
            </label>
          )}
          {errors.BlogImage && touched.BlogImage ? (
            <p className="text-red-600">{errors.BlogImage}</p>
          ) : null}
        </div>
        <div className="flex justify-end text-sm font-semibold gap-4">
          <button
            className={`p-3 rounded-3xl pl-7 pr-7 hover:bg-neutral-100 text-black flex items-center gap-2 duration-300   ${
              isLoading && "cursor-not-allowed"
            }`}
            type="button"
            disabled={isLoading}
            onClick={!isLoading && cancelNavigate}
          >
            <RxCross1 className="font-bold" />
            <p>Cancel</p>
          </button>
          <button
            type="submit"
            className={`p-3 rounded-3xl pl-7 pr-7 flex gap-2 text-white bg-violet-950 duration-300  ${
              isLoading
                ? "cursor-not-allowed opacity-80"
                : " hover:bg-violet-900 "
            }`}
            disabled={isLoading}
          >
            {isLoading && <CircularProgress color="primary" size={20} />}
            <p>Save</p>
          </button>
        </div>
      </form>
    </div>
  );
}

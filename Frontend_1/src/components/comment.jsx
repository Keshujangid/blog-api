// import React from 'react'
import { useState, useEffect, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from '@mui/material/IconButton';
// import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/UseContexts";
import api from "@/src/pages/api/axios";
export default function Comment() {
  const postId = useParams().id;
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e88e5",
      },
      secondary: {
        main: "#29b6f6",
      },
      delete: {
        main: "#f44336",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.isAuthenticated) {
      console.log("not authenticated");
      navigate("/login");
      return;
    }
    console.log(commentForm);
    const response = await api.post(`api/posts/${postId}/comments`, {
      content: commentForm,
    });
    setComments([...comments, response.data]);
    setCommentForm("");
    console.log(response);
  };

  const handleChange = (e) => {
    // console.log(e.target.value)
    setCommentForm(e.target.value);
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await api.delete(
        `/api/posts/${postId}/comment/${commentId}`
      );

      console.log(response);
      const newComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(newComments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (
          await api.get(`api/posts/${postId}/comments`)
        ).data;
        console.log(response);
        setComments(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className=" p-6 space-y-4">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                onChange={(e) => {
                  handleChange(e);
                }}
                value={commentForm}
                id="comment"
                rows="4"
                className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Post comment
              </button>
            </div>
          </div>
        </form>
      </div>

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        comments.map((comment) => (
          <article
            key={comment.id}
            className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie Green"
                  />
                  {comment.user?.username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time
                    dateTime={comment.createdAt}
                    title={new Date(comment.createdAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  >
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
              </div>
              {comment.user?.username === localStorage.getItem("user") && (
                <ThemeProvider theme={theme}>
                  <IconButton aria-label="delete" onClick={handleDelete.bind(null, comment.id)}>
                    <DeleteIcon color="error"/>
                  </IconButton>
                </ThemeProvider>
              )}
            </footer>
            <p>{comment.content}</p>
          </article>
        ))
      )}
      {comments.length === 0 && <p>no comment yet</p>}
    </div>
  );
}

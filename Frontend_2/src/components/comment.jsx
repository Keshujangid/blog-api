// import React from 'react'
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams } from "react-router-dom";
import api from "@/src/pages/api/axios";
export default function Comment() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  // const [commentForm, setCommentForm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

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


  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/api/admin/posts/${postId}/comment/${commentId}`);
      
      const newComments = comments.filter((comment) => comment.id !== commentId);
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
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> Comments</h3>
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
                  <time dateTime={comment.createdAt} title={new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}>
                    {new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </p>
              </div>
              <ThemeProvider theme={theme}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineIcon />}
                  color="delete"
                  onClick={handleDelete.bind(null, comment.id)}
                >
                  delete
                </Button>
              </ThemeProvider>
            </footer>
            <p>{comment.content}</p>
          </article>
        ))
      )}
      {comments.length === 0 && <p>no comment yet</p>}
    </div>
  );
}

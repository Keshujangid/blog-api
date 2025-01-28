import { useEffect, useState } from "react";
import axios from "../api/axios";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("api/admin/posts");
      setBlogs(response.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  async function handleDelete(postId){
    try {
      const response = await axios.delete(`api/posts/${postId}`)
      console.log(response)
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== postId));
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className=" h-full bg-gray-50 w-full">
      {loading ? (
        <main className="container mx-auto px-4 py-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-gray-200 shadow rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="p-4">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mt-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Your Blogs</h2>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" startIcon={<PostAddIcon/>} color="primary" href="/blog/create">
              Create
            </Button>
          </ThemeProvider>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <a href={`/blog/${blog.id}`} className="block p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {parse(DOMPurify.sanitize(blog.content.slice(0, 100)))}... 
                  </p>
                  <p className="text-gray-500 text-xs mt-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {blog.comments.length} comments
                  </p>
                </a>
                <div className="p-4">
                  <Button
                    variant="outlined"
                    startIcon={<DeleteOutlineIcon />}
                    color="error"
                    onClick={handleDelete.bind(null, blog.id)}
                  >
                    delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Footer */}
      
    </div>
  );
};

export default HomePage;

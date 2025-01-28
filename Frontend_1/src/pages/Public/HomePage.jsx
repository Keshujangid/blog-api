import { useEffect, useState } from 'react';
import axios from '../api/axios';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('api/posts');
      console.log(response.data)
      setBlogs(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className=" h-full bg-gray-50 w-full">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <a
              href={`/blog/${blog.id}`}
              key={blog.id}
              className="bg-white shadow rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {parse(DOMPurify.sanitize(blog.content).slice(0, 100))}... {/* Display a preview */}
                </p>
                <p className="text-gray-500 text-xs mt-4">
                  By {blog.author.username || "Anonymous"} |{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  {blog.comments.length} comments
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

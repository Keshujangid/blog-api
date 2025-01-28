// import React from 'react'
import { useParams } from "react-router-dom";
import api from "@/src/pages/api/axios";
import { useState, useEffect } from "react";
import Comment from "@/src/components/comment"
import parse from "html-react-parser";
import DOMPurify from 'dompurify'

export const Blog = () => {
  const [blog, setBlog] = useState({});
  const postId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (await api.get(`/api/posts/${postId}`)).data;
        setBlog(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white  overflow-hidden mb-6">
        {/* Cover Photo */}
        {blog.coverPhoto && (
          <div className="h-64 w-full">
            <img
              src={blog.coverPhoto}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h2>
          {/* Author and Date */}
          <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
            <span>By {blog.author?.username}</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          {/* Content */}
          <div className="text-gray-700 mb-4"  />
          {parse(DOMPurify.sanitize(blog.content))}
        </div>
      <Comment />
      </div>
    </>
  );
};

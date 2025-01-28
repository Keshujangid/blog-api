import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import PublicIcon from "@mui/icons-material/Public";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import api from "@/src/pages/api/axios";
import Error from "@/src/components/Error";
import { useState, useEffect, useRef } from "react";
import Comment from "@/src/components/comment";
import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import { z } from "zod";

export const Blog = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    isPublished: null,
  });
  // const [alignment, setAlignment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const postId = useParams().postId;
  const editorContentRef = useRef("");

  const zod = z.object({
    title: z.string().min(10, "Title must be at least 10 characters long"),
    content: z
      .string()
      .min(50, "Content must be at least 50 characters long"),
    isPublished: z.boolean(),
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e88e5",
      },
      secondary: {
        main: "#ff1744",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/admin/posts/${postId}`);
        setBlog(response.data);

        editorContentRef.current = DOMPurify.sanitize(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleblogChange = (e, publishStatus) => {
    if (e && e.target && e.target.name) {
      const { name, value } = e.target;
      setBlog((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setBlog((prevState) => ({
        ...prevState,
        isPublished: publishStatus,
      }));
    }
  };
  const handleEditorChange = (content) => {
    editorContentRef.current = content; // Update content locally
  };
  const handleSubmit = async () => {
    try {
      // const token = localStorage.getItem('token')
      setLoading(true);
      const result = zod.safeParse({...blog, content: editorContentRef.current});
      if (!result.success) {
        setError(result.error.errors);
        return;
      }
      await api.put(`/api/posts/${postId}`, {
        title: blog.title,
        content: editorContentRef.current,
        isPublished: blog.isPublished,
      });
      setLoading(false);
      alert("Blog updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white overflow-hidden mb-6">
      {error.length > 0 && (<Error error={error} />)}
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
        <input
          name="title"
          type="text"
          value={blog.title}
          onChange={handleblogChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Blog Title"
        />
        {/* Editor */}
        <Editor
          textareaName="content"
          className="z-0"
          apiKey={import.meta.env.VITE_TINY_API}
          init={{
            plugins: [
              "anchor",
              "autolink",
              "emoticons",
              "searchreplace",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline | align lineheight | emoticons charmap | removeformat",
          }}
          // value={editorContentRef.current} // Use the ref value
          initialValue={blog.content}
          onEditorChange={handleEditorChange}
        />
        <div className="flex items-center justify-between gap-2 mt-4">
          <ToggleButtonGroup
            color="primary"
            value={blog.isPublished}
            exclusive
            onChange={handleblogChange}
            aria-label="Platform"
          >
            <ToggleButton value={true}>
              <PublicIcon />
              Publish
            </ToggleButton>
            <ToggleButton color="error" value={false}>
              <PublicOffIcon />
              Unpublish
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="mt-4">
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              startIcon={<SaveOutlinedIcon />}
              color="primary"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ThemeProvider>
        </div>
      </div>

      <Comment postId={postId} />
    </div>
  );
};

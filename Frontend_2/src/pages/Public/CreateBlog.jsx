import api from "@/src/pages/api/axios";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import PublicIcon from "@mui/icons-material/Public";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
import Error from "@/src/components/Error";

export const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    // content: "",
    isPublished: false,
  });
  const [error, setError] = useState([]);
  const editorRef = useRef("");
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e88e5",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  const zod = z.object({
    title: z.string().min(10, "Title must be at least 10 characters long"),
    content: z.string().min(50, "Content must be at least 50 characters long"),
    isPublished: z.boolean(),
  });

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
    // console.log(content) 
    editorRef.current = content; 
    console.log(editorRef.current)
    // Update content locally
  };

  const handleSubmit = async () => {
    try {
      // console.log(editorRef.current.getContent());
      const result = zod.safeParse({
        ...blog,
        content: editorRef.current,
      });
      if (!result.success) {
        setError(result.error.errors);
        return;
      }
      setError([]);
      const content = editorRef.current
      
      // console.log(blog);
      const response = await api.post("/api/posts", {
        title:blog.title,
        content:content,
        isPublished:blog.isPublished
      });
      navigate(`/blog/${response.data.id}`);

      alert("Blog submited successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white overflow-hidden mb-6">
      {error.length > 0 && <Error error={error} />}
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
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Title */}
          <input
            name="title"
            type="text"
            value={blog.title}
            onChange={handleblogChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Blog Title"
            required
          />
          {/* Editor */}
          <Editor
            textareaName="content"
            required
            className="z-0"
            apiKey={import.meta.env.VITE_TINY_API}
            onInit={(evt, editor) => (editorRef.current = editor)}
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
              setup:(editor)=>{
                editor.on("input change",()=>{
                  // console.log("running on every change")
                })
              }
              }}
              onEditorChange={handleEditorChange}
            initialValue={""}
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
        </form>
      </div>
    </div>
  );
};

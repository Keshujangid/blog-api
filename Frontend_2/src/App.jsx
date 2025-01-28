import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Public/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Blog } from "./pages/Public/Blog";
import { CreateBlog } from "./pages/Public/CreateBlog";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

  return (
    <div className="min-h-screen grid grid-rows-[72px_1fr] ">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main h-full overflow-y-auto">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
              
            }
          />

          <Route
            path="/blog/:postId"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
        <Footer />
    </div>
  );
}

export default App;

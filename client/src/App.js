import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import BlogDetail from "./components/blogs/BlogDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreateBlog from "./components/layout/CreateBlog";
import UpdateBlog from "./components/layout/UpdateBlog";
import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/posts/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateBlog />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

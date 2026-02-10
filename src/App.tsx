import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useAuthContext } from "./provider/auth-provider";
import { axiosInterceptor } from "./utils/axiosInterceptor";
import { useEffect } from "react";

function App() {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useAuthContext();

  useEffect(() => {
    axiosInterceptor(logout);
  }, [logout]);
  return (
    <Routes>
      {/* Protected route */}
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* Public routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />
    </Routes>
  );
}

export default App;

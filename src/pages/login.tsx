import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../provider/auth-provider";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, error } = useAuth("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (token) => {
          setToken(token);
          navigate("/dashboard", { replace: true });
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-50">
      <div className="flex-1 text-left">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to IP Details
        </h1>
        <h2 className="text-xl text-gray-400 mb-0">
          A website whose sole purpose is to provide information about IP
          addresses!
        </h2>
      </div>
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-white">Login</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Error */}
        {error && (
          <div className="flex items-center justify-center w-full mt-4">
            <p className="text-red-500 text-center w-full">
              {(error as any)?.response?.data?.message || error.message}
            </p>
          </div>
        )}
        {/* Loading */}
        {isPending && (
          <div className="flex items-center justify-center w-full mt-4">
            <p className="text-gray-400 text-center w-full">Loading...</p>
          </div>
        )}
        <p className="mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

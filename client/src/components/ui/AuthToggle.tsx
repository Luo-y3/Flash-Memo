// client/src/components/ui/SignInUp.tsx
import { useState } from "react";

interface AuthResponse {
  token?: string;
  message?: string;
}

export default function AuthResponse() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // เรียก API
  const handleAuth = async () => {
    const endpoint = isRegister ? "/register" : "/login";
    const url = `http://127.0.0.1:3000${endpoint}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister
            ? { username: name, email, password }
            : { email, password },
        ),
      });

      const data: AuthResponse = await res.json();
      if (!res.ok) {
        setMessage(data.message || "❌ Authentication failed");
        return;
      }

      if (!isRegister && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Login successful!");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setMessage("✅ Register successful! You can now log in.");
        setIsRegister(false);
      }

      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setMessage("⚠️ Network error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-indigo-100 p-6">
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl min-h-[480px]">
        {/* Register */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-700 ease-in-out z-20 flex items-center justify-center p-8 ${
            isRegister
              ? "translate-x-full opacity-100 z-30"
              : "translate-x-0 z-20"
          }`}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-xs flex flex-col items-center gap-3"
          >
            <h1 className="text-2xl font-semibold">Create Account</h1>

            <span className="text-sm text-gray-500">
              or use your email for registration
            </span>
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAuth}
              className="mt-2 uppercase px-8 py-2 rounded-lg bg-indigo-700 text-white font-semibold shadow"
            >
              Sign Up
            </button>
            {message && (
              <p
                className={`text-sm ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Login */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-700 ease-in-out z-10 flex items-center justify-center p-8 ${
            isRegister ? "translate-x-0 opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-xs flex flex-col items-center gap-3"
          >
            <h1 className="text-2xl font-semibold">Sign In</h1>

            <span className="text-sm text-gray-500">
              or use your email password
            </span>
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className="text-sm text-indigo-700 hover:underline" href="#">
              Forget Your Password?
            </a>
            <button
              type="button"
              onClick={handleAuth}
              className="mt-2 uppercase px-8 py-2 rounded-lg bg-indigo-700 text-white font-semibold shadow"
            >
              Sign In
            </button>
            {message && (
              <p
                className={`text-sm ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Right Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 transition-transform duration-700 ease-in-out z-40 p-6 rounded-l-[150px] overflow-hidden ${
            isRegister ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            background: "linear-gradient(to right, #5c6bc0, #512da8)",
            color: "white",
          }}
        >
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            {isRegister ? (
              <>
                <h2 className="text-3xl font-bold">Welcome Back!</h2>
                <p className="mt-3">
                  Enter your personal details to use all of site features
                </p>
                <button
                  onClick={() => setIsRegister(false)}
                  className="mt-6 px-6 py-2 rounded-lg border-2 border-white bg-transparent font-semibold"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold">Hello, Friend!</h2>
                <p className="mt-3">
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  onClick={() => setIsRegister(true)}
                  className="mt-6 px-6 py-2 rounded-lg border-2 border-white bg-transparent font-semibold"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

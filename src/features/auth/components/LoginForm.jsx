import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../config/firebase";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state change will be picked up by useAuthStore
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Failed to sign in. Check your email and password.");
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Login error:", error.message);
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
        {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-gray-200 w-full" />
        <span className="bg-white px-2 text-sm text-gray-500 absolute">OR</span>
      </div>

      <Button 
        type="button" 
        variant="outline" 
        onClick={handleGoogleLogin} 
        disabled={loading}
        className="flex items-center justify-center gap-2"
      >
        <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </Button>
    </div>
  );
};

export default LoginForm;

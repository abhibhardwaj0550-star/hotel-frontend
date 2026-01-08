import React, { useState } from "react";
import LoginPage from "../pages/auth/login/Page";
import SignupPage from "../pages/auth/Signup/Page";

const Auth = ({ initialMode = "login", onClose }) => {
  const [mode, setMode] = useState(initialMode);

  return (
    <div>
      {mode === "login" ? <LoginPage /> : <SignupPage />}

      <button
        className="mt-4 text-blue-600 text-sm"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login"
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;

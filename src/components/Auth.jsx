import React, { useState } from "react";
import LoginPage from "../pages/auth/login/Page";
import SignupPage from "../pages/auth/Signup/Page";



const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        {isLogin ? <LoginPage /> : <SignupPage />}


        <button
          className="mt-4 text-blue-600 text-sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};


export default Auth;
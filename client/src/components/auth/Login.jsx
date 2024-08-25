import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/authApi";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
    navigate("/");
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error, isAuthenticated, navigate]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={handleLogin}>
          <h2 className="mb-4">Login</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            id="login_btn"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Authenticating....." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

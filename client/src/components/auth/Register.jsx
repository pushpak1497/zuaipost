import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading, error, data }] = useRegisterMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(data);
  const handleRegister = (e) => {
    e.preventDefault();
    register({ name, email, password });
    setName("");
    setEmail("");
    setPassword("");
    navigate("/login");
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
        <form className="shadow rounded bg-body" onSubmit={handleRegister}>
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            id="register_button"
            type="submit"
            disabled={isLoading}
            className="btn w-100 py-2"
          >
            {isLoading ? "Registering....." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

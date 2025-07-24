import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signupCredentials.password !== signupCredentials.confirmPassword) {
      return props.showAlert("Passwords does not match", "danger");
    }
    const { name, email, password } = signupCredentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      //Store the AuthToken and Redirect
      localStorage.setItem("token", json.authToken);
      navigate("/Home");
      props.showAlert("SignUp done Successfully", "Success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (event) => {
    setSignupCredentials({
      ...signupCredentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div style={{marginTop:"10px"}}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="Name"
              value={signupCredentials.name}
              onChange={onChange}
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="Email"
              value={signupCredentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="Password"
              value={signupCredentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              value={signupCredentials.confirmPassword}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

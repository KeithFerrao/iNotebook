import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleSubmit = async (event)=>{
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });
        const json  = await response.json();
        console.log(json);
        if(json.success === true){
            //Store the AuthToken and Redirect
            localStorage.setItem("token",json.authToken);
            navigate("/Home");
            props.showAlert("Login Successful", "success");

        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (event)=>{
        setCredentials({...credentials,[event.target.name]: event.target.value})
    };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            className="form-control"
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;

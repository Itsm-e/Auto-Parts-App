import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const loginAdmin = async(e)=>{
    e.preventDefault();

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      navigate("/admin/dashboard");

    }catch(error){

      alert(error.response?.data?.message || "Login failed");

    }
  };

  return(

    <div className="auth-container">

      <form className="auth-card" onSubmit={loginAdmin}>

        <h2>🔐 Admin Login</h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Email Address"
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button className="auth-button">
          Login
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </form>

    </div>

  );
}

export default Login;
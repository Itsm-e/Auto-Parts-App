import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Register(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");

  const navigate = useNavigate();

  const registerAdmin = async(e)=>{
    e.preventDefault();

    try{

      const res = await API.post("/auth/register",{
      name,
      email,
      password,
      secretCode
    });
      localStorage.setItem("token",res.data.token);

      navigate("/admin/dashboard");

    }catch(error){

      alert(error.response?.data?.message || "Registration failed");

    }
  };

  return(

    <div className="auth-container">

      <form className="auth-card" onSubmit={registerAdmin}>

        <h2> \ō͡≡o˞̶  Create Admin Account</h2>

        <input
          className="auth-input"
          placeholder="Full Name"
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          className="auth-input"
          placeholder="Admin Code"
          onChange={(e) => setSecretCode(e.target.value)}
          required
        />

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
          Register
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>

  );
}

export default Register;
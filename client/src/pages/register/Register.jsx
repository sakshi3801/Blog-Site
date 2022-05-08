import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e)=>{

    e.preventDefault()
    setError(true)

    try{
    const res = await axios.post("/auth/register", {

      username,
      email,
      password
    })

    res.data && window.location.replace("/login")

  }catch(e){
    
    setError(true)

  }

    
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={e=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={e=>setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={e=>setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <Link to='/login' className="link"><button className="registerLoginButton">Login</button></Link>
      {error && <span style={{color:"red", marginTop:"15px" }}>Something went wrong!</span>}
    </div>
  );
}
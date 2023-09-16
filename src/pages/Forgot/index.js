import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo01.png";
import { AuthContext } from "../../contexts/auth";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const { forgotPassword, loadingAuth } = useContext(AuthContext);

  function handleForgot(e) {
    e.preventDefault();
    forgotPassword(email);

  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo System" />
        </div>
        <form onSubmit={handleForgot}>
          <h1>Forgot Password</h1>
          <input
            type="text"
            placeholder="E-mail:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">{loadingAuth ? "Send Code..." : "Code"}</button>
        </form>
        <Link to="/signup">Create an account</Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import "./style.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/table");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="login_container">
      <div className="input_container">
        <label>Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          required
        />
      </div>
      <div className="input_container">
        <label>Password</label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          required
        />
      </div>
      <div className="btn_container">
        <Button onClick={onLogin}>
          {loading ? "Logging you in ..." : "Login"}
        </Button>
        <Link to="/signup">Don't have an account?</Link>
      </div>
    </div>
  );
};

export default Login;

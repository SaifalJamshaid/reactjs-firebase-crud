import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { auth } from "../firebase";
import { Link , useHistory} from "react-router-dom";
import "./style.css";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSignUp = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: name,
        });
      })
      .then(() => history.push("/"))
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className='signup_container'>
    <div className="input_container">
      <label>Name</label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
        type="name"
        required
      />
      </div>
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
      <div className='btn_container'>
      <Button onClick={handleSignUp}>
        {loading ? "Creating user ..." : "Signup"}
      </Button>
        <Link to="/">Already have an account</Link>
      </div>
    </div>
  );
};

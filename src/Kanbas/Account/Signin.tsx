import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    // const user = db.users.find(
    //   (u: any) => u.username === credentials.username && u.password === credentials.password);
    try {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");}
    catch (error) {
      alert("Account doesn't exist!");
  }
  };

  return (
    <div id="wd-signin-screen" className="p-5" style={{width:"500px"}}>
      <h3>Sign in</h3>
      
      <input defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              id="wd-username" placeholder="username" className="form-control mb-2"/>
      <input defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            id="wd-password" placeholder="password" type="password" className="form-control mb-2"/>
      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>
      <Link  id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
    </div>
);}

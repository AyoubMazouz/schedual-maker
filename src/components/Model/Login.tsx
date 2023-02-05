import React from "react";
// Contexts.
import { useGlobalContext } from "../../Contexts/GlobalContext";
// Hooks.
import { useUser } from "../../hooks/useUser";
// Components.
import { Button } from "../Button";
import { IcCancel, IcLogin, IcMail, IcPwd } from "../../helpers/icons";
import { useAuth } from "../../Contexts/AuthContext";
import { Input } from "../Input";

const Login = () => {
  const { setModel, setAlert } = useGlobalContext();
  const { currUser } = useAuth();
  const { signIn } = useUser();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitHandler = async () => {
    const res = await signIn(email, password);

    if (res === "success")
      setAlert({
        type: "success",
        message: `Welcome back "${currUser.username}!"`,
      });
    else
      setAlert({
        type: "danger",
        message:
          "Something went wrong, make sure you have the correct credentials and try again.",
      });

    setModel(null);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-xl text-primary">LogIn</div>
          <div>Only Authorized Admins are allowed here</div>
        </div>
        <Input
          type="email"
          label="email"
          Icon={IcMail}
          placeholder="Email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="password"
          Icon={IcPwd}
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="model-btn-container">
        <Button
          text="Log In"
          type="success"
          onClick={submitHandler}
          Icon={IcLogin}
        />
        <Button text="Cancel" onClick={() => setModel(null)} Icon={IcCancel} />
      </div>
    </>
  );
};

export default Login;

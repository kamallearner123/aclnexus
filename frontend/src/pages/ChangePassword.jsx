import { useState } from "react";
import axios from "axios";

function ChangePassword() {

  const [password, setPassword] = useState("");

  const changePassword = async () => {

    try {

      const email =
        localStorage.getItem("email");

      await axios.post(
        "http://localhost:8080/change-password",
        {
          email,
          password,
        }
      );

      alert("Password Updated");

    } catch (error) {

      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Change Password</h1>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e)=>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button
        onClick={changePassword}
      >
        Update Password
      </button>

    </div>
  );
}

export default ChangePassword;
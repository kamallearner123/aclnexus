import { useState } from "react";
import axios from "axios";

function CreateTeamMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("3");

  const createUser = async () => {
    try {
      await axios.post("http://localhost:8080/users", {
        company_id: 1,
        role_id: Number(roleId),
        name: name,
        email: email,
      });

      alert("Team Member Added");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error Adding User");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Add Team Member</h3>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <select
        value={roleId}
        onChange={(e) => setRoleId(e.target.value)}
      >
        <option value="1">Admin</option>
        <option value="2">Manager</option>
        <option value="3">Employee</option>
      </select>

      <br /><br />

      <button onClick={createUser}>
        Add Team Member
      </button>
    </div>
  );
}

export default CreateTeamMember;
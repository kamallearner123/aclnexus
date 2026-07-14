import { useState } from "react";
import axios from "axios";

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const createProject = async () => {
    try {
      await axios.post("http://localhost:8080/projects", {
        company_id: 1,
        project_name: projectName,
        description: description,
        status: status,
      });

      alert("Project Created Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error Creating Project");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Create Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Active</option>
        <option>Completed</option>
      </select>

      <br /><br />

      <button onClick={createProject}>
        Create Project
      </button>
    </div>
  );
}

export default CreateProject;
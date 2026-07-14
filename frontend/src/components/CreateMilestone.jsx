import { useState } from "react";
import axios from "axios";

function CreateMilestone() {
  const [projectId, setProjectId] = useState("1");
  const [milestoneName, setMilestoneName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const createMilestone = async () => {
    try {
      await axios.post("http://localhost:8080/milestones", {
        project_id: Number(projectId),
        milestone_name: milestoneName,
        due_date: dueDate,
      });

      alert("Milestone Created");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error Creating Milestone");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Create Milestone</h3>

      <input
        type="number"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Milestone Name"
        value={milestoneName}
        onChange={(e) => setMilestoneName(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br /><br />

      <button onClick={createMilestone}>
        Create Milestone
      </button>
    </div>
  );
}

export default CreateMilestone;
import { useState } from "react";
import axios from "axios";

function CreateTask() {
  const [projectId, setProjectId] = useState("1");
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const createTask = async () => {
    try {
      await axios.post("http://localhost:8080/tasks", {
  project_id: Number(projectId),
  task_name: taskName,
  status: status,
  due_date: dueDate,
  assigned_to: Number(assignedTo),
});

      alert("Task Created");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error Creating Task");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Create Task</h3>

      <input
        type="number"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Pending</option>
        <option>Completed</option>
      </select>

      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br /><br />
      <input
  type="number"
  placeholder="Assigned Employee ID"
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
/>

<br /><br />

      <button onClick={createTask}>
        Create Task
      </button>
    </div>
  );
}

export default CreateTask;
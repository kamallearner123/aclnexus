import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/logs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>

      {logs.map((log) => (
        <div
          key={log.id}
          style={{
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}
        >
          🔔 {log.activity}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
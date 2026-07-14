import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/logs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Activity Logs
      </Typography>

      <TableContainer
        component={Paper}
      >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Activity</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.activity}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>

    </Box>
  );
}

export default ActivityLogs;
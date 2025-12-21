import { useState, useEffect } from "react";
import { Paper, TextField, Button, Stack, Typography, Box } from "@mui/material";

export default function Chat() {
  const [to, setTo] = useState("");
  const [content, setContent] = useState("");
  const [inbox, setInbox] = useState([]);

  const loadInbox = async () => {
    const res = await fetch("/api/chat/inbox", { credentials: "include" });
    const data = await res.json();
    setInbox(data);
  };

  useEffect(() => {
    loadInbox();
  }, []);

  const sendMessage = async () => {
    const res = await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ to, content })
    });
    const data = await res.json();
    alert(data.message);
    setContent("");
    loadInbox();
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    window.location.href = "/login";
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 10 }}>
        <Typography variant="h5" mb={2}>Chat</Typography>
        <Stack spacing={2}>
          <TextField
            label="Send to (username or phone)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            fullWidth
          />
          <TextField
            label="Message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>

        <Typography variant="h6" mt={4}>Inbox</Typography>
        {inbox.map(msg => (
          <Paper key={msg.id} sx={{ p: 2, my: 1 }}>
            <Typography variant="subtitle2">@{msg.sender}</Typography>
            <Typography>{msg.content}</Typography>
            <Typography variant="caption">
              {new Date(msg.created_at).toLocaleString()}
            </Typography>
          </Paper>
        ))}
      </Paper>
      <Stack direction="row" spacing={25} justifyContent="center" sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={() => window.history.back()}>
          ← Back
        </Button>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Stack>
    </Box>
  );
}

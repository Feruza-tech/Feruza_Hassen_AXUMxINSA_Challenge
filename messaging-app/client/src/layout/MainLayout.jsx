import { Box } from "@mui/material";
 export default function MainLayout({ children }) {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Box>
  );
}

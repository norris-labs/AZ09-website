import { Box } from "@mui/material";

export function Debugger({ vars }: any) {
  return (
    <Box sx={{ mb: 4 }}>
      {Object.entries(vars).map(([key, value]) => {
        return (
          <div>
            {key}: {JSON.stringify(value)}
          </div>
        );
      })}
    </Box>
  );
}

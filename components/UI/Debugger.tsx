import { Box, Link, Typography } from "@mui/material";

export function Debugger({ vars }: any) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* {JSON.stringify(vars)} */}
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

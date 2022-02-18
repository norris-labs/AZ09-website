import { Box, Link, Container, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      sx={{
        paddingBottom: "50px",
      }}
    >
      <Container fixed maxWidth="xl">
        <Typography variant="inherit">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                paddingRight: "20px",
              }}
            >
              <Link
                target="_blank"
                sx={{
                  color: "white",
                  textDecorationColor: "white",
                }}
                href={`https://ftmscan.com/address/${process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS}`}
              >
                Dark Collection Contract Address
              </Link>
            </Box>
            <Box
              sx={{
                paddingRight: "20px",
              }}
            >
              <Link
                target="_blank"
                href={`https://ftmscan.com/address/${process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS}`}
                sx={{
                  color: "white",
                  textDecorationColor: "white",
                }}
              >
                Light Collection Contract Address
              </Link>
            </Box>
          </Box>
        </Typography>
      </Container>
    </Box>
  );
}

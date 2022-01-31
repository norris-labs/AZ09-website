import { Link } from "@mui/material";
import Box from "@mui/material/Box";

export function Footer() {
  return (
    <Box
      sx={{
        minHeight: "100px",
        fontSize: "1.25rem",
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
        padding: "25px",
      }}
    >
      <Box>
        AZ09 Contract Address:{" "}
        <Link
          href={`https://ftmscan.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
        >
          {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
        </Link>
        Paintswap Collection:{" "}
        <Link
          href={`https://ftmscan.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
        >
          {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
        </Link>
      </Box>
    </Box>
  );
}

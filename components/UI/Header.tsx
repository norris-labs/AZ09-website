import { Box, Link, Typography } from "@mui/material";

export function Header() {
  return (
    <Box
      sx={{
        my: 10,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          lineHeight: "2.5rem",
          "@media (max-width: 599.95px)": {
            fontSize: "1.75rem",
            lineHeight: "2.35rem",
          },
        }}
      >
        AZ09 is a collection of 2,592 unique, programmatically generated
        monogram{" "}
        <b>
          <Link target="_blank" href="https://ethereum.org/en/nft/">
            NFTs
          </Link>
        </b>{" "}
        on the{" "}
        <b>
          <Link target="_blank" href="https://fantom.foundation/">
            Fantom network
          </Link>
        </b>
        . All Monograms contain two (hand drawn) characters from the
        permutations of A-Z and 0-9. No two monograms are alike. Comes in two
        variations: Dark and Light.
      </Typography>
    </Box>
  );
}

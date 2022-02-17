import React, { useRef } from "react";
import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import { gsap } from "gsap";

const TILE_HEIGHT = 271;
const NUM_TILES = 36;
const MIN_SPINS = 25;

const HeaderText: React.FC = ({ children }) => {
  return (
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
      {children}
    </Typography>
  );
};

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function Header() {
  const slot1 = useRef();
  const slot2 = useRef();

  function spin() {
    if (!slot1.current) return;
    if (!slot2.current) return;

    const r1 = rand(MIN_SPINS, NUM_TILES);
    const y1 = -(TILE_HEIGHT * r1);

    const r2 = rand(MIN_SPINS, NUM_TILES);
    const y2 = -(TILE_HEIGHT * r2);

    gsap.to(slot1.current, {
      duration: 1.1,
      y: y1,
      ease: "elastic.out(2, 0.95)",
    });
    gsap.to(slot2.current, {
      duration: 1.1,
      y: y2,
      ease: "elastic.out(2, 0.95)",
    });
  }
  return (
    <Box
      sx={{
        my: 10,
        mx: "auto",
        maxWidth: "1200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "${TILE_HEIGHT}px",
            height: `${TILE_HEIGHT}px`,
            flexShrink: 0,
            marginRight: "50px",
            overflow: "hidden",
            // background: "black",
            // paddingRight: "30px",
            // paddingLeft: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ paddingRight: "20px" }} className="slot-1" ref={slot1}>
              <Image src={`/slot1.png`} width={145} height={9755} />
            </Box>
            <Box className="slot-2" ref={slot2}>
              <Image src={`/slot1.png`} width={145} height={9755} />
            </Box>
          </Box>
        </Box>
        <HeaderText>
          AZ09 is a collection of 2,592 unique, programmatically generated
          monogram NFTs on the Fantom network.
          <button onClick={spin}>spin</button>
        </HeaderText>
      </Box>
    </Box>
  );
}

//  <b>
// <Link target="_blank" href="https://ethereum.org/en/nft/">
//   NFTs
// </Link>
// </b>{" "}
// on the{" "}
// <b>
// <Link target="_blank" href="https://fantom.foundation/">
//   Fantom network
// </Link>
// </b>
// . All Monograms contain two (hand drawn) characters from the
// permutations of A-Z and 0-9. No two monograms are alike. Comes in two
// variations: Dark and Light.

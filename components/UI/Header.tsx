import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  memo,
} from "react";
import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import { gsap } from "gsap";
import { useIntervalWhen, useInViewRef } from "rooks";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "../../constants";

const TILE_HEIGHT = 271;
const TOTAL_TILES = 26;
const SLOT_HEIGHT = 7045;
const SKIP = 1;

function HeaderComponent() {
  const slot1 = useRef<HTMLDivElement>();
  const slot2 = useRef<HTMLDivElement>();
  const [currentTile, setCurrentTile] = useState(0);
  const [y1, setY1] = useState(0);
  const [y2, setY2] = useState(-SLOT_HEIGHT + TILE_HEIGHT);
  const [headerRef, headerInView] = useInViewRef();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");

  const incrementTile = useCallback(() => {
    const nextTile = currentTile + SKIP;

    if (nextTile >= TOTAL_TILES) {
      setCurrentTile(0);
    } else {
      setCurrentTile(nextTile);
    }

    calcY1Pos();
    calcY2Pos();
  }, [currentTile]);

  const calcY1Pos = useCallback(() => {
    const newYOffet = -1 * (TILE_HEIGHT * currentTile);
    setY1(newYOffet);
  }, [currentTile]);

  const calcY2Pos = useCallback(() => {
    const newYOffet =
      -1 * (SLOT_HEIGHT - TILE_HEIGHT * currentTile) + TILE_HEIGHT;
    setY2(newYOffet);
  }, [currentTile]);

  useLayoutEffect(() => {
    if (!slot1.current) return;
    gsap.to(slot1.current, {
      y: y1,
      ease: "elastic.out(.8, 0.45)",
      duration: ".9",
    });
  }, [y1]);

  useEffect(() => {
    if (!slot2.current) return;
    gsap.to(slot2.current, {
      y: y2,
      ease: "elastic.out(.8, 0.45)",
      duration: ".9",
    });
  }, [y2]);

  useIntervalWhen(
    () => {
      incrementTile();
    },
    2000,
    headerInView,
    true
  );

  return (
    <Box
      sx={{
        my: breakpoint === "mobile" || breakpoint === "tablet" ? 5 : 10,
        mx: "auto",
        maxWidth: "1200px",
      }}
    >
      <Box
        ref={headerRef}
        sx={{
          display: breakpoint === "desktop" ? "flex" : "block",
        }}
      >
        <Box
          sx={{
            width: "${TILE_HEIGHT}px",
            height: `${TILE_HEIGHT}px`,
            flexShrink: 0,
            marginRight: "50px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ paddingRight: "20px" }} className="slot-2" ref={slot2}>
              <Image src={`/slot-min.png`} width={145} height={SLOT_HEIGHT} />
            </Box>
            <Box className="slot-1" ref={slot1}>
              <Image src={`/slot-min.png`} width={145} height={SLOT_HEIGHT} />
            </Box>
          </Box>
        </Box>
        <HeaderText>
          AZ09 is a collection of programmatically generated{" "}
          <Link target="_blank" href="https://ethereum.org/en/nft/">
            NFTs
          </Link>{" "}
          (ERC-721) on the{" "}
          <Link target="_blank" href="https://fantom.foundation/">
            Fantom network
          </Link>
          . AZ09 NFTs contain all the unique permutations of A-Z and 0-9. No
          combination repeated. 2,592 total supply. Comes in two variations:{" "}
          <Link
            target="_blank"
            href={`https://paintswap.finance/marketplace/collections/${process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS}`}
          >
            Dark
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            href={`https://paintswap.finance/marketplace/collections/${process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS}`}
          >
            Light.
          </Link>{" "}
        </HeaderText>
      </Box>
    </Box>
  );
}

const HeaderText: React.FC = ({ children }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      sx={{
        lineHeight: "2.5rem",
        fontWeight: 600,
        paddingTop: "25px",
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

export const Header = memo(HeaderComponent);

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
import { useInterval } from "rooks";

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
      ease: "elastic.out(1, 0.75)",
      duration: ".75",
    });
  }, [y1]);

  useEffect(() => {
    if (!slot2.current) return;
    gsap.to(slot2.current, {
      y: y2,
      ease: "elastic.out(1, 0.75)",
      duration: ".75",
    });
  }, [y2]);

  useInterval(
    () => {
      incrementTile();
    },
    2500,
    true
  );

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
          AZ09 is a collection of 2,592 unique, programmatically generated
          monogram{" "}
          <Link target="_blank" href="https://ethereum.org/en/nft/">
            NFTs
          </Link>{" "}
          on the{" "}
          <Link target="_blank" href="https://fantom.foundation/">
            Fantom network
          </Link>
          . All Monograms contain two characters from the permutations of A-Z
          and 0-9. All monograms are unique. Comes in two variations: Dark and
          Light.{" "}
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

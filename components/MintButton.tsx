import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Link, css } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { TransactionStatus } from "@usedapp/core";
import { memo, useCallback } from "react";

const ButtonBase = css`
  width: 100%;
  box-shadow: none;
  border-radius: 50px;
  padding: 0;
  line-height: 0;
  font-size: 1.25rem;
  min-height: 47px;
  font-weight: 700;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }
`;

type MintButtonProps = {
  txState: TransactionStatus;
  edition: number;
  setActiveMintId: (id: number) => void;
  activeMintId: number | null;
  isNFTMinted: (id: number) => boolean;
};

function MintButtonComponent({
  edition,
  txState,
  setActiveMintId,
  isNFTMinted,
  activeMintId,
}: MintButtonProps) {
  const handleMintBtnClick = useCallback(() => {
    setActiveMintId(edition);
  }, [edition]);

  if (txState?.status === "PendingSignature" && activeMintId === edition) {
    return (
      <CustomLoadingButton
        loading
        variant="contained"
        loadingIndicator={
          <CircularProgress sx={{ color: "black", fill: "black" }} size={23} />
        }
        disabled={false}
      >
        Waiting for signature
      </CustomLoadingButton>
    );
  }

  return isNFTMinted(edition) ? (
    <LinkButton
      href={`${process.env.NEXT_PUBLIC_PAINTSWAP_COLLECTION_URL}/${edition}`}
      target="_blank"
    >
      View on PaintSwap
    </LinkButton>
  ) : (
    <ActionButton variant="contained" onClick={handleMintBtnClick}>
      {process.env.NEXT_PUBLIC_USE_SUDO_MINT ? "Sudo Mint" : "Mint"}
    </ActionButton>
  );
}

export const MintButton = memo(MintButtonComponent);

export const ActionButton = styled(Button)`
  ${ButtonBase}
  .Mui-disabled {
    background: #c8c6c5;
  }
`;

export const LinkButton = styled(Link)`
  ${ButtonBase}
  display: flex;
  font-size: 1.1rem;
  justify-content: space-around;
  align-items: center;
  background: #8d8d8d;
  color: white;
  &:hover,
  &:active,
  &:focus {
    background: #6e6e6e;
    box-shadow: none;
  }
  .Mui-disabled {
    background: #c8c6c5;
  }
`;

export const CustomLoadingButton = styled(LoadingButton)`
  ${ButtonBase}
  font-size: 1.4rem !important;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }

  .Mui-disabled {
    background: #c8c6c5;
  }
`;

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Link } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { TransactionStatus } from "@usedapp/core";
import { memo, useCallback } from "react";

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
          <CircularProgress sx={{ color: "black", fill: "black" }} size={16} />
        }
        disabled={false}
      >
        Waiting for signature
      </CustomLoadingButton>
    );
  }

  return isNFTMinted(edition) ? (
    <CustomButtonSecondary
      href={`${process.env.NEXT_PUBLIC_PAINTSWAP_COLLECTION_URL}/${edition}`}
      target="_blank"
      variant="contained"
      endIcon={<OpenInNewIcon />}
    >
      Already Minted
    </CustomButtonSecondary>
  ) : (
    <CustomButton variant="contained" onClick={handleMintBtnClick}>
      {process.env.NEXT_PUBLIC_USE_SUDO_MINT ? "Sudo Mint" : "Mint"}
    </CustomButton>
  );
}

export const MintButton = memo(MintButtonComponent);

export const CustomButton = styled(Button)`
  width: 100%;
  box-shadow: none;
  border-radius: 50px;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 6px;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }

  .Mui-disabled {
    background: #c8c6c5;
  }
`;

export const CustomButtonSecondary = styled(Link)`
  width: 100%;
  box-shadow: none;
  padding: 12px;
  background: #8d8d8d;
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
  box-shadow: none;
  width: 100%;
  padding: 12px;
  &:hover,
  &:active,
  &:focus {
    box-shadow: none;
  }

  .Mui-disabled {
    background: #c8c6c5;
  }
`;

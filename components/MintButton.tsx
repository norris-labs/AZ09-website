import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Link } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { TransactionStatus } from "@usedapp/core";

export function MintButton({
  item,
  txState,
  setActiveMintId,
  isNFTMinted,
  sendSudoMintTX,
  activeMintId,
}: MintButtonProps) {
  if (txState?.status === "PendingSignature" && activeMintId === item.edition) {
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

  return isNFTMinted(item.edition) ? (
    <CustomButtonSecondary
      href={`${process.env.NEXT_PUBLIC_PAINTSWAP_COLLECTION_URL}/${item.edition}`}
      target="_blank"
      variant="contained"
      endIcon={<OpenInNewIcon />}
    >
      Already Minted
    </CustomButtonSecondary>
  ) : (
    <CustomButton
      variant="contained"
      onClick={() => {
        process.env.NEXT_PUBLIC_USE_SUDO_MINT
          ? sendSudoMintTX(item.edition)
          : setActiveMintId(item.edition);
      }}
    >
      {process.env.NEXT_PUBLIC_USE_SUDO_MINT ? "Sudo Mint" : "Mint"}
    </CustomButton>
  );
}

type MintButtonProps = {
  txState: TransactionStatus;
  item: NFTMetaData;
  setActiveMintId: (id: number) => void;
  sendSudoMintTX: (id: number) => void;
  activeMintId: number | null;
  isNFTMinted: (id: number) => boolean;
};

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

import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { TransactionStatus } from "@usedapp/core";

export const CustomButton = styled(Button)`
  width: 100%;
  box-shadow: none;
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

export const CustomButtonSecondary = styled(Button)`
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

export function MintButton({
  item,
  txState,
  sendMintTX,
  isNFTMinted,
  mintTarget,
}: MintButtonProps) {
  if (txState?.status === "PendingSignature" && mintTarget === item.edition) {
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
      href={process.env.NEXT_PUBLIC_PAINTSWAP_COLLECTION_URL}
      target="_blank"
      variant="contained"
      endIcon={<OpenInNewIcon />}
    >
      Already Minted
    </CustomButtonSecondary>
  ) : (
    <CustomButton variant="contained" onClick={() => sendMintTX(item.edition)}>
      Mint
    </CustomButton>
  );
}

type MintButtonProps = {
  txState: TransactionStatus;
  item: NFTMetaData;
  sendMintTX: (id: number) => void;
  mintTarget: number | null;
  isNFTMinted: (id: number) => boolean;
};

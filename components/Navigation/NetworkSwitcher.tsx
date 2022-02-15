import { useEffect } from "react";
import { useNetwork } from "wagmi";
import { AlertButton } from "../Buttons/AlertButton";
import { AlertState } from "../UI/Alert";
import { ALERT_DISPLAY_SECONDS } from "../../constants";

export const NetworkSwitcher = ({ setAlertState }: NetworkSwitcherProps) => {
  const [
    { data: networkData, error: switchNetworkError },
    switchNetwork,
  ] = useNetwork();

  useEffect(() => {
    if (!switchNetworkError) return;

    let interval: NodeJS.Timer;

    setAlertState({
      type: "error",
      message: switchNetworkError?.message,
      showLoader: false,
    });

    interval = setInterval(() => {
      setAlertState(null);
    }, ALERT_DISPLAY_SECONDS);
  }, [switchNetworkError]);

  return (
    <div>
      {switchNetwork &&
        networkData.chains.map((x) =>
          x.id === networkData.chain?.id ? null : (
            <AlertButton
              disableRipple
              key={x.id}
              onClick={() => switchNetwork(x.id)}
            >
              Switch to {x.name}
            </AlertButton>
          )
        )}
    </div>
  );
};

type NetworkSwitcherProps = {
  setAlertState: (state: AlertState) => void;
};

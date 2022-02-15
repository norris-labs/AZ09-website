import { useEffect } from "react";

import { ALERT_DISPLAY_SECONDS } from "../../constants";
import { GreyButton } from "../Buttons/GreyButton";
import { useConnect } from "wagmi";
import { useIsMounted } from "../../hooks";
import { AlertState } from "../UI/Alert";

type ConnectProps = {
  setAlertState: (state: AlertState) => void;
};

export const Connect = ({ setAlertState }: ConnectProps) => {
  const isMounted = useIsMounted();
  const [{ data, error, loading }, connect] = useConnect();

  useEffect(() => {
    if (!error) return;

    let interval: NodeJS.Timer;

    const message = error?.message ?? "Failed to connect";

    setAlertState({
      type: "error",
      message: message,
      showLoader: false,
    });

    interval = setInterval(() => {
      setAlertState(null);
    }, ALERT_DISPLAY_SECONDS);
  }, [error]);

  return (
    <div>
      <div>
        {data.connectors.map((x) => (
          <GreyButton
            disabled={isMounted && !x.ready}
            key={x.name}
            onClick={() => connect(x)}
          >
            {isMounted && x.ready && "Connect to "}
            {x.id === "injected" ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && " (unsupported) or no wallet detected"}
            {loading && x.name === data.connector?.name && "…"}
          </GreyButton>
        ))}
      </div>
    </div>
  );
};

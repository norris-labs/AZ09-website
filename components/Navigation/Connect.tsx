import * as React from "react";

import { GreyButton } from "../Buttons/GreyButton";
import { useConnect } from "wagmi";
import { useIsMounted } from "../../hooks";

export const Connect = () => {
  const isMounted = useIsMounted();
  const [{ data, error, loading }, connect] = useConnect();

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
      <div>{error && (error?.message ?? "Failed to connect")}</div>
    </div>
  );
};

import { Config, Fantom } from "@usedapp/core";

export const config: Config = {
  autoConnect: true,
  readOnlyChainId: Fantom.chainId,
  networks: [Fantom],
  readOnlyUrls: {
    [Fantom.chainId]: process.env.NEXT_PUBLIC_RPC as string,
  },
};

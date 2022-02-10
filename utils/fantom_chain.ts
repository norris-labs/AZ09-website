import { InjectedConnector } from "wagmi/connectors/injected";
import { Chain } from "wagmi";

const fantomOpera: Chain = {
  id: 250,
  name: "Fantom Opera",
  nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
  rpcUrls: ["https://rpc.ftm.tools"],
  blockExplorers: [
    {
      name: "FTMScan",
      url: "https://ftmscan.com",
    },
  ],
};

export const fantomConnector = new InjectedConnector({
  chains: [fantomOpera],
});

// const fantomTest: Chain = {
//   id: 0xfa2,
//   name: "Fantom Testnet",
//   nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
//   rpcUrls: ["https://rpc.ftm.tools"],
//   blockExplorers: [
//     {
//       name: "FTMScan",
//       url: "https://ftmscan.com",
//     },
//   ],
// };

// export const fantomConnector = new InjectedConnector({
//   chains: [fantomOpera],
// });

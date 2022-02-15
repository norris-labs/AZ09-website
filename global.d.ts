import { Connector, Chain } from "wagmi";

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type NFTMetaData = {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date: number;
  variation: string;
  attributes: Attribute[];
  compiler: string;
  attrString: string;
};

type Attribute = {
  trait_type: string;
  value: string;
};

export type AccountType =
  | {
      address: string;
      connector: Connector<any, any> | undefined;
      ens:
        | {
            avatar: string | null | undefined;
            name: string;
          }
        | undefined;
    }
  | undefined;

type NetworkType = {
  readonly data: {
    readonly chain:
      | {
          id: number;
          unsupported: boolean | undefined;
          name?: string | undefined;
          nativeCurrency?:
            | {
                name: string;
                symbol: string;
                decimals: 18;
              }
            | undefined;
          rpcUrls?: string[] | undefined;
          blockExplorers?: {}[] | undefined;
          testnet?: boolean | undefined;
        }
      | undefined;
    readonly chains: Chain[];
  };
  readonly error: Error | undefined;
  readonly loading: boolean | undefined;
};

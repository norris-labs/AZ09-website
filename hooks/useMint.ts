import AZ09DarkABI from "../abi/AZ09-dark-abi.json";
import AZ09LightABI from "../abi/AZ09-light-abi.json";
import { useContractWrite } from "wagmi";

export function useMint(contractTarget: string) {
  const abi = contractTarget === "dark" ? AZ09DarkABI : AZ09LightABI;
  const address =
    contractTarget === "dark"
      ? (process.env.NEXT_PUBLIC_DARK_CONTRACT_ADDRESS as string)
      : (process.env.NEXT_PUBLIC_LIGHT_CONTRACT_ADDRESS as string);

  const [{ data, error, loading }, write] = useContractWrite(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    "mint"
  );

  return { data, error, loading };
}

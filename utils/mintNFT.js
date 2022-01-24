const rpcUrl = process.env.RPC_URL;
const contractABI = require('../contract-abi.json');
const contractAddress = '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE';
const { Contract } = require('ethers');

// const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

export const mintNFT = async (id) => {

  const contract = new Contract(contractAddress, contractABI);

  try {
    const txHash = await contract.mint(1)
    return {
      success: true,
      status:
        '✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/' +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};

import { useSigner } from "@thirdweb-dev/react";
import { P2P_ABI } from "../ABI/P2P_ABI";
import { P2P_ADDRESS } from "../Contract/Contract_Addresses";

async function P2P_INSTANCE (){
    const signer = useSigner()
    const P2P_CONTRACT_INSTANCE =new ethers.Contract(P2P_ADDRESS, P2P_ABI , signer);
    return P2P_CONTRACT_INSTANCE;
  }

export default P2P_INSTANCE
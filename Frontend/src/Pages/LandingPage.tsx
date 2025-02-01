import * as React from 'react';
import Navbar from '../Components/Navbar';
import { createPublicClient, http } from 'viem';
import CLKTokenJson from '../../../Blockchain/artifacts/contracts/CLKToken.sol/CLKToken.json'
import { lineaSepolia } from 'viem/chains';
import { useAccount, useWriteContract } from 'wagmi';

const publicClient = createPublicClient({ 
    chain: lineaSepolia,
    transport: http()
  })

const LandingPage = () => {
    // const CLKTokenAddress = "0x87ee4878BE588FF208c16EBcf4bd1BA51CcE0B4A" //linea sepolia
    const CLKTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" //hardhat network
    const {writeContract} = useWriteContract();
    const account = useAccount()
    const showBalance = async() => {
        const data = await publicClient.readContract({
            address: CLKTokenAddress,
            abi: CLKTokenJson.abi,
            args: ["0x5D8c93Ccf0C1FEB3b93B6b5D3d4eFFe08c2aF3f2"],
            functionName: 'balanceOf',
          })

          console.log(data)
    }

    const mintToken = async() => {
        const res = writeContract({
            abi: CLKTokenJson.abi,
            address: CLKTokenAddress,
            functionName: "mint",
            args: [account.address, 1000000000000000000n],
            account: account.address
        })
        console.log(res);
    }
    return ( 
    <div className='w-full min-h-screen'>
        <Navbar/>
        <div className='w-full pt-40 flex justify-center items-center'>
            <div>
                {/* <button className='bg-gray-500 text-white rounded-lg p-3 text-xl'>total Supply</button> */}
                <button onClick={showBalance} className='bg-gray-500 text-white rounded-lg p-3 text-xl'>total Supply</button>
                <button onClick={mintToken} className='bg-gray-500 text-white rounded-lg p-3 text-xl'>mint token</button>
            </div>
        </div>
    </div> 
    );
}
 
export default LandingPage;
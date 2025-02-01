import Navbar from '../Components/Navbar';
import { createPublicClient, http } from 'viem';
import { lineaSepolia } from 'viem/chains';
import { useAccount, useWriteContract } from 'wagmi';
import TokenMeasure from '../Components/TokenMeasure';
import LiquidityPoolControl from '../Components/LiquidityPoolControl';

export const publicClient = createPublicClient({ 
    chain: lineaSepolia,
    transport: http()
  })

const LandingPage = () => {
    const account = useAccount()
    const clkTokenAddr = "0x6AFF5e1b5419286fa550C172848c9712abCa910f";
    const mirTokenAddr = "0xe9Be8b2E9Cb6CFa2fDE8839C4608f3B74bA0210D";
    const LpAddr = "0xC6418bafF7c7e345723C871e8b6057C56f59b537";
    
    return ( 
    <div className='w-full min-h-screen'>
        <Navbar/>
        <div className='w-full pt-20 gap-y-4 flex-col flex justify-center items-center'>
            <div className='flex gap-x-4'>
                <div>
                    <TokenMeasure address={clkTokenAddr} account={account} symbol='CLK'/>
                </div>
                <div>
                    <TokenMeasure address={mirTokenAddr} account={account} symbol='MIR'/>
                </div>
            </div>
            <div>
                <LiquidityPoolControl address={LpAddr} account={account} symbol='LP'/>
            </div>
        </div>
    </div> 
    );
}
 
export default LandingPage;
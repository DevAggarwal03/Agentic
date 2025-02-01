import { Config, UseAccountReturnType } from "wagmi";

const LiquidityPoolControl = ({address, account, symbol}: {address: string, account: UseAccountReturnType<Config>, symbol: string}) => {
    return ( 
        <div className="flex flex-col w-full rounded-lg gap-y-2 bg-gray-300 p-3">

            <div className="flex w-full items-center justify-center gap-x-2">
                <div>Contract Address: </div>
                <input type="text" disabled value={address.slice(0, 5) + "..." + address.slice(-5)}/>
            </div>

            <div className="flex w-full flex-col gap-y-1">
                <div className="w-5/12 flex justify-between rounded-lg gap-x-2">
                    <input className="p-1 rounded-lg" placeholder="Amount CLK" id="ClkPoolAmt" type="number" min={50}/>
                    <input className="p-1 rounded-lg" placeholder="Amount MIR" id="MirPoolAmt" type="number" min={50}/>
                </div>
                <button className="bg-slate-400 p-1 rounded-md text-white text-xl">Add Liquidity</button>
            </div>

            <div className="w-full flex flex-col gap-y-1">
                <input id="removeLiquidity" className="p-1 rounded-lg" placeholder="Amount to Remove" type="number" min={50}/>
                <button className="bg-slate-400 p-1 rounded-md text-white text-xl">Remove Liquidity</button>
            </div>

            <div className="w-full flex gap-x-2">
                <div className="w-full flex flex-col gap-y-1">
                    <input id="ClkToMir" className="p-1 rounded-lg" placeholder="Amount of CLK" type="number" min={50}/>
                    <button className="bg-slate-400 p-1 rounded-md text-white text-xl">Swap CLK</button>
                </div>
                <div className="w-full flex flex-col gap-y-1">
                    <input id="MirToClk" className="p-1 rounded-lg" placeholder="Amount of MIR" type="number" min={50}/>
                    <button className="bg-slate-400 p-1 rounded-md text-white text-xl">Swap MIR</button>
                </div>
            </div>

            <div className="flex w-full items-center justify-center gap-x-2">
                <div>balance {symbol}: </div>
                <input type="text" disabled value={address.slice(0, 5) + "..." + address.slice(-5)}/>
            </div>

        </div>
     );
}
 
export default LiquidityPoolControl;
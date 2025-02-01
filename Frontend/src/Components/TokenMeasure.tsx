import { Config, UseAccountReturnType } from "wagmi";

const TokenMeasure = ({address, account, symbol}: {address: string, account: UseAccountReturnType<Config>, symbol: string}) => {
    console.log("contractAddress:" + address);
    console.log("accountAddress: " + account.address);

    const mintToken = () => [
        
    ]

    return ( 
        <div className="flex flex-col w-full rounded-lg gap-y-2 bg-gray-300 p-3">
            <div className="flex w-full items-center justify-center gap-x-2">
                <div>Contract Address: </div>
                <input type="text" disabled value={address.slice(0, 5) + "..." + address.slice(-5)}/>
            </div>
            <div className="w-full flex flex-col gap-y-1">
                <input id="mintAmt" className="p-1 rounded-lg" placeholder="Amount" type="number" min={50}/>
                <button onClick={mintToken} className="bg-slate-400 p-1 rounded-md text-white text-xl">Mint</button>
            </div>
            <div className="flex w-full flex-col gap-y-1">
                <div className="w-5/12 flex justify-between rounded-lg gap-x-2">
                    <input className="p-1 rounded-lg" placeholder="Address" id="toAddress" type="text"/>
                    <input className="p-1 rounded-lg" placeholder="Amount" id="transferAmt" type="number" min={50}/>
                </div>
                <button className="bg-slate-400 p-1 rounded-md text-white text-xl">Transfer</button>
            </div>
            <div className="flex w-full items-center justify-center gap-x-2">
                <div>balance {symbol}: </div>
                <input type="text" disabled value={address.slice(0, 5) + "..." + address.slice(-5)}/>
            </div>
        </div>
     );
}
 
export default TokenMeasure;
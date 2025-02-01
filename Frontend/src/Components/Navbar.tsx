import { ConnectButton, WalletButton } from "@rainbow-me/rainbowkit";


const Navbar = () => {
    return (
        <div>
            <nav className="border border-black p-4 flex justify-between items-center">
                <div className="text-black text-3xl font-bold">DEX</div>
                <div className="space-x-4">
                    <ConnectButton
                        chainStatus="icon"
                        showBalance={true}
                        accountStatus="address"
                    />
                </div>
            </nav>
        </div>
    );
}

export default Navbar

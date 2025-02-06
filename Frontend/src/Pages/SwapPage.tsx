import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { CogIcon } from "@heroicons/react/24/outline";
import { Token, tokens } from "../tokensList";
import { useAccount, useBalance, useReadContracts } from 'wagmi';
import { erc20Abi } from "viem";
import { formatUnits } from "viem";

interface TokenSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token;
}

const SwapPage = () => {
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState<boolean>(false);
  const [isToTokenModalOpen, setIsToTokenModalOpen] = useState<boolean>(false);
  const [fromToken, setFromToken] = useState<Token | undefined>(undefined);
  const [toToken, setToToken] = useState<Token | undefined>(undefined);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [slippage, setSlippage] = useState<string>("0.5");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const { address: userAddress, isConnected } = useAccount();
  const [tokenBalances, setTokenBalances] = useState<{ [key: string]: string }>({});

  // Fetch ETH balance
  const { data: ethBalance } = useBalance({
    address: userAddress
  });

  // Prepare contracts array for useReadContracts
  const contractsToRead = tokens
    .map(token => ({
      address: token.address as `0x${string}`,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    }));


  // Fetch all ERC20 balances in one call
  const { data: balancesData } = useReadContracts({
    contracts: contractsToRead,
    query: {
      enabled: Boolean(isConnected && userAddress),
    },
  });

  // Update balances when data changes
  useEffect(() => {
    if (!isConnected || !userAddress) return;

    const newBalances: { [key: string]: string } = {};
    
   // Set ETH balance
   if (ethBalance) {
    newBalances['0x0000000000000000000000000000000000000000'] = 
      formatUnits(ethBalance.value, ethBalance.decimals);
  }

    // Set ERC20 balances
    balancesData?.forEach((balance, index) => {
      const token = tokens[index + 1]; 
      if (balance.status === 'success' && token) {
        newBalances[token.address] = formatUnits(balance.result as bigint, token.decimals);
      } else {
        if(!token) return;
        newBalances[token.address] = '0.0';
      }
    });

    setTokenBalances(newBalances);
  }, [balancesData, ethBalance, isConnected, userAddress]);

  const TokenSelectModal: React.FC<TokenSelectModalProps> = ({ isOpen, onClose, onSelect, selectedToken }) => {
    if (!isOpen) return null;
  
    const getFormattedBalance = (token: Token): string => {
      const balance = tokenBalances[token.address];
      if (!balance) return '0.0';
      
      // Format to max 6 decimal places
      const formatted = parseFloat(balance).toFixed(6);
      // Remove trailing zeros after decimal
      return formatted.replace(/\.?0+$/, '');
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-800 rounded-3xl p-4 w-[400px] max-h-[600px] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Select Token</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search token name or paste address"
            className="w-full p-3 bg-gray-700 rounded-xl mb-4 text-white outline-none"
          />
  
          <div className="space-y-2">
            {tokens.map((token) => (
              <button
                key={token.address}
                onClick={() => {
                  onSelect({
                    ...token,
                    balance: getFormattedBalance(token)
                  });
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-700 ${
                  selectedToken?.address === token.address ? 'bg-gray-700' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={token.logoURI} alt={token.name} className="w-8 h-8 rounded-full" />
                  <div className="text-left">
                    <div className="text-white font-semibold">{token.symbol}</div>
                    <div className="text-gray-400 text-sm">{token.name}</div>
                  </div>
                </div>
                <div className="text-gray-400">
                  {isConnected ? getFormattedBalance(token) : '—'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value);
    // Add price calculation logic here
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(e.target.value);
    // Add price calculation logic here
  };

  const handleSwap = async () => {
    // Add swap logic here
    console.log('Swapping tokens...');
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-lg mx-auto">
            {/* Swap Container */}
            <div className="bg-gray-800 rounded-3xl p-6">
            <div className="flex justify-between mb-4 items-center">
              <h1 className="text-4xl font-bold">Swap</h1>
              <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <CogIcon className="h-6 w-6 text-gray-400" />
                </button>

                {/* Settings Dialog */}
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-xl p-4 shadow-lg z-50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white font-semibold">Settings</h3>
                      <button 
                        onClick={() => setShowSettings(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-sm text-gray-400">Slippage Tolerance</div>
                      <div className="flex gap-2">
                        {['0.5', '1.0', '1.5'].map((value) => (
                          <button
                            key={value}
                            onClick={() => setSlippage(value)}
                            className={`px-4 py-2 rounded-lg ${
                              slippage === value 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {value}%
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={slippage}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlippage(e.target.value)}
                          className="w-24 px-3 py-2 bg-gray-700 rounded-lg text-white outline-none"
                          placeholder="Custom"
                        />
                        <span className="text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </div>

            <div className="flex flex-col relative gap-y-2">
            
              {/* From Token */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">From</span>
                  <span className="text-gray-400">Balance: {fromToken?.balance || '0.0'}</span>
                </div>
                <div className="bg-gray-700 rounded-2xl p-4">
                  <div className="flex justify-between">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="bg-transparent text-2xl text-white outline-none w-[200px]"
                      value={fromAmount}
                      onChange={handleFromAmountChange}
                    />
                    <button
                      onClick={() => setIsFromTokenModalOpen(true)}
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-2xl"
                    >
                      {fromToken ? (
                        <>
                          <img src={fromToken.logoURI} alt={fromToken.name} className="w-6 h-6 rounded-full" />
                          <span className="text-white font-semibold">{fromToken.symbol}</span>
                        </>
                      ) : (
                        <span className="text-white">Select Token</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Swap Direction Arrow */}
              <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
                <button 
                  onClick={() => {
                    const temp = fromToken;
                    setFromToken(toToken);
                    setToToken(temp);
                  }}
                  className="bg-none p-2 px-3 rounded-xl hover:bg-gray-600"
                >
                  ↓
                </button>
              </div>

              {/* To Token */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">To</span>
                  <span className="text-gray-400">Balance: {toToken?.balance || '0.0'}</span>
                </div>
                <div className="bg-gray-700 rounded-2xl p-4">
                  <div className="flex justify-between">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="bg-transparent text-2xl text-white outline-none w-[200px]"
                      value={toAmount}
                      onChange={handleToAmountChange}
                      readOnly
                    />
                    <button
                      onClick={() => setIsToTokenModalOpen(true)}
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-2xl"
                    >
                      {toToken ? (
                        <>
                          <img src={toToken.logoURI} alt={toToken.name} className="w-6 h-6 rounded-full" />
                          <span className="text-white font-semibold">{toToken.symbol}</span>
                        </>
                      ) : (
                        <span className="text-white">Select Token</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              </div>

              {/* Swap Button */}
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-2xl"
                disabled={!fromToken || !toToken}
                onClick={handleSwap}
              >
                {!fromToken || !toToken ? 'Select tokens' : 'Swap'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Token Select Modals */}
      <TokenSelectModal
        isOpen={isFromTokenModalOpen}
        onClose={() => setIsFromTokenModalOpen(false)}
        onSelect={setFromToken}
        selectedToken={fromToken}
      />
      <TokenSelectModal
        isOpen={isToTokenModalOpen}
        onClose={() => setIsToTokenModalOpen(false)}
        onSelect={setToToken}
        selectedToken={toToken}
      />
    </>
  );
};

export default SwapPage;




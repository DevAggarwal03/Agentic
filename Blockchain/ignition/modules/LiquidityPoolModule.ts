import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// on Linea Sepolia
const CLKTokenAddress = "0x6AFF5e1b5419286fa550C172848c9712abCa910f";
const MIRTokenAddress = "0xe9Be8b2E9Cb6CFa2fDE8839C4608f3B74bA0210D";
// lp contract address: 0xC6418bafF7c7e345723C871e8b6057C56f59b537
const LiquidityPoolModule = buildModule("LiquidityPoolModule", (m) => {

    const clkAddr = m.getParameter("clkAddr", CLKTokenAddress)
    const mirAddr = m.getParameter("mirAddr", MIRTokenAddress)
    const LiquidityPool = m.contract("LiquidityPool", [clkAddr, mirAddr]);

    return { LiquidityPool };
});

export default LiquidityPoolModule;

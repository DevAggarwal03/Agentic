import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CLKTokenAddress = "";
const MIRTokenAddress = "";

const LiquidityPoolModule = buildModule("LiquidityPoolModule", (m) => {

    const clkAddr = m.getParameter("clkAddr", CLKTokenAddress)
    const mirAddr = m.getParameter("mirAddr", MIRTokenAddress)
    const LiquidityPool = m.contract("CLKToken", [clkAddr, mirAddr]);

    return { LiquidityPool };
});

export default LiquidityPoolModule;

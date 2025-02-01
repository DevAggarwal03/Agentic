import hre from "hardhat"
import { ERC20 } from "../typechain-types";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Liquidity Pool", () => {
    async function deployLpFixture() {
        const [firstAcc, secondAcc, thirdAcc, fourthAcc] = await hre.ethers.getSigners();
        const CLKFactory = await hre.ethers.getContractFactory("CLKToken");
        const MIRFactory = await hre.ethers.getContractFactory("MIRToken");
        const CLK = await CLKFactory.deploy();
        const MIR = await MIRFactory.deploy();

        // Deploy Liquidity Pool
        const LiquidityPoolFactory = await hre.ethers.getContractFactory("LiquidityPool");
        const liquidityPool = await LiquidityPoolFactory.deploy(CLK.getAddress(), MIR.getAddress());

        return {liquidityPool, CLK, MIR, firstAcc, secondAcc, thirdAcc, fourthAcc};
    }

    it("creates LP Token", async() => {
        const {liquidityPool, CLK, MIR, firstAcc} = await loadFixture(deployLpFixture)
        const symbol = await liquidityPool.symbol();
        expect(symbol).to.equal('LP');
    })

    it("adds liquidity to the LP", async() => {
        const {CLK, MIR, liquidityPool, firstAcc} = await loadFixture(deployLpFixture);
        await CLK.mint(1000000);
        await MIR.mint(1000000);

        await CLK.connect(firstAcc).approve(liquidityPool.getAddress(), 100000);
        await MIR.connect(firstAcc).approve(liquidityPool.getAddress(), 100000);

        await liquidityPool.addLiquidity(100000, 100000);
        const LpBalace = await liquidityPool.balanceOf(firstAcc);
        expect(LpBalace).to.equal(100000);
    })

    it("removes Liquidity", async() => {
        const {liquidityPool, CLK, MIR, firstAcc} = await loadFixture(deployLpFixture)
        await CLK.mint(1000000);
        await MIR.mint(1000000);

        await CLK.connect(firstAcc).approve(liquidityPool.getAddress(), 100000);
        await MIR.connect(firstAcc).approve(liquidityPool.getAddress(), 100000);

        await liquidityPool.addLiquidity(100000, 100000);

        await liquidityPool.removeLiquidity(50000);
        const clkBalance = await CLK.balanceOf(firstAcc);
        const mirBalance = await CLK.balanceOf(firstAcc);
        expect(clkBalance).to.greaterThan(1000);
        expect(mirBalance).to.greaterThan(10000);
        expect((await liquidityPool.balanceOf(firstAcc))).to.lessThan(60000);
    }) 

    it("swaps")
})
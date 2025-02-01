import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const oneMil: bigint = 1_000_000_000_000_000_000_000_000_000n;

const CLKTokenModule = buildModule("LockModule", (m) => {
  // const totalSupply = m.getParameter("totalSupply", oneMil);

  const CLKToken = m.contract("CLKToken",);

  return { CLKToken };
});

export default CLKTokenModule;

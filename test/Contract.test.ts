import Web3 from 'web3';

import { getCollateralPoolContractAddressAsync } from '../src/lib/Contract';

// Types
import { MarketContract, MarketContractRegistry } from '@marketprotocol/types';

// Testing variables
const PROVIDER_URL_RINKEBY = 'https://rinkeby.infura.io/cbHh1p8RT4Q6E97F4gVi';
const MARKET_CONTRACT_ADDRESS = '0x0c6b44155a305bd611492ba3165fbfa6e59681b3';
const COLLATERAL_POOL_ADDRESS = '0x3bb28ea157d178da4f4b1e194f5b9a9a6c8397a0';
const REGISTRY_CONTRACT_ADDRESS = '0x4bc60737323fd065d99c726ca2c0fad0d1077a60';

/**
 * Contract
 */
describe('Contract class', () => {
  it('Has getCollateralPoolContractAddressAsync function', () => {
    expect(typeof getCollateralPoolContractAddressAsync).toEqual('function');
  });
  it('Can retrieve collateral pool address', async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_RINKEBY));
    const marketContract: MarketContract = new MarketContract(web3, MARKET_CONTRACT_ADDRESS);
    const poolAddress = await marketContract.MARKET_COLLATERAL_POOL_ADDRESS;
    expect(poolAddress).toEqual(COLLATERAL_POOL_ADDRESS);
  });
  it('Contract is found in whitelist', async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_RINKEBY));
    const marketContractRegistry: MarketContractRegistry = new MarketContractRegistry(
      web3,
      REGISTRY_CONTRACT_ADDRESS
    );
    const whitelist = await marketContractRegistry.getAddressWhiteList;
    expect(whitelist).toContain(MARKET_CONTRACT_ADDRESS);
  });
});

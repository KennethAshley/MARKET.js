import Web3 from 'web3';

// Types
import { Provider } from '@0xproject/types';
import { ITxParams, MarketContract, MarketContractRegistry } from '@marketprotocol/types';

/**
 * Add an address to the whitelist.
 * @param {Provider} provider                       Web3 provider instance
 * @param {string} marketRegistryContractAddress    Address of the Market Registry contract
 * @param {string} marketContractAddress            Address of the Market contract to add
 * @returns {Promise<boolean>}                      Returns true/false on success/failure
 */
export async function addAddressToWhiteList(
  provider: Provider,
  marketRegistryContractAddress: string,
  contractAddress: string,
  txParams: ITxParams = {}
): Promise<boolean> {
  // Setup the provider
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  // Get the Market contract registry
  const marketContractRegistry: MarketContractRegistry = await MarketContractRegistry.createAndValidate(
    web3,
    marketRegistryContractAddress
  );

  try {
    // Add the contract address to the whitelist
    await marketContractRegistry.addAddressToWhiteListTx(contractAddress).send(txParams);
    return true;
  } catch (error) {
    console.log(error);
    return false; // TODO Need better error handling
  }
}

/**
 * Get all whilelisted contracts
 * @param {Provider} provider                       Web3 provider instance
 * @param {string} marketRegistryContractAddress    Address of the Market Registry contract
 * @returns {Promise<string[] | null>}              An array of whitelisted addresses or null
 */
export async function getAddressWhiteListAsync(
  provider: Provider,
  marketRegistryContractAddress: string
): Promise<string[] | null> {
  // Setup the provider
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  // Get the Market contract registry
  const marketContractRegistry: MarketContractRegistry = await MarketContractRegistry.createAndValidate(
    web3,
    marketRegistryContractAddress
  );

  try {
    // Retrieve the whitelist
    const getAddressWhiteListResult = await marketContractRegistry.getAddressWhiteList;
    return getAddressWhiteListResult;
  } catch (error) {
    console.log(error);
    return null; // TODO Need better error handling
  }
}

/**
 * Gets the collateral pool contract address
 * @param {Provider} provider               Web3 provider instance
 * @param {string} marketContractAddress    Address of the Market contract
 * @returns {Promise<string | null>}        The collateral pool contract address or null
 */
export async function getCollateralPoolContractAddressAsync(
  provider: Provider,
  marketContractAddress: string
): Promise<string | null> {
  // Setup the provider
  const web3: Web3 = new Web3();
  web3.setProvider(provider);

  // Get the MarketContract
  const marketContract: MarketContract = await MarketContract.createAndValidate(
    web3,
    marketContractAddress
  );

  try {
    // Retrieve the collateral pool contract address
    const collateralPoolContractAddress = await marketContract.MARKET_COLLATERAL_POOL_ADDRESS;
    return collateralPoolContractAddress;
  } catch (error) {
    console.log(error);
    return null; // TODO Need better error handling
  }
}

import { readFileSync } from 'fs';
import { sdk } from './helpers.js';

async function main() {
    const bundleModuleAddress = '0xE39315D11B2A8CbBC50dB2e1F77d4e74Ef2c5b1e'; // your bundle module address
    const bundleModule = sdk.getBundleModule(bundleModuleAddress);

    const packModuleAddress = '0xc3F6B1b8Fe9551Ad260514f1038b3354045bC2f0'; // your pack module address
    const packModule = sdk.getPackModule(packModuleAddress);

    console.log('Getting all NFTs from bundle...');
    const nftsInBundle = await bundleModule.getAll();

    console.log('NFTs in bundle:');
    console.log(nftsInBundle);

    console.log('Creating a pack containing the NFTs from bundle...');
    const created = await packModule.create({
        assetContract: bundleModuleAddress,
        metadata: {
            name: 'Fancy Cars Pack!',
            image: readFileSync('./assets/fancy-cars.jpeg'),
        },
        assets: nftsInBundle.map(nft => ({
            tokenId: nft.metadata.id,
            amount: nft.supply,
        })),
    });

    console.log('Pack created!')
    console.log(created);
}

try {
    await main();
} catch (error) {
    console.error("Error minting the NFTs", error);
    process.exit(1);
}
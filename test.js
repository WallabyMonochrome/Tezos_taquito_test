import { InMemorySigner, importKey } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { code, getStorage } from './contracts/spv.js';
const Tezos = new TezosToolkit('https://rpc.ghostnet.teztnets.xyz/');

Tezos.setProvider({
    signer: new InMemorySigner('ACCOUNT_PK'),
});

const account = await Tezos.signer.publicKeyHash();
const balance = await Tezos.tz.getBalance(account);
console.log('Account balance', balance, account);

async function main() {
    const operation = await Tezos.contract.originate({
        code: code,
        init: getStorage(account, 100000),
    });
    console.log(`Waiting for confirmation of origination...`);
    const contract = await operation.contract();
    console.log(`Waiting for confirmation of origination...`, contract);
}

main();
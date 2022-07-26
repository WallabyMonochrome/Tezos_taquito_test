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

Tezos.contract.originate({
    code,
    init: getStorage('tz1LykkvktD4bc4Voh7JWWWNspKAsUvBtC8o', 100000),
})
    .then((originationOp) => {
        println(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
        return originationOp.contract();
    })
    .then((contract) => {
        console.log(`Origination completed.`, contract);
    })
    .catch((error) => console.error(`Error: ${JSON.stringify(error, null)}`));
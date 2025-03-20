import { ApiPromise, WsProvider } from '@polkadot/api'

let api: ApiPromise;

export const connectTo5ire = async () => {
    if (!api) {
        const wsProvider = new WsProvider("wss://rpc.testnet.5ire.network");
        api = await ApiPromise.create({ provider: wsProvider });
    }
    return api;
}
export const fetchStakingData = async () => {
    try {
        const api = await connectTo5ire();
        const [totalMembers, minJoin, totalPools, minCreate] = await Promise.all([
            api.query.nominationPools.counterForPoolMembers(),
            api.query.nominationPools.minJoinBond(),
            api.query.nominationPools.counterForBondedPools(),
            api.query.nominationPools.minCreateBond()
        ]);

        return {
            totalPoolMembers: totalMembers.toString(),
            minimumJoinAmount: (Number(minJoin.toString()) / Math.pow(10, 18)).toFixed(4) + ' 5IRE',
            totalActivePools: totalPools.toString(),
            minimumCreateAmount: (Number(minCreate.toString()) / Math.pow(10, 18)).toFixed(4) + ' 5IRE'
        };

    } catch (error) {
        console.error('Error fetching staking data:', error);
        return null;
    }
};
export const truncateAddress = (walletAddress: string) => {
    const startLength = 6;
    const endLength = 4;

    const start = walletAddress.substring(0, startLength);
    const end = walletAddress.substring(walletAddress.length - endLength);

    return `${start}....${end}`;
}

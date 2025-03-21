// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract BettingApp {
    mapping(address => uint256) public playerBalances;
    uint256 public poolBalance;
    address public owner;

    struct Bet {
        address player;
        uint256 amount;
        bool isResolved;
        bool isCheckedOut;
    }
    Bet[] public bets;

    mapping(address => uint256[]) public userBets;

    event BetPlaced(
        uint256 indexed betIndex,
        address indexed player,
        uint256 amount
    );
    event BetResolved(
        uint256 indexed betIndex,
        address indexed player,
        uint256 amount,
        bool isCheckedOut
    );
    event FundsDeposited(address indexed player, uint256 amount);
    event FundsWithdrawn(address indexed player, uint256 amount);
    event PoolWithdrawn(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function deposit() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        playerBalances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function placeBet(uint256 amount) external {
        require(playerBalances[msg.sender] >= amount, "Insufficient balance");
        playerBalances[msg.sender] -= amount;
        poolBalance += amount;

        bets.push(
            Bet({
                player: msg.sender,
                amount: amount,
                isResolved: false,
                isCheckedOut: false
            })
        );

        userBets[msg.sender].push(bets.length - 1);
        emit BetPlaced(bets.length - 1, msg.sender, amount);
    }

    function resolveBet(uint256 betIndex, bool isCheckedOut) external {
        require(betIndex < bets.length, "Invalid bet index");
        Bet storage bet = bets[betIndex];
        require(!bet.isResolved, "Bet already resolved");
        require(bet.player == msg.sender, "You can only resolve your own bets");

        bet.isResolved = true;
        bet.isCheckedOut = isCheckedOut;

        if (isCheckedOut) {
            uint256 payout = bet.amount * 2;
            require(poolBalance >= payout, "Insufficient pool balance");
            poolBalance -= payout;
            playerBalances[bet.player] += payout;
        }

        emit BetResolved(betIndex, bet.player, bet.amount, isCheckedOut);
    }

    function withdraw(uint256 amount) external {
        require(playerBalances[msg.sender] >= amount, "Insufficient balance");
        playerBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }

    function withdrawPool() external onlyOwner {
        uint256 amount = poolBalance;
        poolBalance = 0;
        payable(owner).transfer(amount);
        emit PoolWithdrawn(owner, amount);
    }

    function getTotalBets() external view returns (uint256) {
        return bets.length;
    }

    function getBet(
        uint256 betIndex
    )
        external
        view
        returns (
            address player,
            uint256 amount,
            bool isResolved,
            bool isCheckedOut
        )
    {
        require(betIndex < bets.length, "Invalid bet index");
        Bet storage bet = bets[betIndex];
        return (bet.player, bet.amount, bet.isResolved, bet.isCheckedOut);
    }

    function getMyBets() external view returns (uint256[] memory) {
        return userBets[msg.sender];
    }

    function getMyLatestActiveBet()
        external
        view
        returns (
            uint256 betIndex,
            uint256 amount,
            bool isResolved,
            bool isCheckedOut
        )
    {
        uint256[] memory myBets = userBets[msg.sender];

        for (uint256 i = myBets.length; i > 0; i--) {
            uint256 index = myBets[i - 1];
            Bet storage bet = bets[index];

            if (!bet.isResolved) {
                return (index, bet.amount, bet.isResolved, bet.isCheckedOut);
            }
        }

        revert("No active bet found");
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BettingApp {
    mapping(address => uint256) public playerBalances;
    uint256 public poolBalance;
    address public owner;

    struct Bet {
        address player;
        uint256 amount;
        bool isResolved;
        bool isCheckedOut;
    }
    Bet[] public bets;

    mapping(address => uint256[]) public userBets;

    event BetPlaced(
        uint256 indexed betIndex,
        address indexed player,
        uint256 amount
    );
    event BetResolved(
        uint256 indexed betIndex,
        address indexed player,
        uint256 amount,
        bool isCheckedOut
    );
    event FundsDeposited(address indexed player, uint256 amount);
    event FundsWithdrawn(address indexed player, uint256 amount);
    event PoolWithdrawn(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function deposit() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        playerBalances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function placeBet(uint256 amount) external {
        require(playerBalances[msg.sender] >= amount, "Insufficient balance");
        playerBalances[msg.sender] -= amount;
        poolBalance += amount;

        bets.push(
            Bet({
                player: msg.sender,
                amount: amount,
                isResolved: false,
                isCheckedOut: false
            })
        );

        userBets[msg.sender].push(bets.length - 1);
        emit BetPlaced(bets.length - 1, msg.sender, amount);
    }

    function resolveBet(uint256 betIndex, bool isCheckedOut) external {
        require(betIndex < bets.length, "Invalid bet index");
        Bet storage bet = bets[betIndex];
        require(!bet.isResolved, "Bet already resolved");
        require(bet.player == msg.sender, "You can only resolve your own bets");

        bet.isResolved = true;
        bet.isCheckedOut = isCheckedOut;

        if (isCheckedOut) {
            uint256 payout = bet.amount * 2;
            require(poolBalance >= payout, "Insufficient pool balance");
            poolBalance -= payout;
            playerBalances[bet.player] += payout;
        }

        emit BetResolved(betIndex, bet.player, bet.amount, isCheckedOut);
    }

    function withdraw(uint256 amount) external {
        require(playerBalances[msg.sender] >= amount, "Insufficient balance");
        playerBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }

    function withdrawPool() external onlyOwner {
        uint256 amount = poolBalance;
        poolBalance = 0;
        payable(owner).transfer(amount);
        emit PoolWithdrawn(owner, amount);
    }

    function getTotalBets() external view returns (uint256) {
        return bets.length;
    }

    function getBet(
        uint256 betIndex
    )
        external
        view
        returns (
            address player,
            uint256 amount,
            bool isResolved,
            bool isCheckedOut
        )
    {
        require(betIndex < bets.length, "Invalid bet index");
        Bet storage bet = bets[betIndex];
        return (bet.player, bet.amount, bet.isResolved, bet.isCheckedOut);
    }

    function getMyBets() external view returns (uint256[] memory) {
        return userBets[msg.sender];
    }

    function getMyLatestActiveBet()
        external
        view
        returns (
            uint256 betIndex,
            uint256 amount,
            bool isResolved,
            bool isCheckedOut
        )
    {
        uint256[] memory myBets = userBets[msg.sender];

        for (uint256 i = myBets.length; i > 0; i--) {
            uint256 index = myBets[i - 1];
            Bet storage bet = bets[index];

            if (!bet.isResolved) {
                return (index, bet.amount, bet.isResolved, bet.isCheckedOut);
            }
        }

        revert("No active bets found");
    }
}

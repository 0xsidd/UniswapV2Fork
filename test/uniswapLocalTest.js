const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    let signer;
    let uniswapV2Router;
    let uniswapV2Factory;
    let uniswapV2Pair;
    let tokenA;
    let tokenB;
    let getInit;
    let initHash;
    let weth;
    let lpToken;
    let lpTokenAddress = '0xedad896c12238e6f285e64ac52f08a3a0cf04d85';
    let lpTokenContract;
    let lpTokenAbi = [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"minter_","type":"address"},{"internalType":"uint256","name":"mintingAllowedAfter_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"address","name":"newMinter","type":"address"}],"name":"MinterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint96","name":"votes","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumTimeBetweenMints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"mintCap","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mintingAllowedAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter_","type":"address"}],"name":"setMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
   

    const TOKEN_A_AMOUNT = ethers.utils.parseEther("100000");
    const amountIn = ethers.utils.parseEther("100");
    const amountInq = ethers.utils.parseEther("100");
    const TOKEN_B_AMOUNT = ethers.utils.parseEther("100000");
    

    beforeEach(async()=>{
        signer = await ethers.getSigners();
        lpTokenContract = new ethers.Contract(lpTokenAddress, lpTokenAbi,signer[0]);
        const GetInit = await ethers.getContractFactory("CalHash");
        getInit = await GetInit.deploy();
        initHash = await getInit.connect(signer[0]).getInitHash();

        const LpToken = await ethers.getContractFactory("UniswapV2ERC20");
        lpToken = await LpToken.deploy();

        const WETH = await ethers.getContractFactory("WETH9");
        weth = await WETH.deploy();
  
        const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
        uniswapV2Factory = await UniswapV2Factory.connect(signer[0]).deploy(signer[0].address);

        const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
        uniswapV2Pair = await UniswapV2Pair.connect(signer[0]).deploy();
  
        const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router01");
        uniswapV2Router = await UniswapV2Router.connect(signer[0]).deploy(uniswapV2Factory.address,weth.address);
  
        const TokenA = await ethers.getContractFactory("TokenA");
        tokenA = await TokenA.deploy();
  
        const TokenB = await ethers.getContractFactory("TokenB");
        tokenB = await TokenB.deploy();

        

        
    })
    it("Deployment should assign the total supply ", async function () {
        console.log(initHash);
        await uniswapV2Factory.connect(signer[0]).setFeeTo(signer[4].address);
        await uniswapV2Factory.connect(signer[0]).setFeeToSetter(signer[4].address);
        await tokenA.connect(signer[0]).approve(uniswapV2Router.address,TOKEN_A_AMOUNT);
        await tokenB.connect(signer[0]).approve(uniswapV2Router.address,TOKEN_B_AMOUNT);
        await uniswapV2Router.connect(signer[0]).addLiquidity(tokenA.address,tokenB.address,TOKEN_A_AMOUNT,TOKEN_B_AMOUNT,1,1,signer[0].address, 1664541741);
        
        // console.log(await lpTokenContract.balanceOf(signer[0].address));
        await tokenA.connect(signer[0]).approve(uniswapV2Router.address,amountInq);
        await uniswapV2Router.connect(signer[0]).swapExactTokensForTokens(amountIn,1,[tokenA.address,tokenB.address],signer[0].address,signer[2].address, 1664541741);



        console.log(await lpTokenContract.balanceOf(signer[4].address));

        await tokenA.connect(signer[0]).approve(uniswapV2Router.address,TOKEN_A_AMOUNT);
        await tokenB.connect(signer[0]).approve(uniswapV2Router.address,TOKEN_B_AMOUNT);
        await uniswapV2Router.connect(signer[0]).addLiquidity(tokenA.address,tokenB.address,TOKEN_A_AMOUNT,TOKEN_B_AMOUNT,1,1,signer[0].address, 1664541741);

        // await uniswapV2Router.connect(signer[0]).swapExactTokensForTokens(amountIn,1,[tokenA.address,tokenB.address],signer[0].address,signer[2].address, 1664541741);
        // await uniswapV2Router.connect(signer[0]).swapExactTokensForTokens(amountIn,1,[tokenA.address,tokenB.address],signer[0].address,signer[2].address, 1664541741);
        console.log(await lpTokenContract.balanceOf(signer[4].address));
 
    });
  });
  
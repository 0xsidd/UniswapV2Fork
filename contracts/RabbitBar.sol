// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// RabbitBar is the coolest bar in town. You come in with some Rabbit, and leave with more! The longer you stay, the more Rabbit you get.
//
// This contract handles swapping to and from xRS, RabbitSwap's staking token.
contract RabbitBar is ERC20("RabbitBar", "xRS"){
    using SafeMath for uint256;
    IERC20 public rabbit;

    // Define the Rabbit token contract
    constructor(IERC20 _rabbit) {
        rabbit = _rabbit;
    }

    // Enter the bar. Pay some RABBITs. Earn some shares.
    // Locks Rabbit and mints xRS
    function enter(uint256 _amount) public {
        // Gets the amount of Rabbit locked in the contract
        uint256 totalRabbit = rabbit.balanceOf(address(this));
        // Gets the amount of xRS in existence
        uint256 totalShares = totalSupply();
        // If no xRS exists, mint it 1:1 to the amount put in
        if (totalShares == 0 || totalRabbit == 0) {
            _mint(msg.sender, _amount);
        } 
        // Calculate and mint the amount of xRS the Rabbit is worth. The ratio will change overtime, as xRS is burned/minted and Rabbit deposited + gained from fees / withdrawn.
        else {
            uint256 what = _amount.mul(totalShares).div(totalRabbit);
            _mint(msg.sender, what);
        }
        // Lock the Rabbit in the contract
        rabbit.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your RABBITs.
    // Unlocks the staked + gained Rabbit and burns xRS
    function leave(uint256 _share) public {
        // Gets the amount of xRS in existence
        uint256 totalShares = totalSupply();
        // Calculates the amount of Rabbit the xRS is worth
        uint256 what = _share.mul(rabbit.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        rabbit.transfer(msg.sender, what);
    }
}

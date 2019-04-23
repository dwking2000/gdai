pragma solidity ^0.5.2;

import "./ERC20TransferFee.sol";

/**
 * @title ERC20Wrappable
 * @dev ERC20 wrapping and unwrapping logic.
 */

contract GDAI is ERC20TransferFee {
   
    string constant private _name = "Green Dai";

    string constant private _symbol = "GDAI";

    uint8 constant private _decimals = 18;

    uint8 constant private _wrapFee = 100;

    uint8 constant private _unwrapFee = 0;
    
    event Wrap(address indexed by, uint256 value, uint256 fee);
    
    event Unwrap(address indexed by, uint256 value, uint256 fee);
    
    /**
     * @return the name of the token.
     */
    function name() public pure returns (string memory) {
        return _name;
    }

    /**
     * @return the symbol of the token.
     */
    function symbol() public pure returns (string memory) {
        return _symbol;
    }

    /**
     * @return the number of decimals of the token.
     */
    function decimals() public pure returns (uint8) {
        return _decimals;
    }

    /**
     * @return the wrap fee for the token.
     */
    function wrapFee() public pure returns (uint8) {
        return _wrapFee;
    }

    /**
     * @return the unwrap fee for the token.
     */
    function unwrapFee() public pure returns (uint8) {
        return _unwrapFee;
    }

    /**
     * @dev Function to wrap tokens
     * @param value The amount of tokens to wrap.
     * @return A boolean that indicates if the operation was successful.
     */
    function wrap(uint256 value) public returns (bool) {
        IERC20(_wrappedToken).transferFrom(msg.sender,address(this), value);
        uint256 fee = _payFee(value, _wrapFee);
        _mint(msg.sender, value.sub(fee));
        emit Wrap(msg.sender, value, fee);
        return true;
    }
    
    /**
     * @dev Function to unwrap tokens
     * @param value The amount of tokens to wrap.
     * @return A boolean that indicates if the operation was successful.
     */
    function unwrap(uint256 value) public returns (bool) {
        uint256 fee = _payFee(value, _unwrapFee);
        _burn(msg.sender, value);
        IERC20(_wrappedToken).transfer(msg.sender, value.sub(fee));
        emit Unwrap(msg.sender, value, fee);
        return true;
    }
    
    
}

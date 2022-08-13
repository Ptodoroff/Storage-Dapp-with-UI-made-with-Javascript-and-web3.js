pragma solidity 0.8.15;

contract Storage {
 uint[] public ids;

function add (uint _id) public {
  ids.push(_id);
}

function get (uint _index) external view  returns (uint arrayElement) {
    arrayElement= ids[_index];
    return arrayElement;

}


function getAll () external  view returns (uint[] memory) {
    return ids;
}

function arrayLength () public view returns (uint) {
    return ids.length;
}
}
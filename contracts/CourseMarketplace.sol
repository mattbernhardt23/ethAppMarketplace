// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Create our CourseMarketplace contract
contract CourseMarketPlace {
    // Enums are user-defined data types that restrict the variable to have only one of the predifined vales.
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    // Structs are similar to JS Objects. They essentially allow you to create more complicated data types that have multiple properties.
    struct Course {
        uint256 id;
        uint256 price;
        // The proof is unique to the user. The proof will be sent in the purchase request. The proof will identify the user without revealing the user identity.
        bytes32 proof;
        address owner;
        State state;
        // Each of these are slots in storage. All are 32 bits, except address is 20, and State is 1, so they will share a slot.
    }

    //Mappings are hash tables that store data as key-value pairs.
    // Below is a mapping of a course-hash to an individual course
    mapping(bytes32 => Course) private ownedCourses;
    // Below is a mapping of the courseId and courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    // number of all courses owned, and the id of each course
    uint256 private totalOwnedCourses;

    //Makes it so that owner address can receive ether
    address payable private owner;

    //Establishes ownership of the contract upon deployment.
    constructor() {
        setContractOwner(msg.sender);
    }

    // Note: the comment below will actually be sent along with the error message.
    /// Course already been purchased
    error CourseHasOwner();

    ///ONly owner has access to this function
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    // This file follows the style guide for how to place your functions within a contract.
    // This function allows us to store courses that users have purchased.
    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        // Create the course hash
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        // Checks to see if the user has already purchsed the course
        if (courseIsOwned(courseHash)) {
            revert CourseHasOwner();
        }
        // Increment the total owned courses, as well as create the course id.
        uint256 id = totalOwnedCourses++;
        // In our mapping at the index of "id", we will store the course hash
        ownedCourseHash[id] = courseHash;
        //In the mapping of owned courses, we will use the courseHash as the key to access the course we just purchased, the following course data.
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    // Quick Note regarding returns(Course memory), the Struct that is returned by this function must be declared as bing stored in memory because they exist only inside the calling function.
    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    // Helper function for our purchaseCourse function that will stop that function if the course has already been purchased.
    function courseIsOwned(bytes32 courseHash) private view returns (bool) {
        //uses the address of the owner extracted from the courseHash and compares it with the address of the sender of the function.
        return ownedCourses[courseHash].owner == msg.sender;
    }
}

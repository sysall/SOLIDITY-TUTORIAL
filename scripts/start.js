async function main() {
    const [owner, somebodyElse] = await hre.ethers.getSigners();
    const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
    const keyboardsContract = await keyboardsContractFactory.deploy();
    //Everything that writes to the blockchain is a transaction, including deploying a contract. And we always have to wait for a transaction to be mined!
    await keyboardsContract.deployed();
  
    //console.log("Contract deployed to:", keyboardsContract.address);
  
    //let keyboards = await keyboardsContract.getKeyboards();

    //const keyboards = await keyboardsContract.createdKeyboards;
    //an array variable is actually a function, and it takes an index as a parameter and returns the item at that index.

    //console.log("We got the keyboards!", keyboards);

    //updating the state of a variable in a contract updates it for everyone
    //const keyboardTxn = await keyboardsContract.create("A really great keyboard!");
    //await keyboardTxn.wait();

    //keyboards = await keyboardsContract.getKeyboards();
    //console.log("We got the keyboards!", keyboards);

    //multiple users
    //Both users can request the list of keyboards, and will receive the same value. Remember that this state belongs to the contract!
    const keyboardTxn1 = await keyboardsContract.create("A really great keyboard!");
    await keyboardTxn1.wait();

    const keyboardTx2 = await keyboardsContract.connect(somebodyElse).create("An even better keyboard!");
    await keyboardTx2.wait();

    keyboards = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboards);

    keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards();
    console.log("And as somebody else!", keyboards);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
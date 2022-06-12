const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const ethers = require('ethers');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_URL);

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

app.get('/balance/:address', async (req, res) => {
  const {address} = req.params;
  const balance = await provider.getBalance(address);
  
  // determine if address is EOA or contract
  const code = await provider.getCode(address);
  let addressType = 'This address is a '
  if (code == '0x')
    addressType += '<b>WALLET!</b>';
  else addressType += '<b>CONTRACT! See bytecode below.</b>';
  
  const transactionCount = await provider.getTransactionCount(address);
  
  res.send({ balance, addressType, transactionCount, code });
});

app.get('/block/', async (req, res) => {
  const latestBlock = await provider.getBlock();
  console.log('Latest block is: ' + JSON.stringify(latestBlock));
  res.send({ latestBlock });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
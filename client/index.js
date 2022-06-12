import "./index.scss";
import axios from 'axios';
const ethers = require('ethers');

const server = "http://localhost:3042";

document.getElementById("public-address").addEventListener('input', async ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

const response = await axios.get(`${server}/balance/${value}`);

let balance = ethers.utils.formatEther(response.data.balance);

document.getElementById('balance').innerHTML = balance;
document.getElementById('address-type').innerHTML = response.data.addressType;
document.getElementById('tx-count').innerHTML = 'Transaction Count: ' + response.data.transactionCount;
document.getElementById('contract-code').innerHTML += response.data.code;

});

document.getElementById("get-latest").addEventListener('click', async () => {
  const response = await axios.get(`${server}/block`);

  const latestBlock = response.data.latestBlock;

  let html = '<h1> Latest Block Information: </h1>';

  html += '<p> <b>Latest Block Hash</b>: ' + latestBlock.hash + '</p>'
  + '<p> <b>Latest Block Miner</b>: ' + latestBlock.miner + '</p>'
  + '<p> <b>Latest Block Number</b>: ' + latestBlock.number + '</p>'
  + '<p> <b>Latest Block Timestamp</b>: ' + latestBlock.timestamp + '</p>'
  + '<p> <b>Latest Block Nonce</b>: ' + latestBlock.nonce + '</p>'
  + '<p> <b>Latest Block Parent Hash</b>: ' + latestBlock.parentHash + '</p>';

  document.getElementById('block-information').innerHTML = html;
});
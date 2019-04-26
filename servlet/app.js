// Get the web3 Module
const Web3 = require("web3");
const BigNumber = require('bignumber.js');
const Utils = require("web3-utils");
const contractInfo = require("./contractInfo.js");
const fs = require('fs');

const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/O3SD6Vf1tkJn9ep6KCzk"));
//const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://104.248.67.239:8545"));
//const web3 = new Web3(new Web3.providers.HttpProvider("http://104.248.67.239:8545"));
const gdaiAddress = contractInfo.gdaiAddress;
const gdaiABI = contractInfo.gdaiABI;
const gdaiContract = new web3.eth.Contract(gdaiABI,gdaiAddress);
const firstBlock = 0;

var state = {};
init();

function init(){
	fs.readFile('gdai.json', 'utf8', function (err, data){
		if (err){
			state = {	"lastBlock": firstBlock,
						"totalFees" : {},
						"leaderboard" : [],
						"gdaiAddress": gdaiAddress,
						"gdaiABI": gdaiABI
			};
		} else {
			state = JSON.parse(data);
			openSockets();
		}
		getRecords();
	});
}

function getRecords(){
	web3.eth.getBlockNumber().then(function(blockNumber){
		if(blockNumber >= state.lastBlock + 1){
			gdaiContract.getPastEvents('allEvents', { fromBlock: state.lastBlock + 1}).then(events => buildState(events));
		}
	});
	setTimeout(getRecords, 20000);
}

function buildState(events){
	//console.log(JSON.stringify(state));
	for(var i = 0; i < events.length; i++) {
		processEvent(events[i]);
	}
console.log("total Fees:     " + JSON.stringify(state.totalFees));

	var unsorted = Object.keys(state.totalFees).map(i => state.totalFees[i]);
	var sorted = unsorted.sort(compare);
	var sliced = sorted.slice(0, 10);
	if(sliced !== state.leaderboard) {
		state.leaderboard = sorted.slice(0, 10);
		console.log("leaderboard:     " + JSON.stringify(state.leaderboard));
		//io.emit("leaderboard",{leaderboard:state.leaderboard});
	}
//	console.log("state built");
//	console.log(JSON.stringify(state));
	if(typeof io == "undefined") openSockets();

	fs.writeFile('gdai.json', JSON.stringify((state)), 'utf8', function(){}); //add callback if needed
}
function processEvent(event){
	switch(event.event) {
		case "Transfer":
			//console.log("Transfer:          ");
			//console.log(JSON.stringify(event));
			if (event.returnValues.to != "0x0000000000000000000000000000000000000000"){
				if (typeof state.totalFees[event.returnValues.to] === 'undefined') {
					state.totalFees[event.returnValues.to] = {
						"fees" : event.returnValues.fee,
						"address" : event.returnValues.to
					}
				} else {
					state.totalFees[event.returnValues.to].fees = (state.totalFees[event.returnValues.to].fees).add(event.returnValues.fee);
					console.log("current User fees" + state.totalFees[event.returnValues.to].fees.toString());
				}
			}
		break;
	}
	state.lastBlock = event.blockNumber;
}

function openSockets(){
	io = require('socket.io')(2500);
	console.log("start sockets");
	io.on('connection', function (socket) {
		console.log("client connected")
		io.to(socket.id).emit("leaderboard",{leaderboard:state.leaderboard});
	});
}


function compare(a, b) {

  const feesA = new BigNumber(a.fees.toString());
	const feesB = new BigNumber(b.fees.toString());

  let comparison = 0;
  if (feesA.isGreaterThan(feesB)) {
    comparison = -1;
  } else if (feesA.isLessThan(feesB)) {
    comparison = 1;
  }
  return comparison;
}

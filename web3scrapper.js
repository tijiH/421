
const Web3scrapper = require('web3');
const web3 = new Web3scrapper('https://bsc-dataseed1.binance.org:443');
let value = 0;
const busdAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const busdAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const busdContract = new web3.eth.Contract(busdAbi, busdAddress);
const contractAddress = '0x2152aa45e02c1022cAB4ad964663fB3D69C2023e';
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"DeposMap","outputs":[{"internalType":"uint256","name":"key","type":"uint256"},{"internalType":"uint256","name":"depoTime","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"address","name":"reffy","type":"address"},{"internalType":"bool","name":"initialWithdrawn","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"FeesKey","outputs":[{"internalType":"uint256","name":"daysInSeconds","type":"uint256"},{"internalType":"uint256","name":"feePercentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"MainKey","outputs":[{"internalType":"uint256","name":"ovrTotalDeps","type":"uint256"},{"internalType":"uint256","name":"ovrTotalWiths","type":"uint256"},{"internalType":"uint256","name":"users","type":"uint256"},{"internalType":"uint256","name":"compounds","type":"uint256"},{"internalType":"uint256","name":"ovrTotalStaked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PercsKey","outputs":[{"internalType":"uint256","name":"daysInSeconds","type":"uint256"},{"internalType":"uint256","name":"divsPercentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"UsersKey","outputs":[{"internalType":"uint256","name":"startDate","type":"uint256"},{"internalType":"uint256","name":"divs","type":"uint256"},{"internalType":"uint256","name":"refBonus","type":"uint256"},{"internalType":"uint256","name":"totalInits","type":"uint256"},{"internalType":"uint256","name":"totalWiths","type":"uint256"},{"internalType":"uint256","name":"totalAccrued","type":"uint256"},{"internalType":"uint256","name":"lastWith","type":"uint256"},{"internalType":"uint256","name":"timesCmpd","type":"uint256"},{"internalType":"uint256","name":"keyCounter","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dy","type":"address"}],"name":"calcdiv","outputs":[{"internalType":"uint256","name":"totalWithdrawable","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compoundDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devLastWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mainInfo","outputs":[{"internalType":"uint256","name":"ovrTotalDeps","type":"uint256"},{"internalType":"uint256","name":"users","type":"uint256"},{"internalType":"uint256","name":"compounds","type":"uint256"},{"internalType":"uint256","name":"ovrTotalStaked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minContractValue","outputs":[{"internalType":"uint256","name":"contractBackStop","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"seeRefBonus","outputs":[{"internalType":"uint256","name":"amtz","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amtx","type":"uint256"},{"internalType":"address","name":"ref","type":"address"}],"name":"stakeStablecoins","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"userInfo","outputs":[{"components":[{"internalType":"uint256","name":"key","type":"uint256"},{"internalType":"uint256","name":"depoTime","type":"uint256"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"address","name":"reffy","type":"address"},{"internalType":"bool","name":"initialWithdrawn","type":"bool"}],"internalType":"struct Depo[]","name":"depoList","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amtx","type":"uint256"},{"internalType":"address","name":"ref","type":"address"}],"name":"withDrawFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawDivs","outputs":[{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"keyy","type":"uint256"}],"name":"withdrawInitial","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amtx","type":"uint256"}],"name":"withdrawPartialDivs","outputs":[{"internalType":"uint256","name":"withdrawAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"keyy","type":"uint256"},{"internalType":"uint256","name":"amtx","type":"uint256"}],"name":"withdrawPartialInitial","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRefBonus","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contract = new web3.eth.Contract(abi, contractAddress);

let oldPrice = 999999999
let index = 11

console.log("STARTING")


function getBusdBalanceOnFireFundContract() {
    busdContract.methods.balanceOf(contractAddress).call().then(balance => {
        const formattedBalance = (balance / 1000000000000000000)
        const formattedAmount = formattedBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits:0 });

        console.log("Formatted amount : " + formattedAmount + " | From formatted balance : " + formattedBalance + " | With index : " + index + " | At time :  | Oldprice : " + oldPrice)

        if(formattedBalance < oldPrice && index == 11){

            const url = 'https://api.pushover.net/1/messages.json';
            const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                token: 'a1g5qpv7w2ibihxoaiues2wnf7krch',
                user: 'uoze8p3tt6a4756crxtt65ioapjyta',
                device: 'xiaomi',
                title: 'FireFund contract',
                priority: 1,
                html: 1,
                message: `${formattedAmount} - <a href="https://firefund.finance/">FireFund</a>`
            })
            };

            fetch(url, params)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Pushover response:', data);
            })
            .catch(error => {
                console.error('There was a problem with the Pushover API:', error);
            });
            index = 0
        }else if(formattedBalance < oldPrice)
        {
            const url = 'https://api.pushover.net/1/messages.json';
            const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                token: 'a1g5qpv7w2ibihxoaiues2wnf7krch',
                user: 'uoze8p3tt6a4756crxtt65ioapjyta',
                device: 'xiaomi',
                title: 'FireFund contract',
                priority: 1,
                html: 1,
                message: `${formattedAmount} - <a href="https://firefund.finance/">FireFund</a>`
            })
            };

            fetch(url, params)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Pushover response:', data);
            })
            .catch(error => {
                console.error('There was a problem with the Pushover API:', error);
            });
        }
        else if(index == 11)
        {
            const url = 'https://api.pushover.net/1/messages.json';
            const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                token: 'a1g5qpv7w2ibihxoaiues2wnf7krch',
                user: 'uoze8p3tt6a4756crxtt65ioapjyta',
                device: 'xiaomi',
                title: 'FireFund contract',
                message: `${formattedAmount}`
            })
            };

            fetch(url, params)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Pushover response:', data);
            })
            .catch(error => {
                console.error('There was a problem with the Pushover API:', error);
            });
            index = 0
        }
        else
        {
            index = index + 1
        }

        oldPrice = formattedBalance
    });
}

setInterval(getBusdBalanceOnFireFundContract, 300000);



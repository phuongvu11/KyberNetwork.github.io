if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

var whitelistAddress = "0xd6Cd31F283d24cfb442cBA1Bcf42290c07C15792"
//var whitelistAddress = "0x9A98Fd382CC9cC54afb3352bf52A4a7427016e10";
var whitelistABI = [{"constant":true,"inputs":[],"name":"cappedSaleStartTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"openSaleStartTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"list","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"contributor","type":"address"},{"name":"amountInWei","type":"uint256"}],"name":"eligible","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"contributor","type":"address"}],"name":"contributorCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalizeSale","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"saleStarted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"haltSale","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHaltSale","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"anyToken","type":"address"}],"name":"emergencyDrain","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"saleEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proxy","type":"bytes32"},{"name":"recipient","type":"address"}],"name":"proxyBuy","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"debugBuy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"raisedWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"kyberMultiSigWallet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"proxyPurchases","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"openSaleEndTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_admin","type":"address"},{"name":"_kyberMultiSigWallet","type":"address"},{"name":"_whilteListContract","type":"address"},{"name":"_totalTokenSupply","type":"uint256"},{"name":"_premintedTokenSupply","type":"uint256"},{"name":"_cappedSaleStartTime","type":"uint256"},{"name":"_publicSaleStartTime","type":"uint256"},{"name":"_publicSaleEndTime","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_proxy","type":"bytes32"},{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_amountInWei","type":"uint256"}],"name":"ProxyBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_buyer","type":"address"},{"indexed":false,"name":"_tokens","type":"uint256"},{"indexed":false,"name":"_payedWei","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[],"name":"FinalizeSale","type":"event"}]


var whitelist;
var web3;

window.addEventListener('load', function() {
      web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/0BRKxQ0SFvAxGL72cbXi"));
      whitelist = web3.eth.contract(whitelistABI).at(whitelistAddress);

      document.getElementById("result-no").style.display = "none";
      document.getElementById("result-yes").style.display = "none";
      document.getElementById("error").style.display = "none";
});


var checkAddress = function(){
    var string = $("#user_address").val();
    string = string.trim();
    var re = /^0x[0-9a-fA-F]{40}$/g;
    if( re.test(string) ){
      document.getElementById("error").style.display = "none";
      whitelist.contributorCap(string, function(err, result){
        if (err) {
          document.getElementById("cap").textContent = "Got error: " + err + ". Please try later";
          document.getElementById("result-no").style.display = "block";
          document.getElementById("result-yes").style.display = "none";
        } else {
          var registered = result.greaterThan(0);
          if(registered) {
            document.getElementById("cap").textContent = "Your cap is " + web3.fromWei(result, "ether") + " ETH";
            document.getElementById("result-no").style.display = "none";
            document.getElementById("result-yes").style.display = "block";
          }
          else {
            document.getElementById("result-no").style.display = "block";
            document.getElementById("result-yes").style.display = "none";
          }
        }
      });
    }
    else {
      document.getElementById("error").style.display = "block";
      document.getElementById("result-no").style.display = "none";
      document.getElementById("result-yes").style.display = "none";
    }
};

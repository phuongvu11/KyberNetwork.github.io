var whitelistAddress = "0x749dab228c71e650addba8c9875b842ad460a3c2";
//var whitelistAddress = "0x9A98Fd382CC9cC54afb3352bf52A4a7427016e10";
var whitelistABI = [{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_cap","type":"uint256"}],"name":"listAddress","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"slackUsersCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_users","type":"address[]"},{"name":"_cap","type":"uint256[]"}],"name":"listAddresses","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"}],"name":"getCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_cap","type":"uint256"}],"name":"setSlackUsersCap","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"},{"indexed":false,"name":"_cap","type":"uint256"},{"indexed":false,"name":"_time","type":"uint256"}],"name":"ListAddress","type":"event"}];


var whitelist;

window.addEventListener('load', function() {
      var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
      whitelist = web3.eth.contract(whitelistABI).at(whitelistAddress);

      document.getElementById("result-no").style.display = "none";
      document.getElementById("result-yes").style.display = "none";
      document.getElementById("error").style.display = "none";
});


var checkAddress = function(){
    var string = $("#user_address").val();
    var re = /^0x[0-9a-fA-F]{40}$/g;
    if( re.test(string) ){
      document.getElementById("error").style.display = "none";
      whitelist.getCap(string, function(err,result){
        if( (new BigNumber(result)).greaterThan(0) ) {
          document.getElementById("result-no").style.display = "none";
          document.getElementById("result-yes").style.display = "block";
        }
        else {
          document.getElementById("result-no").style.display = "block";
          document.getElementById("result-yes").style.display = "none";
        }
      });
    }
    else {
      document.getElementById("error").style.display = "block";
      document.getElementById("result-no").style.display = "none";
      document.getElementById("result-yes").style.display = "none";      
    }
};

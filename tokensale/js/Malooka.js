/*global $, jQuery, document, window, navigator, FSS, resize, requestAnimationFrame*/
/* ==========================================================================
Document Ready Function
========================================================================== */
jQuery(document).ready(function () {

    'use strict';

    var WindowsHeight, HomeSectionContainer, CalcMarginTop, formInput, sformInput, onMobile, fcontainer, renderer, scene, light, geometry, material, mesh, now, start;

    /* ==========================================================================
    Modify Copied Text
    ========================================================================== */
    function addLink() {
        var body_element, selection, pagelink, copytext, newdiv;
        body_element = document.getElementsByTagName('body')[0];
        selection = window.getSelection();
        pagelink = " Read more at: <a href='" + document.location.href + "'>" + document.location.href + "</a>";
        copytext = selection + pagelink;
        newdiv = document.createElement('div');
        newdiv.style.position = 'absolute';
        newdiv.style.left = '-99999px';
        body_element.appendChild(newdiv);
        newdiv.innerHTML = copytext;
        selection.selectAllChildren(newdiv);
        window.setTimeout(function () {
            body_element.removeChild(newdiv);
        }, 0);
    }
    document.oncopy = addLink;


    /* ==========================================================================
    CountDown Timer
    ========================================================================== */
    var cappedSaleStartTime = 1505255200;
    var openSaleStartTime = 1505441600;
    var openSaleEndTime = 1505428000;
    // var cappedSaleStartTime = 1505455200;
    // var openSaleStartTime = 1505541600;
    // var openSaleEndTime = 1505628000;
    var currentTime = Math.floor((new Date()).getTime() / 1000.0);
    console.log(currentTime);
    var countDownTime;
    var icoEnded = false;
    if (currentTime < cappedSaleStartTime) {
      // before ICO
      $('.eth-info').hide();
      countDownTime = new Date(cappedSaleStartTime * 1000);
    } else if (currentTime < openSaleStartTime) {
      // capped sale is openning
      $('#token-sale-title').text("Token Sale is opened");
      $('#day-status').text("First day ends in");
      $('.action-button').text("Check your cap and balance here");
      countDownTime = new Date(openSaleStartTime * 1000);
    } else if (currentTime < openSaleEndTime) {
      // open sale is openning
      $('#token-sale-title').text("Token Sale is opened");
      $('#day-status').text("Second day ends in");
      $('.action-button').text("Check your balance here");
      countDownTime = new Date(openSaleEndTime * 1000);
    } else {
      // ICO is closed
      $('#token-sale-title').text("Token Sale is closed");
      $('.action-button').text("Check your balance here");
      $('#countdown_dashboard').hide();
      icoEnded = true;
    }
    if (!icoEnded) {
      console.log('setting countdown');
      $('#countdown_dashboard').countDown({
          targetDate: {
              'day': countDownTime.getUTCDate(),
              'month': countDownTime.getUTCMonth() + 1,
              'year': countDownTime.getFullYear(),
              'hour':  countDownTime.getUTCHours(),
              'min': countDownTime.getUTCMinutes(),
              'sec': countDownTime.getUTCSeconds(),
              'new_utc':0,
          },
          omitWeeks: true
      });
    }

    // var icoAddress = "0xd6Cd31F283d24cfb442cBA1Bcf42290c07C15792";
    var icoAddress = "0x2B08c4E8f06E2E1e9574d8F9E5dAcE5aCC96AD3d";
    //var whitelistAddress = "0x9A98Fd382CC9cC54afb3352bf52A4a7427016e10";
    var icoABI = [{"constant":true,"inputs":[],"name":"cappedSaleStartTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"openSaleStartTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"list","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"contributor","type":"address"},{"name":"amountInWei","type":"uint256"}],"name":"eligible","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"contributor","type":"address"}],"name":"contributorCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalizeSale","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"saleStarted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"haltSale","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"halt","type":"bool"}],"name":"setHaltSale","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"anyToken","type":"address"}],"name":"emergencyDrain","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"saleEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proxy","type":"bytes32"},{"name":"recipient","type":"address"}],"name":"proxyBuy","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"debugBuy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"raisedWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"kyberMultiSigWallet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"proxyPurchases","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"openSaleEndTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_admin","type":"address"},{"name":"_kyberMultiSigWallet","type":"address"},{"name":"_whilteListContract","type":"address"},{"name":"_totalTokenSupply","type":"uint256"},{"name":"_premintedTokenSupply","type":"uint256"},{"name":"_cappedSaleStartTime","type":"uint256"},{"name":"_publicSaleStartTime","type":"uint256"},{"name":"_publicSaleEndTime","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_proxy","type":"bytes32"},{"indexed":false,"name":"_recipient","type":"address"},{"indexed":false,"name":"_amountInWei","type":"uint256"}],"name":"ProxyBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_buyer","type":"address"},{"indexed":false,"name":"_tokens","type":"uint256"},{"indexed":false,"name":"_payedWei","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[],"name":"FinalizeSale","type":"event"}];

    var ico;
    var web3;

    // web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/0BRKxQ0SFvAxGL72cbXi"));
    web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/"));
    ico = web3.eth.contract(icoABI).at(icoAddress);
    ico.raisedWei(function(err, result) {
      if (err) {
        console.log("Got error: " + err)
      } else {
        var totalETH = web3.toBigNumber(200000);
        var totalKNC = web3.toBigNumber(226000000);
        var capKNC = web3.toBigNumber(57568415);
        var capETH = capKNC.dividedBy(600.0);
        var presaleETH = totalETH.minus(capETH);
        var presaleKNC = totalKNC.minus(capKNC);
        var raisedETH = web3.fromWei(result, "ether").plus(30000);
        var soldKNC = raisedETH.times(600).plus(18000000);
        var ethLeft = capETH.minus(raisedETH);
        var kncLeft = capKNC.minus(soldKNC);
        console.log("Presale KNC: " + presaleKNC);
        console.log("Presale ETH: " + presaleETH);
        console.log("Raised: " + raisedETH + " ETH");
        console.log("Sold: " + soldKNC + " KNC");
        console.log("ETH left: " + ethLeft);
        console.log("KNC left: " + kncLeft);
        var presalePercent = presaleETH.dividedBy(totalETH).times(100);
        var raisedPercent = raisedETH.dividedBy(totalETH).times(100);
        var leftPercent = web3.toBigNumber(100).minus(presalePercent).minus(raisedPercent);
        $('#presale-progress').css("width", presalePercent + "%");
        $('#presale-progress').text(presaleETH.round(3) + " ETH presold");
        $('#raised-progress').css("width", raisedPercent + "%");
        if (raisedPercent.greaterThan(20)) {
          $('#raised-progress').text(raisedETH.round(3) + " ETH raised");
        } else {
          $('#raised-progress').attr("title", raisedETH.round(3) + " ETH raised");
          $('#raised-progress').tooltip();
        }
        $('#left-progress').css("width", leftPercent + "%");
        if (leftPercent.greaterThan(20)) {
          $('#left-progress').text(ethLeft.round(3) + " ETH to go");
        } else {
          $('#left-progress').attr("title", ethLeft.round(3) + " ETH to go");
          $('#left-progress').tooltip();
        }
        $('#raised-eth').contents().first()[0].textContent = soldKNC.round(3) + " KNC";
        $('#eth-left').contents().first()[0].textContent = kncLeft.round(3) + " KNC";
      }
    });
    /* ==========================================================================
    Fancy Box
    ========================================================================== */
    $(".fancybox").fancybox({
        helpers : {
            title : {
                type : 'over'
            },
            overlay : {
                speedOut : 0,
                locked: false
            }
        }
    });

    /* ==========================================================================
    Home Section Height
    ========================================================================== */
    WindowsHeight = $(window).height();
    HomeSectionContainer = $('#home-section-container').height();
    CalcMarginTop = (WindowsHeight - HomeSectionContainer) / 2 + 50;

    $('#home-section').css({height: WindowsHeight});
    $('#home-section-container').css({top: CalcMarginTop });

    /* ==========================================================================
    Flat Surface Shader
    ========================================================================== */
    fcontainer = document.getElementById('home-section-wrapper');
    renderer = new FSS.CanvasRenderer();
    scene = new FSS.Scene();
    light = new FSS.Light('#111122', '#2c3e50');
    geometry = new FSS.Plane(fcontainer.offsetWidth, fcontainer.offsetHeight, 18, 12);
    material = new FSS.Material('#ffffff', '#ffffff');
    mesh = new FSS.Mesh(geometry, material);
    now = Date.now();
    start = Date.now();

    function initialise() {
        scene.add(mesh);
        scene.add(light);
        fcontainer.appendChild(renderer.element);
        window.addEventListener('resize', resize);
    }
    function resize() {
        renderer.setSize(fcontainer.offsetWidth, fcontainer.offsetHeight);
    }

    function animate() {
        now = Date.now() - start;
        light.setPosition(300 * Math.sin(now * 0.001), 150 * Math.cos(now * 0.0005), 150);
        renderer.render(scene);
        requestAnimationFrame(animate);
    }

    initialise();
    resize();
    // animate();

}); // JavaScript Document

/* ==========================================================================
Window Load
========================================================================== */
jQuery(window).load(function () {

    'use strict';

    /* ==============================================
    Loader
    =============================================== */
    var LoaderDelay = 350,
        LoaderFadeOutTime = 800;

    function hideLoader() {
        var loadingLoader = $('#Loader');
        loadingLoader.fadeOut();
    }
    hideLoader();

});

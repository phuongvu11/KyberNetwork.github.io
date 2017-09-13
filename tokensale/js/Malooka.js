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
    Home Section Height
    ========================================================================== */
    WindowsHeight = $(window).height();
    HomeSectionContainer = $('#home-section-container').height();
    CalcMarginTop = (WindowsHeight - HomeSectionContainer) / 2;

    $('#home-section').css({height: WindowsHeight});
    $('#home-section-container').css({top: CalcMarginTop });


    /* ==========================================================================
    CountDown Timer
    ========================================================================== */
    var cappedSaleStartTime = 1505455200;
    var openSaleStartTime = 1505541600;
    var openSaleEndTime = 1505628000;
    var currentTime = Math.floor((new Date()).getTime() / 1000.0);
    console.log(currentTime);
    var countDownTime;
    var icoEnded = false;
    if (currentTime < cappedSaleStartTime) {
      // before ICO
      countDownTime = new Date(cappedSaleStartTime * 1000);
    } else if (currentTime < openSaleStartTime) {
      // capped sale is openning
      countDownTime = new Date(openSaleStartTime * 1000);
    } else if (currentTime < openSaleEndTime) {
      // open sale is openning
      countDownTime = new Date(openSaleStartTime * 1000);
    } else {
      // ICO is closed
      icoEnded = true;
    }
    console.log(countDownTime.getUTCDate());
    console.log(countDownTime.getUTCMonth());
    console.log(countDownTime.getFullYear());
    console.log(countDownTime.getUTCHours());
    console.log(countDownTime.getUTCMinutes());
    console.log(countDownTime.getUTCSeconds());
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
    animate();


}); // JavaScript Document




/* ==========================================================================
Window Resize
========================================================================== */
$(window).resize(function () {

    'use strict';

    var WindowsHeight, HomeSectionContainer, CalcMarginTop;

    /* ==========================================================================
    Home Section Height
    ========================================================================== */
    WindowsHeight = $(window).height();
    HomeSectionContainer = $('#home-section-container').height();
    CalcMarginTop = (WindowsHeight - HomeSectionContainer) / 2;

    $('#home-section').css({height: WindowsHeight});
    $('#home-section-container').css({top: CalcMarginTop });
    $('#home-section canvas').css({height: '100% !important'});
    $('#home-section canvas').css({width: '100% !important'});

});




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

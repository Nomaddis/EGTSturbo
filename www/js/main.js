// -- toggle classes of HTML element --
function toggleClass(str, clas) {
    let str_mod = str;
    let tempArr = str.className.split(' ');
    existe = false;
    tempArr.forEach(function (item, i, array) {
        if (item === clas) {
            array.splice(i, 1);
            existe = true;
        }
    });
    if (!existe) {
        str = addClass(str, clas);
    } else {
        str = tempArr.join(' ');
    }
    str_mod.className = str;
    return str;
}
// -- add class to HTML element --
function addClass(str, clas) {
    let str_mod = str;
    str = str.className;
    let tempArr = str.split(' ');
    let match = false;
    tempArr.forEach(function (item, i) {
        if (item === clas) {
            match = true;
        }
    });
    if (match === false) {
        tempArr.push(clas);
        str = tempArr.join(' ');
    }
    str_mod.className = str;
    return str;
}


// -- remove class to HTML element --
function removeClass(str, clas) {
    let str_mod = str;
    str = str.className;
    var tempArr = str.split(' ');
    tempArr.forEach(function (item, i) {
        if (item === clas) {
            tempArr.splice(i, 1);
        }
    });
    str = tempArr.join(' ');
    str_mod.className = str;
    return str;
}

//do dropdown
$('.dropdown-content a').on("click", function () {
    $('.dropbtn__lang').html(this.innerHTML);
});

//------------------------ product detail slider --------------------
$('.product_details__main__slider').bxSlider({
    pagerCustom: '#bx-pager',
    controls: false
});

//------------------------ product detail selectors-------------
$('.selectpicker_color').selectpicker({
    style: 'color_selector',
    size: 'auto'
});
$('.selectpicker_size').selectpicker({
    style: 'size_selector',
    size: 'auto'
});
$('.selectpicker_qty').selectpicker({
    style: 'selectpicker_qty',
    size: 'auto'
});
$('.add-to-whishlist').on('click', function () {
    $('.heart_wishlist').toggleClass('active');
});

//---------------------- product detail tabs ------------------
$('#myTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show')
});
//--------------------------- end ---------------------------

//slider for product in product detail
$(document).ready(function(){
    $('.related_products__slider').bxSlider({
        slideWidth: 300,
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        slideMargin: 0,
        auto: true
    });
});

//================= main slider =====================
$(document).ready(function(){
    $('.main-slider').slick({
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        fade: true,
        easing: 'easeOutCirc',
    });
    $('.brands-slider').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: false,
        adaptiveHeight: true
    });
    /*----------  objecf fit  ----------*/
    !function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var f in g)if(g.hasOwnProperty(f)){if(e=[],n=g[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),y.push((o?"":"no-")+a.join("-"))}}function i(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?_.className.baseVal=n:_.className=n)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e,n){return!!~(""+e).indexOf(n)}function f(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?l(o,t||n):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(){var e=n.body;return e||(e=f(w?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var i,s,a,l,u="modernizr",p=f("div"),c=d();if(parseInt(r,10))for(;r--;)a=f("div"),a.id=o?o[r]:u+(r+1),p.appendChild(a);return i=f("style"),i.type="text/css",i.id="s"+u,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",l=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),s=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=l,_.offsetHeight):p.parentNode.removeChild(p),!!s}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(n[o])+":"+r+")");return i=i.join(" or "),c("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,o,i){function l(){p&&(delete z.style,delete z.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var p,d,c,v,h,y=["modernizr","tspan","samp"];!z.style&&y.length;)p=!0,z.modElem=f(y.shift()),z.style=z.modElem.style;for(c=e.length,d=0;c>d;d++)if(v=e[d],h=z.style[v],a(v,"-")&&(v=s(v)),z.style[v]!==t){if(i||r(o,"undefined"))return l(),"pfx"==n?v:!0;try{z.style[v]=o}catch(g){}if(z.style[v]!=h)return l(),"pfx"==n?v:!0}return l(),!1}function h(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+S.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?v(a,n,o,i):(a=(e+" "+E.join(s+" ")+s).split(" "),u(a,n,t))}var y=[],g=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){g.push({name:e,fn:n,options:t})},addAsyncTest:function(e){g.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var _=n.documentElement,w="svg"===_.nodeName.toLowerCase(),x="Moz O ms Webkit",S=C._config.usePrefixes?x.split(" "):[];C._cssomPrefixes=S;var b=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],f=a.toUpperCase()+"_"+r;if(f in i)return"@-"+a.toLowerCase()+"-"+n}return!1};C.atRule=b;var E=C._config.usePrefixes?x.toLowerCase().split(" "):[];C._domPrefixes=E;var j={elem:f("modernizr")};Modernizr._q.push(function(){delete j.elem});var z={style:j.elem.style};Modernizr._q.unshift(function(){delete z.style}),C.testAllProps=h;var N=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?b(e):(-1!=e.indexOf("-")&&(e=s(e)),n?h(e,n,t):h(e,"pfx"))};Modernizr.addTest("objectfit",!!N("objectFit"),{aliases:["object-fit"]}),o(),i(y),delete C.addTest,delete C.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);

    if (!$("html").hasClass("object-fit")) {

        $('.img-cont').each(function () {
            var $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl) {
                $container
                    .css('backgroundImage', 'url(' + imgUrl + ')')
                    .addClass('compat-object-fit');
            }
        });
    }
    /*----------  end of objecf fit  ----------*/

});
$(function(){
    // высота "шапки", px
    var h_hght = $('header').outerHeight();
    // высота блока с меню, px
    var h_nav = $('.header-middle').outerHeight();
    var top;
    $(window).scroll(function() {
        // отступ сверху
        top = $(this).scrollTop();
        if ((h_hght - top) <= h_nav) {
            // $('.header-middle').css('top', '0');
            $('.header-middle').addClass('fixed');
            // console.log('1');
        }
        else if (top < h_hght && top > 0) {
            // console.log('2');
            // $('.header-middle').css({'bottom': top, 'top': ''});
        }
        else if (top < h_nav) {
            // $('.header-middle').css({'top': '', 'bottom': '0'});
            $('.header-middle').toggleClass('fixed');
            // console.log('3');
        }
    });
});


// catalog`s pizdzheni skriptu
$('.catalog__filter_btn').on('click', function () {
    $(this).toggleClass('active');
});

$('.catalog_view__btn').on('click', function () {
    $('.catalog_view__btn').removeClass('active');
    $(this).addClass('active');
});

$('#catalog_view_list_btn').on('click', function () {
    $('.catalog__item_wrap').addClass('catalog__item--list_view');
});

$('#catalog_view_block_btn').on('click', function () {
    $('.catalog__item_wrap').removeClass('catalog__item--list_view');
});


$('.catalog__sub_categories_btn').on('click', function () {
    if($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $('.catalog__sub_categories_btn').removeClass('active');
        $(this).addClass('active');
    }
});


$('.brand_btn').on('click', function () {
    $(this).toggleClass('active');
});


//==================  catalog__item__controls ====================
$('.catalog__item__controls__btn').on('click', function () {
    $(this).toggleClass('active');
});


//-----------------vvvvvvvvvvvvvvvvv Price slider start vvvvvvvvvvvvvv----------------
$(".price_slider").slider({
    range:  true,
    min:    0,
    max:    10000,
    values: [0, 10000],
    slide: function(e, ui) {
        //console.log(ui.value);
        $('#price_min').val(ui.values[0]);
        $('#price_max').val(ui.values[1]);
    }
});
$('#price_min').change(function() {
    $( ".price_slider" ).slider("values", [ $('#price_min').val(), $('#price_max').val()] );
});
$('#price_max').change(function() {
    $( ".price_slider" ).slider("values", [$('#price_min').val(), $('#price_max').val()] );
});
//----------------------^^^^^^^^^^^ Price slider end ^^^^^^^^^^^^---------------------


/*----------- catalog_sidebar resize checker ----------------------*/

if ($('.panel-collapse').length!==0) {
    window.addEventListener('resize', function(){
        check_sidebar();
    });
}
function check_sidebar() {
    let window_width = window.innerWidth;
    let sidebar = document.getElementById('collapseSidebar');

    if(window_width < 990) {
        removeClass(sidebar, 'in');
    } else {
        addClass(sidebar, 'in');
    }
}

//fix opened catalog sidebar after reload page
$(window).on('load', function(){
    $('#collapseSidebar').toggleClass('in');
});
/*----------- catalog_sidebar resize checker end ----------------------*/


//mobile menu
$('.show-mobile-menu-btn').on('click', function () {
    $(this).toggleClass('active');
    $('.header-menu').toggleClass('active');
});
//mobile search
$('.mobile-search-show').on('click', function () {
    $(this).toggleClass('active');
    $(this).find('i').toggleClass('fa-search').toggleClass("fa-times");
    $('.search-container form').toggleClass('active');
    // fa-times fa-search
    console.log("ubludkki");
});
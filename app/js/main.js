$(document).ready(function () {
    /** SEARCH DESKTOP **/
    $('.js-search').on('click', function () {
        $(this).parents('.search').addClass('open');
        setTimeout(function () {
            $('.search .form-control').focus();
        }, 1000);
        return false
    });
    $('.js-close-search').on('click', function () {
       $(this).parents('.search').removeClass('open');
       $(this).parents('.search').find('.form-control').attr('value', '');
    });
    /** SLIDER INITIALIZE **/
    $('.js-slider-web').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    /** MAIN MENU DESKTOP **/
    if ($('.js-count-item').length != 0) {
        $('.js-count-item').each(function (e) {
            if ($(e).find('.sub-menu__item').length <= 1) {
                $('.js-count-item').addClass('column-one');
            }
        });
    }
    /** VALIDATE FORM **/
    $('.js_validate [type="submit"]').on("click", function () {
        return validate($(this).parents(".js_validate"));
    });
    /** HOVER-EFFECT RATES **/
    $('.js-rates-hover').hover(function () {
       $(this).parents('.rates-item').find('.rates-item__price').toggleClass('hover-active');
    });
    /** HEIGHT BLOCK **/
    function heightEL(el) {
        var elH = el;
        var maxHeight = 0;
        for (var i = 0; i < elH.length; ++i) {
            elH[i].style.height = "";
            if (maxHeight < elH[i].clientHeight) {
                maxHeight = elH[i].clientHeight;
            }
        }
        for (var i = 0; i < elH.length; ++i) {
            elH[i].style.height = maxHeight + "px";
        }
    }
    heightEL($('.block-advantages .advantages-item__container'));
    heightEL($('.internet-items .internet-items__image'));
    heightEL($('.features-item .features-item__container'));
    heightEL($('.block-wire .wire-item__container'));
    heightEL($('.technologies-item .technologies-item__image'));
    heightEL($('.presscenter-item .presscenter-item__title'));
    heightEL($('.virtualcenter-item .virtualcenter-item__title'));
    heightEL($('.service-request .service-request__item'));
    /** COPYRIGHT **/
    var yearBlock = document.querySelector('.yearN'),
        yearNow = new Date().getFullYear().toString();
    if (yearNow.length) {
        yearBlock.innerText = yearNow
    }
    /** BG HOVER MAIN-MENU **/
    if($(window).width() >= 1200 ) {
        $('.js-sub-active').hover(function () {
            $('body').toggleClass('bg-menu');
        });
    }
    /** CUSTOM SELECT **/
    $(".custom-select").each(function() {
        var classes = $(this).attr("class");
        var template =  '<div class="' + classes + ' js_valid_select">';
        if (!$(this).attr("data-placeholder")) {
            template += '<span class="custom-select-trigger">' + $(this).find('option:selected').text() + '</span>';
        } else {
            template += '<span class="custom-select-trigger">' + $(this).attr("data-placeholder") + '</span>';
        }
        template += '<ul class="custom-options" style="display: none;">';
        $(this).find("option").each(function() {
            template += '<li class="custom-option" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</li>';
        });
        template += '</ul></div>';
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-select-trigger").on("click", function(event) {
        $('html').one('click',function() {
            $(".custom-select").find('.custom-options').slideUp();
        });
        $(this).parents(".custom-select").find('.custom-options').slideToggle();
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });
    /** MODAL Initialize **/
    $(".iziModal").iziModal({
        onOpening: function () {
            $('body').addClass("open-modal");
        },
        onClosing: function () {
            $('body').removeClass("open-modal");
        }
    });
    $("#call-modal").on("opening", function () {
       console.log('open-modal');
    });
    /** PHONE MASK **/
    $(".js-phone-mask").mask("(999) 999-99-99");
    /** ANCHOR LINK **/
    function slideAnchor(item) {
        item.on('click', function (e) {
            var href = $(this).attr('href'),
                offset = $(href).offset().top;
            $("html, body").animate({scrollTop: offset}, 600);
        });
    }
    slideAnchor($('.js-anchor-service'));
    slideAnchor($('.js-anchor'));
    /**INITIALIZE MAP **/
    $('.js-location').on('click', function () {
        $(this).toggleClass('active');
        $(this).siblings().removeClass('active');
        var lat = Number($(this).attr('data-lat'));
        var lng = Number($(this).attr('data-lng'));
        initMapContact(lat, lng);
    });
    function initMapContact(lat, lng) {
        var coordinates = { lat: lat||50.004291, lng: lng||36.239880 };
        var map = new google.maps.Map(document.getElementById('map-contact'), {
            center: coordinates,
            zoom: 14.7
        });
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: './assets/images/icons/marker.png'
        });
        map.setOptions({styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]});
    }
    function initMap(lat, lng) {
        var myLatlng = new google.maps.LatLng(lat||49.980999, lng||36.246203);
        var pos1 = new google.maps.LatLng(49.986115, 36.248929);
        var pos2 = new google.maps.LatLng(49.980999, 36.246203);
        var mapOptions = {
            zoom: 14.7,
            center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var marker = new google.maps.Marker({
            position: pos1,
            map: map,
            icon: './assets/images/icons/marker.png'
        });
        var marker = new google.maps.Marker({
            position: pos2,
            map: map,
            icon: './assets/images/icons/marker.png'
        });
        map.setOptions({styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]});
    }
    if ($('#map').length) {
        initMap();
    }
    if ($('#map-contact').length) {
        initMapContact();
    }
    /** MOBILE MENU **/
    if($(window).width() <= 1200 ) {
        $('.js-mobile-menu').on('click', function () {
            $('.main-menu').toggleClass('open');
            $('html').toggleClass('open-menu');
        });
        $('.js-mobile-close').on('click', function () {
            $('.main-menu').removeClass('open');
            $('html').removeClass('open-menu');
        });
        $('.js-mobile-drop').on('click', function () {
            $(this).toggleClass('rotate');
            $(this).find('.sub-menu').slideToggle();
        });
        $('.js-mobile-search').on('click', function () {
            $(this).toggleClass('clicked');
            $('.search-for-mobile').slideUp();
            if ($(this).hasClass('clicked')) {
                $('.search-for-mobile').slideDown();
            }
        });
        $(document).mouseup(function (e) {
            var container = $(".main-menu"),
                containerSearch = $('.search-for-mobile');
            if (container.has(e.target).length === 0){
                $('.main-menu').removeClass('open');
                $('html').removeClass('open-menu');
            }
            if (containerSearch.has(e.target).length === 0){
                containerSearch.slideUp();
            }
        });
    }
    /** FOOTER ACCORDION **/
    $('.js-footer-accordion').on('click', function () {
       $(this).toggleClass('rotate');
       $(this).siblings('.footer-contact__container').slideToggle();
    });
    /** VALIDATE FORM **/
    $('.js-validate [type="submit"]').on("click", function () {
        return validate($(this).parents(".js-validate"));
    });
    /** FORM ADD INPUT **/
    $('.js-append-input').on('click', function () {
       $(this).parent().toggleClass('checked');
       if ($(this).parent().hasClass('checked')) {
           if ($(this).parent().hasClass('count-number')) {
               $(this).parent().append('<input type="text" class="form-control append-input" placeholder="Кол-во номеров" required="">')
           } else {
               $(this).parent().append('<input type="text" class="form-control js-phone-mask append-input" placeholder="(___) ___-__-__" required="">');
               $(".js-phone-mask").mask("(999) 999-99-99");
           }
       } else {
           $(this).parent().find('.append-input').remove();
       }
    });
    /** ACCORDION FAQ **/
    $('.js-accordion-faq').on('click', function () {
       $(this).parent().toggleClass('active');
       $(this).parent().find('.faq-content').slideToggle();
    });
});
/** TABS **/
(function(item){
    $(item).find('a').addClass('js-tab-item');
    var tabContent = $('.tab-content').find('.tab-pane');
    var initHref = $('.js-tab-item').eq(0).attr('href');
    if ($('.js-tab-item').length) {
        window.location.hash = initHref;
    }
    $('.js-tab-item').eq(0).parent().addClass('active');
    tabContent.hide();
    tabContent.eq(0).show();
    $('.js-tab-item').on('click', function (e) {
        e.preventDefault();
        var tab = $(this);
        tab.parent().addClass('active');
        tab.parent().siblings().removeClass('active');
        window.location.hash = tab.attr("href");
        tabContent.each(function () {
            if (tab.attr('href').split('#')[1] === $(this).attr('id')) {
                $(this).siblings().hide();
                $(this).show();
            }
        });
    });
}('.tabs'));
/** DROPDOWN LAGUAGE **/
(function(item){
    $(item).find('a').addClass('js-dropdown-item');
    $(item).find('.current').addClass('js-current');
    $('.js-current').on('click', function () {
        $(this).parents('.dropdown').toggleClass('open');
        $(this).siblings('ul').slideToggle();
    });
}('.dropdown'));
/** MODAL WINDOW **/
/*
(function(item){
    var nameModal = $(item).attr('data-modal');

}('.modal'));*/

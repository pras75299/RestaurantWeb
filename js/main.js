(function ($) {

    "use strict";

    // Document ready function 
    $(function () {
        
        /*-------------------------------------
        Booking dates and time
        -------------------------------------*/
        var datePicker = $('.rt-date');
        if (datePicker.length) {
            datePicker.datetimepicker({
                format: 'Y-m-d',
                timepicker: false
            });
        }
        
        var timePicker = $('.rt-time');
        if (timePicker.length) {
            timePicker.datetimepicker({
                format: 'H:i',
                datepicker: false
            });
        }

        /*-------------------------------------
         JQuery Serch Box
         -------------------------------------*/
        $('#search-button').on('click', function (e) {
            e.preventDefault();
            $(this).prev('.search-form').slideToggle('slow');
        });


$(document).ready(function(){
	// Item quantity control (shopping cart)
$(".cart-item-plus").on('click', function() {
    var currentVal = parseInt($(this).prev(".cart-quantity").val(), 10);

    if (!currentVal || currentVal == "" || currentVal == "NaN") currentVal = 0;

    $(this).prev(".cart-quantity").val(currentVal + 1);
});

$(".cart-item-minus").on('click', function() {
    var currentVal = parseInt($(this).next(".cart-quantity").val(), 10);
    if (currentVal == "NaN") currentVal = 1;
    if (currentVal > 1) {
        $(this).next(".cart-quantity").val(currentVal - 1);
    }
});
$('.i-check, .i-radio').iCheck({
    checkboxClass: 'i-check',
    radioClass: 'i-radio'
});
$('#shipping-address-checkbox').on('ifChecked', function() {
    $('#shipping-address').removeClass('hide');
});

$('#shipping-address-checkbox').on('ifUnchecked', function() {
    $('#shipping-address').addClass('hide');
});

	});

        /*-------------------------------------
        On click loadmore functionality 
        -------------------------------------*/
        $('.loadmore').on('click', 'a', function (e) {
            e.preventDefault();
            var _this = $(this),
                _parent = _this.parents('.menu-list-wrapper'),
                _target = _parent.find('.menu-list'),
                _set = _target.find('.menu-item.hidden').slice(0, 4); // Herre 2 is the limit
            if (_set.length) {
                _set.animate({opacity: 0});
                _set.promise().done(function () {
                    _set.removeClass('hidden');
                    _set.show().animate({opacity: 1}, 1000);
                });
            } else {
                _this.text('No more item to display');
            }

            return false;
        });


    });

    /*-------------------------------------
     jQuery MeanMenu initialization
     --------------------------------------*/
    $('nav#dropdown').meanmenu({siteLogo: "<a href='index.html' class='logo-mobile-menu'><img src='img/mobile-logo.png' /></a>"});

    /*-------------------------------------
     Wow js Initiation 
     -------------------------------------*/
    new WOW().init();

    /*-------------------------------------
     Jquery Scollup Initiation
     -------------------------------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*-------------------------------------
     Window load function
     -------------------------------------*/
    $(window).on('load', function () {

        // Page Preloader
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });

        /*-------------------------------------
         jQuery for Isotope initialization
         -------------------------------------*/
        var $container = $('#inner-isotope');

        if ($container.length > 0) {

            // Isotope initialization
            var $isotope = $container.find('.featuredContainer').isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            // Isotope filter
            $container.find('.isotop-classes-tab').on('click', 'a', function () {

                var $this = $(this);
                $this.parent('.isotop-classes-tab').find('a').removeClass('current');
                $this.addClass('current');
                var selector = $this.attr('data-filter');
                $isotope.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;

            });
        }
    });// end window load function

    /*-------------------------------------
     About Counter
     -------------------------------------*/
    var aboutContainer = $('.about-counter');

    if (aboutContainer.length) {

        aboutContainer.counterUp({
            delay: 50,
            time: 5000
        });

    }

    /*-------------------------------------
     Contact Form initiating
     -------------------------------------*/
    var contactForm = $('#contact-form');
    if (contactForm.length) {

        contactForm.validator().on('submit', function (e) {
            var $this = $(this),
                $target = contactForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {
                // Ajax call to load php file to process mail function
                $.ajax({
                    url: "vendor/php/form-process.php",
                    type: "POST",
                    data: contactForm.serialize(),
                    beforeSend: function () {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function (text) {
                        if (text == "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });

    }

    /*-------------------------------------
     Reservation Form initiating
     -------------------------------------*/
    var reservationForm = $('#reservation-form');
    if (reservationForm.length) {

        reservationForm.validator().on('submit', function (e) {
            var $this = $(this),
                $target = reservationForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {
                // Ajax call to load php file to process mail function
                $.ajax({
                    url: "vendor/php/reservation-form-process.php",
                    type: "POST",
                    data: reservationForm.serialize(),
                    beforeSend: function () {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function (text) {
                        if (text == "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });

    }

    /*-------------------------------------
     Input Quantity Up & Down initialize
     -------------------------------------*/
    $('#quantity-holder').on('click', '.quantity-plus', function () {

        var $holder = $(this).parents('.quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity > 0) {
            $quantity = $quantity + 1;
            $target.val($quantity);
        } else {
            $target.val($quantity);
        }

    }).on('click', '.quantity-minus', function () {

        var $holder = $(this).parents('.quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity >= 2) {
            $quantity = $quantity - 1;
            $target.val($quantity);
        } else {
            $target.val(1);
        }

    });

    /*-------------------------------------
     Google Map
     -------------------------------------*/
    if ($('#googleMap').length) {

        //Map initialize
        var initialize = function () {
            var mapOptions = {
                zoom: 15,
                scrollwheel: false,
                center: new google.maps.LatLng(-37.81618, 144.95692)
            };
            var map = new google.maps.Map(document.getElementById("googleMap"),
                mapOptions);
            var marker = new google.maps.Marker({
                position: map.getCenter(),
                animation: google.maps.Animation.BOUNCE,
                icon: 'img/map-marker.png',
                map: map
            });
        }

        // Add the map initialize function to the window load function
        google.maps.event.addDomListener(window, "load", initialize);
    }

    /*-------------------------------------
     Carousel slider initiation
     -------------------------------------*/
    $('.rc-carousel').each(function () {

        // Declared all carousel variable
        var carousel = $(this),
            loop = carousel.data('loop'),
            items = carousel.data('items'),
            margin = carousel.data('margin'),
            stagePadding = carousel.data('stage-padding'),
            autoplay = carousel.data('autoplay'),
            autoplayTimeout = carousel.data('autoplay-timeout'),
            smartSpeed = carousel.data('smart-speed'),
            dots = carousel.data('dots'),
            nav = carousel.data('nav'),
            navSpeed = carousel.data('nav-speed'),
            rXsmall = carousel.data('r-x-small'),
            rXsmallNav = carousel.data('r-x-small-nav'),
            rXsmallDots = carousel.data('r-x-small-dots'),
            rXmedium = carousel.data('r-x-medium'),
            rXmediumNav = carousel.data('r-x-medium-nav'),
            rXmediumDots = carousel.data('r-x-medium-dots'),
            rSmall = carousel.data('r-small'),
            rSmallNav = carousel.data('r-small-nav'),
            rSmallDots = carousel.data('r-small-dots'),
            rMedium = carousel.data('r-medium'),
            rMediumNav = carousel.data('r-medium-nav'),
            rMediumDots = carousel.data('r-medium-dots');

            // Call carousel main function to load carousel layout
        carousel.owlCarousel({
            loop: (loop ? true : false),
            items: (items ? items : 4),
            lazyLoad: true,
            margin: (margin ? margin : 0),
            autoplay: (autoplay ? true : false),
            autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
            smartSpeed: (smartSpeed ? smartSpeed : 250),
            dots: (dots ? true : false),
            nav: (nav ? true : false),
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            navSpeed: (navSpeed ? true : false),
            responsiveClass: true,
            responsive: {
                0: {
                    items: ( rXsmall ? rXsmall : 1),
                    nav: ( rXsmallNav ? true : false),
                    dots: ( rXsmallDots ? true : false)
                },
                480: {
                    items: ( rXmedium ? rXmedium : 2),
                    nav: ( rXmediumNav ? true : false),
                    dots: ( rXmediumDots ? true : false)
                },
                768: {
                    items: ( rSmall ? rSmall : 3),
                    nav: ( rSmallNav ? true : false),
                    dots: ( rSmallDots ? true : false)
                },
                992: {
                    items: ( rMedium ? rMedium : 5),
                    nav: ( rMediumNav ? true : false),
                    dots: ( rMediumDots ? true : false)
                }
            }
        });

    });




    /*-------------------------------------
     Window onLoad and onResize event trigger
     -------------------------------------*/
    $(window).on('load resize', function () {

        //Define the maximum height for mobile menu
        var wHeight = $(window).height(),
            mLogoH = $('a.logo-mobile-menu').outerHeight();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('height', wHeight + 'px');

    });


    /*-------------------------------------
     Jquery Stiky Menu at window Load
     -------------------------------------*/
    $(window).on('scroll', function () {

        var s = $('#sticker'),
            w = $('.wrapper'),
            h = s.outerHeight(),
            windowpos = $(window).scrollTop(),
            windowWidth = $(window).width(),
            h1 = s.parent('.header1-area'),
            h2 = s.parent('.header2-area'),
            h3 = s.parent('.header3-area'),
            h3H = h3.find('.header-top-area').outerHeight(),
            topBar = s.prev('.header-top-area');

        if (windowWidth > 767) {
            w.css('padding-top', '');
            var topBarH, mBottom = 0;
            if (h1.length) {
                topBarH = h = 1;
                mBottom = 0;
            } else if (h2.length) {
                mBottom = h2.find('.header-bottom-area').outerHeight();
                topBarH = topBar.outerHeight();
            } else if (h3.length) {
                topBarH = topBar.outerHeight();
            }

            if (windowpos >= topBarH) {
                s.addClass('stick');
                if (h2.length) {
                    topBar.css('margin-bottom', mBottom + 'px');
                }
            } else {
                s.removeClass('stick');
                if (h2.length) {
                    topBar.css('margin-bottom', 0);
                }
            }
        }

    });


})(jQuery);
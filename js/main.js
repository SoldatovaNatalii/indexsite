'use strict';

var styles = [
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
        { "saturation": "-100" }
      ]
    }
];

var tempScrollTop, currentScrollTop, tempScrollTop_down = 0;

function scroll () {
    var ww = $(window).width();
	var vh = $('.box-first').height();		
	var windowScroll = $(window).scrollTop();
    currentScrollTop = $(window).scrollTop();
    
    if (tempScrollTop < currentScrollTop ) {
		//scrolling down
		if (!$('.header').hasClass('small')) {
			if (tempScrollTop > tempScrollTop_down ) {
				if (windowScroll >= vh) {
					$('.header').addClass('hide');
				}
			}
		}
	} else if (tempScrollTop > currentScrollTop ) {
		//scrolling up

		$('.header').removeClass('hide');


		tempScrollTop_down = tempScrollTop;
    }

    if ($('html').hasClass('notOnepage')) {
        if (ww > 980) {
            if ((windowScroll >= $(".box-first").offset().top) && (windowScroll < $(".box-second").offset().top - 83)) {
                $('.header').removeClass('light');
            }
            
            if ((windowScroll >= $(".box-second").offset().top) && (windowScroll < $(".box-third").offset().top - 83)) {
                $('.header').addClass('light');
            } 
            
            if ((windowScroll >= $(".box-third").offset().top) && (windowScroll < $(".box-fourth").offset().top - 83)) {
                $('.header').removeClass('light');
            }
            
            if ((windowScroll >= $(".box-fourth").offset().top) && (windowScroll < $(".box-fifth").offset().top - 83)) {
                $('.header').addClass('light');
            } 
        
            if ((windowScroll >= $(".box-fifth").offset().top)) {
                $('.header').removeClass('light');
            }
        }
    }

	tempScrollTop = currentScrollTop;
}

// Инициализация карты
function initialize() {
    var gmarkers = [];
    var map = null;
    var infowindow = null;
    var ww = $(window).width();

    if (ww < 981) {
        var img = {
            url: "img/screen5/index-on-map.svg",
            size: new google.maps.Size(36, 48),
            origin: new google.maps.Point(0, 0)
        };
    
        var img2 = {
            url: "img/screen5/index-on-map.svg",
            size: new google.maps.Size(36, 48),
            origin: new google.maps.Point(0, 0)
        };
    } else {
        img = "img/screen5/index-on-map.svg";
        img2 = "img/screen5/index-on-map.svg";
    }

    var mapOptions = {
        center: new google.maps.LatLng(55.7752,37.5855),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: true,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: true,
        draggable: true,
        styles: styles,
        disableDefaultUI: true
    };

    map = new google.maps.Map(document.getElementById("map1"), mapOptions);

    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });
    
    var locations = [
        ['point1', 55.77520794849183,37.58545385889556,  "ул. 1-я Брестская, 62", "Москва", "Открыто", "c 10:00-19:00", "Сообщить о проблеме"]
    ];

    function setMarkers(locations) {
        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            var myLatLng = new google.maps.LatLng(location[1], location[2], location[3]);
            
            var contentString = '<div id="content">'+ location[3] + '</div>';

            var infowindow = new google.maps.InfoWindow({
            content: '<div id="gm_content">'+contentString+'</div>'
            });
            
            var marker = new google.maps.Marker({
                position: myLatLng,
                animation: google.maps.Animation.DROP,
                map: map,
                title: location[0],
                icon: img,
                html: '<div class="baloon"><div class="baloon-adres">' + location[3] + '</div><div class="baloon-city">' + location[4] + '</div><div class="baloon-status">Сейчас:<span class="h-color--red">' + location[5] + '</span></div><div class="baloon-time">' + location[6] + '</div></div>'
            });

            // Standard markers - if not using infobox
            google.maps.event.addListener(marker, "click", function () {
                //map.setCenter(marker.getPosition());
                infowindow.setContent(this.html);
                infowindow.open(map, this);
                $('.gm-style-iw').parent().find('> div:first-child').addClass('h-hide');
                $('.baloon').parent().addClass('h-no--overflow');
                $('.baloon').parent().parent().addClass('h-no--overflow');
                $('.gm-style-iw').next().addClass('baloon-close');
            });
            google.maps.event.addListener(marker, "mouseover", function() {
                this.setIcon(img2);
            });
            google.maps.event.addListener(marker, "mouseout", function() {
            //you have to retreive the original icon cause with the mouse hover you change the marker icon attribute
                this.setIcon(img);
            });
            
            gmarkers.push(marker);
        }
    }

    // Add the markers
    setMarkers(locations);
}

function resize() {
    var ww = $(window).width();

    if (ww > 980) {
        if ($('[js-slider]').hasClass('slick-initialized')) {
            $('[js-slider]').slick('unslick');
        }
    } else {
        if (!$('[js-slider]').hasClass('slick-initialized')) {
            $('[js-slider]').slick({
                dots: true
            });
        }

        $('section, .box-scroll').removeAttr('style');
        $('body').removeClass();
    }

    scroll();
}

$(window).scroll(function () {
    scroll();
});

$(document).ready(function () {

    var ww = $(window).width();
    var pgwBrowser = $.pgwBrowser();
	
    $('html').addClass(pgwBrowser.browser.name + ' ' + pgwBrowser.os.name);

    (function() {

        $('meta[name="viewport"]').attr('content','width=device-width, initial-scale=1.0');
        var ww  = $(window).width();
        var hh = $(window).height();
        var pr = (1 / window.devicePixelRatio).toFixed(1);
    
        if ($(window).width() < 981) {
            $('meta[name="viewport"]').attr('content','width=320px, user-scalable=no');
        } else {
            $('meta[name="viewport"]').attr('content','width=device-width, initial-scale=1.0');
        }
    
        $(window).resize(function () {
            var ww  = $(window).width();
            $('meta[name="viewport"]').attr('content','width=device-width, initial-scale=1.0');
            if ($(window).width() < 981) {
                $('meta[name="viewport"]').attr('content','width=320px, user-scalable=no');
            } else {
                $('meta[name="viewport"]').attr('content','width=device-width, initial-scale=1.0');
            }
        });
    
        $(window).bind('orientationchange', function(event) {
            $('meta[name="viewport"]').attr('content','width=device-width, initial-scale=1.0');
            var ww  = $(window).width();
            if ($(document).width() < 981) {
                $('meta[name="viewport"]').attr('content','width=320px, user-scalable=no');
            } else {
                $('meta[name="viewport"]').attr('content','width=device-width, initial-scale=1.0');
            }
        });
    
    })();

    $('[data-close]').click(function() {
        $(this).parents('.elem-info').addClass('hidden');
    });
    
    if (!$('html').hasClass('notOnepage')) {
        $('[data-choose-img]').mouseover(function() {
            var index = $(this).index();
            var parent = $(this).parent();
    
            $('.box-first__img img').addClass('hidden');
            $('.box-first__img img').eq(index + 1).removeClass('hidden');
    
            $('.box-first__menu-item').removeClass('active');
            $(this).addClass('active');
        });
    }

    $('.box-first__menu').mouseout(function() {
        $('.box-first__img img').addClass('hidden');
        $('.box-first__img img').eq(0).removeClass('hidden');
        $('.box-first__menu-item').removeClass('active');
     });

    $('[data-choose-info]').click(function() {
        var index = $(this).index();

        $('[js-elem-info]').addClass('hidden');
        $('[js-elem-info]').eq(index).removeClass('hidden');
    });

    if ($('[js-total-box]').length) {
        /*var el = $('[js-total-box]').children().eq(0);
        $('[js-total-box]').children().hide();
        el.fadeIn(800);

        setInterval(function() {
            var parent = el.parent();
            var index = el.index();

            if (index > $('[js-total-box]').children().length - 1) {
                index = 0;
            }

            $('[js-total-box]').children().hide();

            if (index < 3) {
                el = el.next();
            } else {
                el = $('[js-total-box]').children().eq(0);
            }

            el.fadeIn(800);
        }, 5000);*/

        var swiper = new Swiper('[js-total-box]', {
            loop: true,
            slidesPerView: 1,
            direction: 'vertical',
            effect: 'cube',
            grabCursor: true,
            cubeEffect: {
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            }
          });
    }

    $('[js-elem-more]').click(function() {
        var parent = $(this).parents('.box-clients');
        parent.addClass('box-clients__op');

        var el = $(this).attr('data-client');
        parent.find('.' + el).fadeIn(500);
    });

    $('[js-clients-close]').click(function() {
        var el = $(this).parents('.box-clients__op');
        el.removeClass('box-clients__op');

        $(this).parents('.box-clients--alt').fadeOut(500);
    });

    $('[js-init-map]').each(function() {
        google.maps.event.addDomListener(window, 'load', initialize);
    });   

    var toggles = document.querySelectorAll(".menu__mobile");

	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];
		toggleHandler(toggle);
	};

	function toggleHandler(toggle) {
		toggle.addEventListener( "click", function(e) {
			e.preventDefault();
			(this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
		});
    }
    
    $('.footer__item--link').click(function() {
        var index = $(this).parent().index() + 1;
        $('[data-scroll]').moveTo(index);
        $('.footer__item--link').removeClass('active');
        $(this).addClass('active');
    });

	$('.menu__mobile').click(function() {
		if ($('.menu__inner').hasClass('open')) {
			$('.menu__inner').removeClass('open');
		} else {
			$('.menu__inner').addClass('open');
		}
    }); 

    if (($('html').hasClass('Android')) || ($('html').hasClass('iPhone')) || ($('html').hasClass('iPad'))) {
        $('html').addClass('notOnepage');
        
        $('.menu__link').click(function (e) {
            var target = $(this).attr('data-href');
            var target = target.replace(/.+#/g, '');
      
            var part_top = $(target).offset().top - 50;

            $('.menu__inner').removeClass('open');
            $('.menu__mobile').removeClass('is-active');
            $('.menu__link').removeClass('active');
            $(this).addClass('active');
      
            $('html, body').animate({scrollTop: part_top + 'px'}, 500);
      
            e.preventDefault();
        });

        $('[data-move-down]').click(function(e) {
            var target = $(this).attr('data-href');
            var target = target.replace(/.+#/g, '');
        
            var part_top = $(target).offset().top - 50;
        
            $('html, body').animate({scrollTop: part_top + 'px'}, 500);

            scroll();
        
            e.preventDefault();
            
        });
    } else {
        $('[data-scroll]').onepage_scroll({
            sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
            easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                             // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
            animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
            pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
            updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
            beforeMove: function(index) {
                if ((index == 2) || (index == 4)) {
                    $('.header').addClass('light');
                } else {
                    $('.header').removeClass('light');
                }
    
                $('.menu__link').removeClass('active');
                if (index == 1) {
                    $('.menu__link').removeClass('active');
                } else {
                    $('.menu__item').eq(index - 2).find('.menu__link').addClass('active');
                }
            },  // This option accepts a callback function. The function will be called before the page moves.
            afterMove: function(index) {
                
            },   // This option accepts a callback function. The function will be called after the page moves.
            loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
            keyboard: true,                  // You can activate the keyboard controls
            responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                             // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                             // the browser's width is less than 600, the fallback will kick in.
            direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
        });

        $('[data-move-down]').click(function(e) {
            $('[data-scroll]').moveDown();
        });

        $('[js-first-screen]').click(function() {
            $('[data-scroll]').moveTo(1);
            $('.menu__link').removeClass('active');
        });
    
        $('.menu__link').click(function() {
            var index = $(this).parent().index() + 2;
            $('.menu__inner').removeClass('open');
            $('.menu__mobile').removeClass('is-active');
            $('[data-scroll]').moveTo(index);
            $('.menu__link').removeClass('active');
            $(this).addClass('active');
        });
    }

    var el = $('[data-choose-img]');
    var index = 0;

    setInterval(function() {
        var parent = el.parent();
        console.log(index);

        if (index > 3) {
            index = 0;
        }

        $('.box-first__img img').addClass('hidden');
        $('.box-first__img img').eq(index).removeClass('hidden');

        $('.box-first__menu-item').removeClass('active');
        if (index > 0) {
            $('.box-first__menu-item').eq(index - 1).addClass('active');
        }         

        index++;

        
    }, 5000);
    
    

    resize();

    $(window).resize(function() {
        resize();
    });
});
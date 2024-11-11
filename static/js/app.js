/*=========================================================================================
  File Name: app.js
  Description: Template related app JS.
  ----------------------------------------------------------------------------------------
  Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

(function (window, document, $) {
    'use strict';
    var $html = $('html');
    var $body = $('body');


    $(window).on('load', function () {
        var rtl;
        var compactMenu = false; // Set it to true, if you want default menu to be compact

        if ($body.hasClass("menu-collapsed")) {
            compactMenu = true;
        }

        if ($('html').data('textdirection') == 'rtl') {
            rtl = true;
        }

        setTimeout(function () {
            $html.removeClass('loading').addClass('loaded');
        }, 1200);

        $.app.menu.init(compactMenu);

        // Navigation configurations
        var config = {
            speed: 300 // set speed to expand / collpase menu
        };
        if ($.app.nav.initialized === false) {
            $.app.nav.init(config);
        }

        Unison.on('change', function (bp) {
            $.app.menu.change();
        });

        // Tooltip Initialization
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });

        // Top Navbars - Hide on Scroll
        if ($(".navbar-hide-on-scroll").length > 0) {
            $(".navbar-hide-on-scroll.fixed-top").headroom({
                "offset": 205,
                "tolerance": 5,
                "classes": {
                    // when element is initialised
                    initial: "headroom",
                    // when scrolling up
                    pinned: "headroom--pinned-top",
                    // when scrolling down
                    unpinned: "headroom--unpinned-top",
                }
            });
            // Bottom Navbars - Hide on Scroll
            $(".navbar-hide-on-scroll.fixed-bottom").headroom({
                "offset": 205,
                "tolerance": 5,
                "classes": {
                    // when element is initialised
                    initial: "headroom",
                    // when scrolling up
                    pinned: "headroom--pinned-bottom",
                    // when scrolling down
                    unpinned: "headroom--unpinned-bottom",
                }
            });
        }

        //Match content & menu height for content menu
        setTimeout(function () {
            if ($('body').hasClass('vertical-content-menu')) {
                setContentMenuHeight();
            }
        }, 500);

        function setContentMenuHeight() {
            var menuHeight = $('.main-menu').height();
            var bodyHeight = $('.content-body').height();
            if (bodyHeight < menuHeight) {
                $('.content-body').css('height', menuHeight);
            }
        }

        // Collapsible Card
        $('a[data-action="collapse"]').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.card').children('.card-content').collapse('toggle');
            $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ft-plus ft-minus');

        });

        // Toggle fullscreen
        $('a[data-action="expand"]').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.card').find('[data-action="expand"] i').toggleClass('ft-maximize ft-minimize');
            $(this).closest('.card').toggleClass('card-fullscreen');
        });

        //  Notifications & messages scrollable
        if ($('.scrollable-container').length > 0) {
            $('.scrollable-container').each(function () {
                var scrollable_container = new PerfectScrollbar($(this)[0], {
                    wheelPropagation: false
                });

            });
        }

        // Match the height of each card in a row
        setTimeout(function () {
            $('.row.match-height').each(function () {
                $(this).find('.card').not('.card .card').matchHeight(); // Not .card .card prevents collapsible cards from taking height
            });
        }, 500);


        $('.card .heading-elements a[data-action="collapse"]').on('click', function () {
            var $this = $(this),
                card = $this.closest('.card');
            var cardHeight;

            if (parseInt(card[0].style.height, 10) > 0) {
                cardHeight = card.css('height');
                card.css('height', '').attr('data-height', cardHeight);
            } else {
                if (card.data('height')) {
                    cardHeight = card.data('height');
                    card.css('height', cardHeight).attr('data-height', '');
                }
            }
        });

        // Add Menu Collapsed Open class to the parents of active menu item
        $(".main-menu-content")
            .find("li.active")
            .parents("li")
            .addClass("menu-collapsed-open")

        // Add open class to parent list item if subitem is active except compact menu
        var menuType = $body.data('menu');
        if (menuType != 'vertical-compact-menu' && menuType != 'horizontal-menu' && compactMenu === false) {
            $(".main-menu-content").find('li.active').parents('li').addClass('open');
        }
        if (menuType == 'vertical-compact-menu' || menuType == 'horizontal-menu') {
            $(".main-menu-content").find('li.active').parents('li:not(.nav-item)').addClass('open');
            $(".main-menu-content").find('li.active').parents('li').addClass('active');
        }

        //card heading actions buttons small screen support
        $(".heading-elements-toggle").on("click", function () {
            $(this).parent().children(".heading-elements").toggleClass("visible");
        });
    });

    // Hide overlay menu on content overlay click on small screens
    $(document).on('click', '.sidenav-overlay', function (e) {
        // Hide menu
        $.app.menu.hide();
        return false;
    });

    // Execute below code only if we find hammer js for touch swipe feature on small screen
    if (typeof Hammer !== 'undefined') {

        var rtl;
        if ($('html').data('textdirection') == 'rtl') {
            rtl = true;
        }

        // Swipe menu gesture
        var swipeInElement = document.querySelector('.drag-target'),
            swipeInAction = 'panright',
            swipeOutAction = 'panleft';

        if (rtl === true) {
            swipeInAction = 'panleft';
            swipeOutAction = 'panright';
        }

        if ($(swipeInElement).length > 0) {
            var swipeInMenu = new Hammer(swipeInElement);

            swipeInMenu.on(swipeInAction, function (ev) {
                if ($body.hasClass('vertical-overlay-menu')) {
                    $.app.menu.open();
                    return false;
                }
            });
        }

        // menu swipe out gesture
        setTimeout(function () {
            var swipeOutElement = document.querySelector('.main-menu');
            var swipeOutMenu;

            if ($(swipeOutElement).length > 0) {
                swipeOutMenu = new Hammer(swipeOutElement);

                swipeOutMenu.get('pan').set({
                    direction: Hammer.DIRECTION_ALL,
                    threshold: 100
                });

                swipeOutMenu.on(swipeOutAction, function (ev) {
                    if ($body.hasClass('vertical-overlay-menu')) {
                        $.app.menu.hide();
                        return false;
                    }
                });
            }
        }, 300);

        // menu overlay swipe out gestrue
        var swipeOutOverlayElement = document.querySelector('.sidenav-overlay');

        if ($(swipeOutOverlayElement).length > 0) {

            var swipeOutOverlayMenu = new Hammer(swipeOutOverlayElement);

            swipeOutOverlayMenu.on(swipeOutAction, function (ev) {
                if ($body.hasClass('vertical-overlay-menu')) {
                    $.app.menu.hide();
                    return false;
                }
            });
        }
    }

    $(document).on('click', '.menu-toggle, .modern-nav-toggle', function (e) {
        e.preventDefault();

        // Hide dropdown of user profile section for material templates
        if ($('.user-profile .user-info .dropdown').hasClass('show')) {
            $('.user-profile .user-info .dropdown').removeClass('show');
            $('.user-profile .user-info .dropdown .dropdown-menu').removeClass('show');
        }

        // Toggle menu
        $.app.menu.toggle();

        setTimeout(function () {
            $(window).trigger("resize");
        }, 200);

        if ($('#collapsed-sidebar').length > 0) {
            setTimeout(function () {
                if ($body.hasClass('menu-expanded') || $body.hasClass('menu-open')) {
                    $('#collapsed-sidebar').prop('checked', false);
                } else {
                    $('#collapsed-sidebar').prop('checked', true);
                }
            }, 1000);
        }

        // Hides dropdown on click of menu toggle
        // $('[data-toggle="dropdown"]').dropdown('hide');

        // Hides collapse dropdown on click of menu toggle
        if ($('.vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse').hasClass('show')) {
            $('.vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse').removeClass('show');
        }

        return false;
    });

    $(document).on('click', '.open-navbar-container', function (e) {

        var currentBreakpoint = Unison.fetch.now();
    });

    // Add Children Class
    $('.navigation').find('li').has('ul').addClass('has-sub');

    $('.carousel').carousel({
        interval: 2000
    });

    // Page full screen
    $('.nav-link-expand').on('click', function (e) {
        if (typeof screenfull != 'undefined') {
            if (screenfull.isEnabled) {
                screenfull.toggle();
            }
        }
    });
    if (typeof screenfull != 'undefined') {
        if (screenfull.isEnabled) {
            $(document).on(screenfull.raw.fullscreenchange, function () {
                if (screenfull.isFullscreen) {
                    $('.nav-link-expand').find('i').toggleClass('ft-minimize ft-maximize');
                } else {
                    $('.nav-link-expand').find('i').toggleClass('ft-maximize ft-minimize');
                }
            });
        }
    }

    $(document).on('click', '.mega-dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $(document).ready(function () {

        /**********************************
         *   Form Wizard Step Icon
         **********************************/
        $('.step-icon').each(function () {
            var $this = $(this);
            if ($this.siblings('span.step').length > 0) {
                $this.siblings('span.step').empty();
                $(this).appendTo($(this).siblings('span.step'));
            }
        });
    });

    // Update manual scroller when window is resized
    $(window).resize(function () {
        $.app.menu.manualScroller.updateHeight();
        // clear search if width is greater than 768
        if ($(window).width() > 768) {
            $(".search-input input").val("")
            $(".search-input input").blur()
            $(".search-input").removeClass("open")
            if ($(".header-navbar").find(".search-list.show")) {
                $(".header-navbar").find(".search-list.show").removeClass("show")
            }
            $(".app-content").removeClass("show-overlay")
        }
    });

    $('#sidebar-page-navigation').on('click', 'a.nav-link', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this),
            href = $this.attr('href');
        var offset = $(href).offset();
        var scrollto = offset.top - 80; // minus fixed header height
        $('html, body').animate({
            scrollTop: scrollto
        }, 0);
        setTimeout(function () {
            $this.parent('.nav-item').siblings('.nav-item').children('.nav-link').removeClass('active');
            $this.addClass('active');
        }, 100);
    });
    // main menu internationalization

    // change language according to data-language of dropdown item
    $(".dropdown-language .dropdown-item").on("click", function () {
        var $this = $(this);
        $this.siblings(".selected").removeClass("selected")
        $this.addClass("selected");
        var selectedLang = $this.text()
        var selectedFlag = $this.find(".flag-icon").attr("class");
        $("#dropdown-flag .selected-language").text(selectedLang);
        $("#dropdown-flag .flag-icon").removeClass().addClass(selectedFlag);
        var currentLanguage = $this.data("language");
        i18next.changeLanguage(currentLanguage, function (err, t) {
            $(".main-menu , .navbar-horizontal").localize();
        });
    })
})(window, document, jQuery);
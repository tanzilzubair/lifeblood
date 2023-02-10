import { setupScrollingAndScrollAnimations } from "./full_page_scrolling.js";

/// This changes the header, which includes the name and socials, 
/// from white to black once a distance equal to the viewport 
/// ($(window).height()), since the pages are white, and the header
/// would be invisible then. 
/// This is only needed and is only triggered when in an article page
function changeHeaderColor() {
    var pageName = $(".barba-container").attr("data-namespace");
    $(window).on("scroll", function () {
        if ("home" !== pageName && $(window).scrollTop() > $(window).height()) {
            $("header").addClass("js-color");
            $(".back-arrow").addClass("js-color");
        } else {
            $("header").removeClass("js-color");
            $(".back-arrow").removeClass("js-color");
        }
    })
}

var $win = $(window);
var fpnav = {};
var image = {};
var imageBig = {};
var isSp = false;
$win.on("load resize", function () {
    isSp = true;
    fpnav = {
        y: "100%",
        x: 0
    };
    image = {
        width: "80%",
        height: "55.633%",
        top: "9.859%",
        marginRight: "10%",
        marginLeft: "10%"
    };
    imageBig = {
        width: "100%",
        height: "65.492%",
        marginLeft: 0,
        top: 0
    };

    if (window.matchMedia("(min-width: 801px)").matches) {
        isSp = false; fpnav = {
            y: 0,
            x: "-100%"
        }; image = {
            width: "53.125%",
            height: "74.81%",
            top: "auto",
            marginRight: "8%",
            marginLeft: "auto"
        }; imageBig = {
            width: "60.677%",
            height: "100vh",
            marginLeft: "auto",
            top: "auto"
        };
    } else {
        window.matchMedia("(min-width: 421px)").matches && (isSp = false, fpnav = {
            y: "100%",
            x: 0
        }, image = {
            width: "53.125%",
            height: "74.81%",
            marginRight: 40,
            marginLeft: "auto"
        }, imageBig = {
            width: "60.677%",
            height: "100vh",
            top: "auto",
            marginLeft: "auto"
        });
    }
})

var state = 0;

/// The actual animations to use when transitioning between the card and the article webpage
var cardToArticleTransition = Barba.BaseTransition.extend({
    start: function () {


        /// Chaining together the functions to go one after the other
        this.playAnimation().then(this.newContainerLoading).then(this.finish.bind(this));
    },
    playAnimation: function () {

        /// This is what animates the cards when transitioning between webpages
        return new Promise(function (resolve) {
            anime.timeline({
                duration: 500,
                easing: "easeInOutCubic",
                complete: function () {
                    resolve()
                }
            }).add({
                targets: ".active .image",
                width: [image.width, imageBig.width],
                height: [image.height, imageBig.height],
                marginRight: [image.marginRight, 0],
                marginLeft: [image.marginLeft, imageBig.marginLeft],
                top: [image.top, imageBig.top]
            }).add({
                targets: ".fullpage__slide",
                background: ["rgba(0,0,0,0)", "#020b16"],
                offset: "-=500"
            }).add({
                targets: ".page-num p",
                translateY: [0, "100%"],
                translateZ: 0,
                offset: "-=500"
            }).add({
                targets: "#fp-nav ul",
                translateY: [0, fpnav.y],
                translateX: [0, fpnav.x],
                translateZ: 0,
                offset: "-=500"
            }).add({
                targets: ".active .btn-wrap",
                translateY: [0, "110%"],
                translateZ: 0,
                offset: "-=500"
            }).play()
        });
    },
    finish: function () {

        /// Finishing?
        this.done()
    }
});

/// The actual animations to use when transitioning between the article and the card webpage
var articleToCardTransition = Barba.BaseTransition.extend({
    start: function () {

        this.playAnimation().then(this.newContainerLoading).then(this.finish.bind(this));
    },
    playAnimation: function () {

        return new Promise(function (resolve) {
            var closeAnime = anime.timeline({
                duration: 500,
                easing: "easeInOutCubic",
                complete: function () {
                    resolve()
                }
            }).add({
                targets: ".page-top .image",
                width: [imageBig.width, image.width],
                height: [imageBig.height, image.height],
                marginRight: [0, image.marginRight],
                marginLeft: [imageBig.marginLeft, image.marginLeft],
                top: [imageBig.top, image.top]
            });
            0 !== $(window).scrollTop() ? $("body,html").animate({
                scrollTop: 0
            }, 500, "swing", closeAnime.play) : closeAnime.play()
        })
    },
    finish: function () {

        /// Finishing?
        this.done()
    }
});


var LoadingTransition = Barba.BaseTransition.extend({
    start: function () {


        /// Chaining together the functions to go one after the other
        this.open().then(this.newContainerLoading).then(this.finish.bind(this));
    },
    open: function () {

        /// This is what animates IN the sweeping load animation
        return new Promise(function (resolve) {
            anime({
                targets: ".curtain",
                translateY: ["100%", 0],
                translateZ: 0,
                duration: 800,
                easing: "easeInOutCubic",
                complete: function () {
                    $(".menuIcon").removeClass("js-menuOpen"), $(".global-nav").removeClass("js-open"), $("body,html").scrollTop(0), resolve()
                }
            })
        });
    },
    finish: function () {


        /// This is what animates OUT the sweeping load animation
        anime({
            targets: ".curtain",
            translateY: [0, "-100%"],
            translateZ: 0,
            duration: 800,
            easing: "easeInOutCubic"
        });

        /// Finishing?
        this.done()
    }
});

/// The view auto-binds to the HTML tag in the HTML file with data-namespace set to "home"
/// and that is how it knows when to use which animation
var homeView = Barba.BaseView.extend({
    namespace: "home",
    onEnter: function () {


        /// Animates away the sweeping load animation
        Barba.Pjax.getTransition = function () {
            return cardToArticleTransition
        };
    },
    onLeaveCompleted: function () {

        $("#js-fullpage").fullpage.destroy("all")
    }
});



/// The view auto-binds to the HTML tag in the HTML file with data-namespace set to "article"
/// and that is how it knows when to use which animation
var articleView = Barba.BaseView.extend({
    namespace: "article",
    onEnter: function () {

        Barba.Pjax.getTransition = function () {
            return articleToCardTransition
        }, $(window).scroll(function () {
            $(".js-scroll").each(function (i) {
                $(window).scrollTop() + $(window).height() > $(this).offset().top && $(this).addClass("in")
            })
        }), isSp && $(".page-top").height($(window).height())
    },
    onEnterCompleted: function () {

        changeHeaderColor();
        anime.timeline({
            duration: 500,
            easing: "easeInOutCubic"
        }).add({
            targets: ".btn-wrap",
            translateY: ["110%", 0]
        }).add({
            targets: ".back-arrow svg",
            translateX: ["100%", 0],
            offset: "-=500"
        }).add({
            targets: ".scrollDown",
            translateY: ["180%", 0],
            offset: "-=500"
        })
    },
    onLeave: function () {
        state = 1;
        anime.timeline({
            duration: 500,
            easing: "easeInOutCubic"
        }).add({
            targets: ".btn-wrap",
            translateY: [0, "110%"]
        }).add({
            targets: ".back-arrow svg",
            translateX: [0, "-100%"],
            offset: "-=500"
        })
    },
    onLeaveCompleted: function () {
        setupScrollingAndScrollAnimations(), state = 0;
        anime.timeline({
            duration: 500,
            easing: "easeInOutCubic"
        }).add({
            targets: ".active .page-num p",
            translateY: ["100%", 0],
            translateZ: 0
        }).add({
            targets: "#fp-nav ul",
            translateY: [fpnav.y, 0],
            translateX: [fpnav.x, 0],
            translateZ: 0,
            offset: "-=500"
        }).add({
            targets: ".fullpage__slide",
            background: ["#020b16", "rgba(0,0,0,0)"],
            offset: "-=500"
        }).add({
            targets: ".active .btn-wrap",
            translateY: ["110%", 0],
            translateZ: 0,
            offset: "-=500"
        })
    }
});



function intializeBarba() {
    Barba.Dispatcher.on("newPageReady", function () {
        isSp && $(".page-top").height($(window).height())
    });

    /// BarbaJS has a weird behavior where it will not handle anchor links properly.
    /// Since the site uses them heavily, this workaround patches that problem up.
    Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
    Barba.Pjax.preventCheck = function (evt, element) {
        if (
            element &&
            element.getAttribute('href') &&
            element.getAttribute('href').indexOf('#') > -1
        )
            return true;
        else return Barba.Pjax.originalPreventCheck(evt, element);
    };

    /// The view needs to be initialized
    homeView.init();

    /// The view needs to be initialized
    articleView.init();


    Barba.Pjax.start();
    Barba.Prefetch.init();
}

export { state, LoadingTransition, articleToCardTransition, cardToArticleTransition, intializeBarba };
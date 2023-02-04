/// Handles custom scrolling logic and setting up animations that trigger on scroll
function setupScrollingAndScrollAnimations() {
    $("#js-fullpage").fullpage({
        easingcss3: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        scrollingSpeed: 1e3,
        anchors: ["top", "reile", "about", "contact"],
        navigation: true,
        navigationPosition: "left",
        animateAnchor: false,
        onLeave: function (index, nextIndex, direction) {
            /// This handles animating in and out the moon and clouds on scroll
            handleMoonClouds(index, nextIndex);

            /// This handles animating the vertical SCROLLDOWN indicator
            handleScrollDownIndicator(index, nextIndex);

            /// Animating the cards, but only when the page is index.html, since that's
            /// where they exist (ie. when state == 0)
            if (state == 0) {
                setupCardAnimations(nextIndex);
            }

        },
        afterRender: function () {
            /// Adding the fp classes that are later used for targetting
            $(".section").each(function (i) {
                var num = i + 1;
                $(this).addClass("fp-section-" + num)
            });
        }
    });
}

function handleMoonClouds(index, nextIndex) {
    if (1 == index) anime({
        targets: ".js-moon",
        translateX: [0, "100%"],
        translateZ: 0,
        opacity: [1, 0],
        easing: "easeOutCubic",
        duration: 800,
        delay: function (el, i) {
            return 50 * i
        }
    });
    if (1 == nextIndex) anime({
        targets: ".js-moon",
        translateX: ["100%", 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutCubic",
        duration: 800,
        delay: function (el, i) {
            return 500 + 50 * i
        }
    });
}

function handleScrollDownIndicator(index, nextIndex) {
    if (1 == index) {
        anime({
            targets: ".scrollDown",
            translateY: "180%",
            duration: 500,
            easing: "easeInOutCubic"
        });
    }

    if (1 == nextIndex) {
        anime({
            targets: ".scrollDown",
            translateY: ["180%", 0],
            duration: 500,
            easing: "easeInOutCubic"
        });
    }
}

function setupCardAnimations(nextIndex) {
    var nextClass = ".fp-section-" + nextIndex;
    anime.timeline().add({
        targets: nextClass + " .image",
        scale: [.85, 1],
        translateX: ["10%", 0],
        translateZ: 0,
        easing: "easeOutCubic",
        duration: 1500,
        delay: 500
    }).add({
        targets: nextClass + " .image__cover",
        translateX: [0, "110%"],
        translateZ: 0,
        easing: "easeInOutQuart",
        duration: function (el, i) {
            return 1200 - 200 * i
        },
        offset: "-=1700"
    }).add({
        targets: nextClass + " .page-num p",
        translateY: ["100%", 0],
        translateZ: 0,
        easing: "easeInOutCubic",
        duration: 1e3,
        offset: "-=1200"
    }).add({
        targets: nextClass + " .js-letter",
        translateX: ["-105%", 0],
        translateZ: 0,
        easing: "easeInOutCubic",
        duration: 800,
        delay: function (el, i) {
            return 50 * i
        },
        offset: "-=1500"
    });
}
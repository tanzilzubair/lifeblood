import { initializeIntro } from "./spline.js";
import { state } from "./barba_setup.js";

/// Handles custom scrolling logic and setting up animations that trigger on scroll
function setupScrollingAndScrollAnimations() {
    $("#js-fullpage").fullpage({
        easingcss3: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        scrollingSpeed: 1e3,
        anchors: ["home", "I", "II", "III", "contact"],
        navigation: true,
        navigationPosition: "right",
        animateAnchor: false,
        onLeave: function (index, nextIndex, direction) {
            /// This handles animating the vertical SCROLLDOWN indicator
            handleScrollDownIndicator(index, nextIndex);

            /// Animating the cards, but only when the page is index.html, since that's
            /// where they exist (ie. when state == 0)
            if (state == 0) {
                setupCardAnimations(nextIndex);
            }

            var element = document.getElementById('sky-color');

            if (index == 0) {
                initializeIntro();
            }

            if (nextIndex == 1) {
                /// Cyber Reality
                element.style.backgroundColor = '#061c37'
            } else if (nextIndex == 2) {
                /// Information Super Highway
                element.style.backgroundColor = '#5B0034'
            } else if (nextIndex == 3) {
                /// Ghost In The Shell
                element.style.backgroundColor = '#1E232F'
            } else if (nextIndex == 4) {
                /// Lifeblood
                element.style.backgroundColor = '#1D0C37'
            } else {
                /// Get In Touch
                element.style.backgroundColor = '#FA02FD'

            }
            $('.fullpage__slide').each(function (i, element) {
                element.style.background = 'transparent';
            });

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

export { setupScrollingAndScrollAnimations };
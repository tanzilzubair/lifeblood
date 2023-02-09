/// Handles custom scrolling logic and setting up animations that trigger on scroll
function setupScrollingAndScrollAnimations() {
    $("#js-fullpage").fullpage({
        easingcss3: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        scrollingSpeed: 1e3,
        anchors: ["home", "I", "II", "III", "contact"],
        navigation: true,
        navigationPosition: "left",
        animateAnchor: false,
        onLeave: function (index, nextIndex, direction) {
            /// This handles animating the vertical SCROLLDOWN indicator
            handleScrollDownIndicator(index, nextIndex);

            /// Animating the cards, but only when the page is index.html, since that's
            /// where they exist (ie. when state == 0)
            if (state == 0) {
                setupCardAnimations(nextIndex);
            }

            element = document.getElementById('sky-color');
            if (nextIndex == 1) {
                element.style.backgroundColor = '#061c37'
                console.log("Cyber Reality")
            } else if (nextIndex == 2) {
                element.style.backgroundColor = '#5B0034'
                console.log("The Information SuperHighway")
            } else if (nextIndex == 3) {
                element.style.backgroundColor = '#1E232F'
                console.log("A Ghost In The Shell")
            } else if (nextIndex == 4) {
                element.style.backgroundColor = 'blue'
                console.log("Lifeblood")
            } else {
                element.style.backgroundColor = '#061c37'
                console.log("Get in Touch")
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
import { LoadingTransition, cardToArticleTransition, articleToCardTransition } from "./barba_setup.js";

function setupMenu() {
    /// Configuring the menu
    var height = $(window).height();
    $(".js-menuBtn").on("click", function () {
        $(".menuIcon").toggleClass("js-menuOpen"), $(".global-nav").toggleClass("js-open"), $(window).scrollTop() > height && $("header").toggleClass("js-color"), $(this).hasClass("js-menuOpen") ? (console.log("curation"), Barba.Pjax.getTransition = function () {
            return LoadingTransition
        }) : $("#js-fullpage").length ? (Barba.Pjax.getTransition = function () {
            return cardToArticleTransition
        }) : (Barba.Pjax.getTransition = function () {
            return articleToCardTransition
        })
    });
    $(".js-home").on("click", function () {
        /// This animates back the menu icon
        $(".menuIcon").removeClass("js-menuOpen");

        /// This removes the menu
        $(".global-nav").removeClass("js-open");

        /// Scrolls to contact
        $("#js-fullpage").fullpage.moveTo("home");

        /// I don't really know if this is required
        // Barba.Pjax.getTransition = function () {

        //     return PageTransitionTop
        // }
    });

    /// Configuring the contact button in the menu to properly animate everything
    $(".js-contact").on("click", function () {
        /// This animates back the menu icon
        $(".menuIcon").removeClass("js-menuOpen");

        /// This removes the menu
        $(".global-nav").removeClass("js-open");

        /// Scrolls to contact
        $("#js-fullpage").fullpage.moveTo("contact");

        /// I don't really know if this is required
        // Barba.Pjax.getTransition = function () {

        //     return PageTransitionTop
        // }
    });
}

export { setupMenu };
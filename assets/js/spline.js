import { Application } from 'https://unpkg.com/@splinetool/runtime@0.9.211/build/runtime.js';

var introInitialized = false;
var app;
function initializeIntro() {
    if (introInitialized == false) {
        const canvas = document.getElementById('intro-3d');
        app = new Application(canvas);
        app.load('./assets/models/intro.splinecode').then(() => {
            app.setZoom(0.9);
        });

        introInitialized = true;
    }
}

function destroyIntro() {
    if (introInitialized == true) {
        app.dispose();
        $("#intro-3d").replaceWith('<canvas id="intro-3d" ></canvas>');
        introInitialized = false;
    }
}
export { initializeIntro, destroyIntro };

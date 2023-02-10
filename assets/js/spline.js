import { Application } from 'https://unpkg.com/@splinetool/runtime@0.9.210/build/runtime.js';

var introInitialized = false;
function initializeIntro() {
    if (introInitialized == false) {
        const canvas = document.getElementById('intro-3d');
        const app = new Application(canvas);
        app.load('./assets/models/intro.splinecode').then(() => {
            app.setZoom(0.9);
        });
        introInitialized = true;
    }
}

export { initializeIntro };

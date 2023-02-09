import { Application } from 'https://unpkg.com/@splinetool/runtime@0.9.210/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('./assets/models/intro.splinecode').then(() => {
    app.setZoom(0.9);
});
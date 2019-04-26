import RandomCircles from "./randomCircles.js";
import Circles from "./circles.js";

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

ctx.fillRect(0, 0, canvas.width, canvas.height);
let random = new RandomCircles(20, ctx);
random.generate();
random.draw();

let circles = new Circles(150, ctx, random.getArr());
circles.generate();
// circles.draw();
circles.generateBest();
circles.drawBest();
circles.generateWeight();

let main = () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  random.draw();
  circles.newGeneration();
  console.log(circles.best[0].x);
  circles.drawBest();
  requestAnimationFrame(main);
};

main();

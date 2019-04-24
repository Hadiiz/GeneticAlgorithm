import { RandomCircle, intersect, fitScreen } from "./modules.js";
import RandomCircles from "./randomCircles.js";

export default class Circles {
  constructor(numOfCircles, ctx, fixedCirclesArr) {
    this.numOfCircles = numOfCircles;
    this.ctx = ctx;
    this.fixedCirclesArr = fixedCirclesArr;
    this.arr = [];
    this.best = [];
  }

  generate = () => {
    for (let i = 0; i < this.numOfCircles; i++) {
      this.arr.push(new RandomCircle(this.ctx));
    }
  };

  draw = () => {
    for (let i = 0; i < this.arr.length; i++) {
      this.ctx.strokeStyle = "red";
      this.ctx.beginPath();
      this.ctx.arc(
        this.arr[i].x,
        this.arr[i].y,
        this.arr[i].radius,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
    }
  };

  generateBest = () => {
    for (let i = 0; i < this.arr.length; i++) {
      if (
        fitScreen(this.arr[i]) &&
        !intersect(this.fixedCirclesArr, this.arr[i])
      ) {
        this.best.push(this.arr[i]);
      }
    }

    this.best.sort(function(c1, c2) {
      return c1.radius - c2.radius;
    });
    this.best.reverse();
    console.log(this.best);
  };

  drawBest = () => {
    for (let i = 1; i < this.best.length; i++) {
      this.ctx.strokeStyle = "white";
      this.ctx.beginPath();
      this.ctx.arc(
        this.best[i].x,
        this.best[i].y,
        this.best[i].radius,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
    }
    this.ctx.strokeStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(
      this.best[0].x,
      this.best[0].y,
      this.best[0].radius,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  };
}

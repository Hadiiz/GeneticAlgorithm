import { fitScreen, intersect, RandomCircle } from "./modules.js";
export default class RandomCircles {
  constructor(numOfCircles, ctx) {
    this.ctx = ctx;
    this.numOfCircles = numOfCircles;
    this.count = 0;
    this.arr = [];
  }

  getArr = () => {
    return this.arr;
  };
  generate = () => {
    for (let i = 0; i < this.numOfCircles; i++) {
      let temp = new RandomCircle(this.ctx);
      while (!fitScreen(temp) || intersect(this.arr, temp)) {
        temp = new RandomCircle(this.ctx);
      }
      this.arr.push(temp);
    }
  };

  draw = () => {
    for (let i = 0; i < this.numOfCircles; i++) {
      this.arr[i].draw(this.ctx);
    }
  };
}

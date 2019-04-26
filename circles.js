import { RandomCircle, intersect, fitScreen, replaceAt } from "./modules.js";

export default class Circles {
  constructor(numOfCircles, ctx, fixedCirclesArr) {
    this.numOfCircles = numOfCircles;
    this.ctx = ctx;
    this.fixedCirclesArr = fixedCirclesArr;
    this.arr = [];
    this.best = [];
    this.weightSum = 0;
    this.weight = [];
    this.mutationRate = 0.1;
  }
  /////////////////////////////////////////////////////////////////////

  generate = () => {
    for (let i = 0; i < this.numOfCircles; i++) {
      this.arr.push(new RandomCircle());
    }
  };

  /////////////////////////////////////////////////////////////////////

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

  /////////////////////////////////////////////////////////////////////

  generateBest = () => {
    for (let i = 0; i < this.arr.length; i++) {
      if (
        fitScreen(this.arr[i]) &&
        !intersect(this.fixedCirclesArr, this.arr[i])
      ) {
        this.best.push(this.arr[i]);
        this.weightSum += this.arr[i].radius;
      }
    }

    this.best.sort(function(c1, c2) {
      return c1.radius - c2.radius;
    });
    this.best.reverse();
  };

  /////////////////////////////////////////////////////////////////////

  generateWeight = () => {
    for (let i = 0; i < this.best.length; i++) {
      this.weight.push(this.best[i].radius / this.weightSum);
    }
  };

  /////////////////////////////////////////////////////////////////////

  drawBest = () => {
    /*for (let i = 1; i < this.best.length; i++) {
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
    }*/
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

  /////////////////////////////////////////////////////////////////////

  pickMate = () => {
    let random = Math.random();
    let minWeight = 0;
    for (let i = 0; i < this.weight.length; i++) {
      if (random > minWeight && random <= minWeight + this.weight[i]) {
        return this.best[i];
      }
      minWeight += this.weight[i];
    }
    return this.best[this.best.length - 1];
  };

  /////////////////////////////////////////////////////////////////////

  crossOver = () => {
    let circleMom = this.pickMate();
    let circleDad = this.pickMate();
    let circleChild = new RandomCircle();

    let DNAm = circleMom.x.toString(2);
    let DNAm1 = DNAm.substring(0, DNAm.length / 2);
    let DNAd = circleDad.x.toString(2);
    let DNAd2 = DNAd.substring(DNAd.length / 2, DNAd.length);
    circleChild.x = parseInt(DNAm1 + DNAd2, 2);

    DNAm = circleMom.y.toString(2);
    DNAm1 = DNAm.substring(0, DNAm.length / 2);
    DNAd = circleDad.y.toString(2);
    DNAd2 = DNAd.substring(DNAd.length / 2, DNAd.length);
    circleChild.y = parseInt(DNAm1 + DNAd2, 2);

    DNAm = circleMom.radius.toString(2);
    DNAm1 = DNAm.substring(0, DNAm.length / 2);
    DNAd = circleDad.radius.toString(2);
    DNAd2 = DNAd.substring(DNAd.length / 2, DNAd.length);
    circleChild.radius = parseInt(DNAm1 + DNAd2, 2);

    return circleChild;
  };

  /////////////////////////////////////////////////////////////////////

  mutate = circle => {
    let x = circle.x.toString(2);
    let xRandBin = Math.floor(Math.random() * x.length);
    let y = circle.y.toString(2);
    let yRandBin = Math.floor(Math.random() * y.length);
    let radius = circle.radius.toString(2);
    let radRandBin = Math.floor(Math.random() * radius.length);

    x =
      x[xRandBin] == "1"
        ? replaceAt(x, xRandBin, "0")
        : replaceAt(x, xRandBin, "1");
    y =
      y[yRandBin] == "1"
        ? replaceAt(y, yRandBin, "0")
        : replaceAt(y, yRandBin, "1");
    radius =
      radius[radRandBin] == "1"
        ? replaceAt(radius, radRandBin, "0")
        : replaceAt(radius, radRandBin, "1");

    circle.x = parseInt(x, 2);
    circle.y = parseInt(y, 2);
    circle.radius = parseInt(radius, 2);
  };

  /////////////////////////////////////////////////////////////////////

  newGeneration = () => {
    let newGenArr = [];
    let circleChild;
    for (let i = 0; i < 148; i++) {
      circleChild = this.crossOver();
      if (Math.random() <= this.mutationRate) this.mutate(circleChild);
      newGenArr.push(circleChild);
    }
    newGenArr.push(this.best[1]);
    newGenArr.push(this.best[0]);
    this.arr = newGenArr;
    this.weight = [];
    this.weightSum = 0;
    this.best = [];
    this.generateBest();
    this.generateWeight();
  };
}

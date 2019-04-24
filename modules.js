export function fitScreen(randomCircle) {
  if (
    randomCircle.x - randomCircle.radius > 0 &&
    randomCircle.y - randomCircle.radius > 0 &&
    randomCircle.x + randomCircle.radius < 800 &&
    randomCircle.y + randomCircle.radius < 800
  )
    return true;
  return false;
}

export function intersect(arr, rc) {
  for (let i = 0; i < arr.length; i++) {
    let x = Math.abs(rc.x - arr[i].x);
    let y = Math.abs(rc.y - arr[i].y);

    let distance = Math.sqrt(x * x + y * y);

    if (rc.radius + arr[i].radius > distance) return true;
  }
  return false;
}

export class RandomCircle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.random() * 800;
    this.y = Math.random() * 800;
    this.radius = Math.random() * 100 + 5;
  }

  draw = () => {
    this.ctx.strokeStyle = "orange";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  };
}

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
  constructor() {
    this.x = Math.floor(Math.random() * 800) + 1;
    this.y = Math.floor(Math.random() * 800) + 1;
    this.radius = Math.floor(Math.random() * 150) + 5;
  }

  draw = ctx => {
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  };
}
export function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

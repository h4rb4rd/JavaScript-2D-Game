const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 700);

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
  }

  update() {
    this.timer++;

    if (this.timer % 15 === 0) {
      this.frame++;
    }
  }

  draw() {
    const image = new Image();
    image.src = './assets/boom.png';
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height,
    );
    ctx.restore();
  }
}

const createAnimation = (e) => explosions.push(new Explosion(e.offsetX, e.offsetY));

canvas.addEventListener('click', (e) => createAnimation(e));

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();

    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
};

animate();

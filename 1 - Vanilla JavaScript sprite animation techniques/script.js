let playerState = 'idle';
const dropDown = document.getElementById('animations');

dropDown.addEventListener('change', (e) => (playerState = e.target.value));

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

// sprite width 6876, and 12 cols - 6876/12 = 573 + margin
const spriteFrameWidth = 575;
// sprite height 5230, and 10 rows - 5230/10 = 523
const spriteFrameHeight = 523;

let gameFrame = 0;

// slowing down animation times
const staggerFrames = 7;

const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };

  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteFrameWidth;
    let positionY = index * spriteFrameHeight;

    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});

const playerImage = new Image();
playerImage.src = './assets/shadow_dog.png';

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteFrameWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteFrameWidth,
    spriteFrameHeight,
    0,
    0,
    spriteFrameWidth,
    spriteFrameHeight,
  );

  gameFrame++;
  requestAnimationFrame(animate);
};

animate();

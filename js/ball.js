import { CollisionDetect } from "/js/collisionDetect.js";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.size = 16;
    this.reset();
  }

  reset() {
    this.position = {
      x: 10,
      y: 400,
    };

    this.speed = {
      x: 4,
      y: -4,
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //wall on left and right
    if (this.position.x < 0 || this.position.x + this.size > this.gameWidth) {
      this.speed.x = -this.speed.x;
    }

    //wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    //wall on bottom
    if (this.position.y + this.size > this.gameHeight) {
      this.reset();
      this.game.lives--;
    }

    if (CollisionDetect(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
      console.log(this.position.y);
    }
  }
}

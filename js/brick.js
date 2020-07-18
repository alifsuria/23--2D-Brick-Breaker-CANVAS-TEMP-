import { CollisionDetect } from "/js/collisionDetect.js";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("brick");
    this.game = game;
    this.width = 80;
    this.height = 24;
    this.position = position;

    this.markedofDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (CollisionDetect(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedofDeletion = true;
    }
  }
}

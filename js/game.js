import Paddle from "/js/paddle.js";
import Ball from "/js/ball.js";
import InputHandler from "/js/input.js";
import { buildlevel, level1, level2, level3, level4 } from "./level.js";

const GAME_STATE = {
  RUNNING: 0,
  PAUSED: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.gameObject = [];
    new InputHandler(this.paddle, this);
    this.gamestate = GAME_STATE.MENU;
    this.lives = 3;
    this.currentLevel = 0;
    this.levels = [level1, level2, level3, level4];
  }

  start() {
    if (this.gamestate !== GAME_STATE.MENU && this.gamestate !== GAME_STATE.NEWLEVEL) {
      return;
    }
    this.bricks = buildlevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObject = [this.paddle, this.ball];
    this.gamestate = GAME_STATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAME_STATE.GAMEOVER;
    }
    if (
      this.gamestate === GAME_STATE.PAUSED ||
      this.gamestate === GAME_STATE.MENU ||
      this.gamestate === GAME_STATE.GAMEOVER
    ) {
      return;
    }

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAME_STATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObject, ...this.bricks].forEach((object) => {
      object.update(deltaTime);
    });

    this.bricks = this.bricks.filter((brick) => !brick.markedofDeletion);
  }

  draw(ctx) {
    [...this.gameObject, ...this.bricks].forEach((object) => {
      object.draw(ctx);
    });

    if (this.gamestate === GAME_STATE.PAUSED) {
      ctx.fillStyle = "rgb(0,0,0,0.5)";
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAME_STATE.MENU) {
      ctx.fillStyle = "rgb(0,0,0,1)";
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR To Play",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAME_STATE.GAMEOVER) {
      ctx.fillStyle = "rgb(0,0,0,1)";
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText(">GAME OVER<", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePaused() {
    if (this.gamestate === GAME_STATE.PAUSED) {
      this.gamestate = GAME_STATE.RUNNING;
    } else {
      this.gamestate = GAME_STATE.PAUSED;
    }
  }
}

export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      console.log(event.keyCode);

      switch (event.keyCode) {
        case 37:
          // console.log("move Left");
          paddle.moveLeft();
          break;
        case 39:
          // console.log("move Right");
          paddle.moveRight();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) {
            paddle.moveStop();
          }
          break;
        case 39:
          if (paddle.speed > 0) {
            paddle.moveStop();
          }
          break;
        case 27:
          game.togglePaused();
          break;
        case 32:
          game.start();
          console.log("HIT")
          break;
      }
    });
  }
}

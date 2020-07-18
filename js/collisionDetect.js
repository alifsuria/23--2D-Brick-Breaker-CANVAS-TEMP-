export function CollisionDetect(ball, gameObject) {
  let bottomBall = ball.position.y + ball.size;
  let topBall = ball.position.y;

  let topofObject = gameObject.position.y;
  let leftSideofObject = gameObject.position.x;
  let rightSideofObject = gameObject.position.x + gameObject.width;
  let bottomofObject = gameObject.position.y + gameObject.height;

  if (
    bottomBall >= topofObject &&
    topBall <= bottomofObject &&
    ball.position.x >= leftSideofObject &&
    ball.position.x + ball.size <= rightSideofObject
  ) {
    return true;
  } else {
    return false;
  }
}

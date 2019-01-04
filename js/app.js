// Enemies our player must avoid
let Enemy = function(row, speed) {
    this.x = -101 - (2000 * Math.random());
    this.y = (row * 83) - 20;
    this.row = row;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
      this.x = -101 - (2000 * Math.random());
    } else {
      this.x += (150 * dt * this.speed);
    }
    this.head = this.x + 101;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';

    this.update = function() {

//define left and right border of actual image (without transparent background)
        this.rightHand = this.x + 80;
        this.leftHand = this.x + 21;

// check position of player and call function if indicated
        switch (this.y) {
          case -11:
            this.gameWon = true;
            break;
          case 72:
            row1Enemies.forEach(this.checkCollisions);
            break;
          case 155:
            row2Enemies.forEach(this.checkCollisions);
            break;
          case 238:
            row3Enemies.forEach(this.checkCollisions);

        }
    };

    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    this.handleInput = function(key) {
      switch (key) {
        case "left":
          if (this.x > 0) {
            this.x -= 101;
          };
          break;
        case "up":
          if (this.y > 0) {
            this.y -= 83;
          };
          break;
        case "right":
          if (this.x < 404) {
            this.x += 101;
          };
          break;
        case "down":
          if (this.y < 404) {
            this.y += 83;
          };
      }
    }

    this.checkCollisions = function (bug) {
      if (bug.head > player.leftHand && bug.x < player.rightHand) {
              player.y = 404;
            }
          };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

let allEnemies = [];

// create 3 enemy bugs for each row with a different speed each, and add to array

for (i = 1; i < 4; i++) {
  for (j = 1; j < 4; j++) {
    let bug = new Enemy(i, j);
    allEnemies.push(bug);
  }
}

// create 3 sub-arrays with bugs of each row

let row1Enemies = allEnemies.filter(bug => bug.row == 1);
let row2Enemies = allEnemies.filter(bug => bug.row == 2);
let row3Enemies = allEnemies.filter(bug => bug.row == 3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

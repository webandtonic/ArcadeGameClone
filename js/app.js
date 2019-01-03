// Enemies our player must avoid
var Enemy = function(row, speed, start) {
    this.x = -101 * 50 * start;
    this.y = (row * 83) - 20;
    this.speed = speed;
    this.start = start;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > 505) {
      this.x = -101 * 50 * this.start;
    } else {
      this.x += 2 + dt + this.speed;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let allEnemies = [];

for (i = 1; i < 4; i++) {
  for (j = 1; j < 4; j++) {
    let k = Math.random();
    let bug = new Enemy(i, j, k);
    allEnemies.push(bug);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202;
    this.y = 404;
    this.sprite = 'images/char-boy.png';

    this.update = function() {
        // check collision/position here
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
          break;
      }
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var numRows = 6,
    numCols = 5,
    sizeRows = 83,
    sizeCols = 101,
    offsetYPlayer = -10,
    offsetYEnemy = -15;

var debug = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > numCols * sizeCols) this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.x >= 0) {
        ctx.drawImage(Resources.get(this.sprite),
        this.x , this.y * sizeRows + offsetYEnemy);
    }
};

Enemy.prototype.reset = function() {
  if (debug) {
    this.x = 2.1 * sizeCols;
    this.y = 3;
    this.speed = 0;

  } else {
      this.x = - Math.random() * sizeCols * 3; // simulate a random start time
      this.y = Math.floor((Math.random() * 3) + 1); // random row
      this.speed = Math.floor(Math.random() * 3 + 1) * 100; // 3 possible speeds
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
    var player = this;
    if (player.y === 0) player.reset(); // reaches water
    allEnemies.forEach(function(enemy) {
        if (player.y === enemy.y) {
            if (enemy.x >= 0){
              var enemyLocation = Math.floor(enemy.x / sizeCols),
                  enemyNextLocation = enemy.x - enemyLocation * sizeCols;
              if ((player.x === enemyLocation) ||
                  ((player.x === enemyLocation + 1) && (enemyNextLocation !== 0)))
                  player.reset();
            }
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x * sizeCols, this.y * sizeRows + offsetYPlayer);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0) this.x -= 1;
            break;
        case 'up':
            if (this.y > 0) this.y -= 1;
            break;
        case 'right':
            if ((this.x + 1) < numCols) this.x += 1;
            break;
        case 'down':
            if ((this.y + 1) < numRows) this.y += 1;
            break;
    }
};

Player.prototype.reset = function() {
  this.x = Math.floor(Math.random() * numCols);
  this.y = Math.floor(Math.random() * 2 + 4);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [new Enemy(), new Enemy(), new Enemy()];
player = new Player();

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

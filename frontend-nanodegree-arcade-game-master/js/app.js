class Enemy { //class Enemy that will instantiated out beetle enemies that the player must avoid 
    constructor(x, y, speed) {
    this.x = x;
    this.y = y + 55; //centers the enemy on the screen, make sure Enemy and Player objects share same padding to create collision function
    this.speed = speed; //unique property for each Enemy beetle 
    this.sprite = 'images/enemy-bug.png'; //beetle enemy
    this.colStep = 101; //MOVES BEETLE ALONG X AXIS
    this.boundary = this.colStep * 5; //same boundary as used for Player but use 5 instead of 4 so that beetle crosses boundary and disapears
    this.reset = -this.colStep; //puts Enemy BEFORE first block on x-axis
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        //update method handles the enemy movement and multiplies something called dt (time delta) to normalize game speed.
        if (this.x < this.boundary) { 
            this.x += this.speed * dt; //incrememnts along x axis and multiplied by dt giving Enemy constant speed
        } 
        else {
            this.x = this.reset;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //code copied from engine.js
    }
};

class Player { //class Player instansiates out Player for the game 
    constructor() {
        this.rowStep = 83; //values for x/y coor taken from engine where it specifies col=101, row =83 *MOVES ALONG Y AXIS (UP/DOWN)
        this.colStep = 101; //step over columns on x-axis, step up and down row on y-axis *MOVES ALONG X AXIS (RIGHT/LEFT)
        this.startY = (this.rowStep * 4) + 55; //moves player 5 rows down, -20 adds padding to help center the player
        this.startX = (this.colStep * 2); //moves player 2 columns to the right
        this.x = this.startX; //puts player at bottom center of game, will use in our reset method later
        this.y = this.startY;
        this.sprite = 'images/char-boy.png';
        this.winGame = false; //initially false when object created, will switch to true when conditions met inside update() method
        }
    
    reset () { //resets player if there is a collision with an Enemy
        this.x = this.startX; 
        this.y = this.startY;
    }
 
    update() { //update() method works with collisions
        allEnemies.forEach(function(enemy) {
            const enemySteps = enemy.x + enemy.colStep/2; //stores below code in variables for more organization  
            const playerSteps = this.x + this.colStep/2; //dividing by 2 tightenisn up space collision
            if (this.y === enemy.y && (enemySteps > this.x && enemy.x < playerSteps) ) { 
                this.reset(); //above code ensures beatle's right side is > player left side & beatles left side < player's right side to detect collision before resetting 
                }
                console.log(this.y, enemy.y);
        }.bind(this)) //bind 'this'(belonging to Player) keyword to provided Enemy values 
        if (this.y === 55) { //55 beacuse of extra added padding
            this.winGame = true;
        }
    }

    render() { // render() code draws player on screen
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }
    //^copy and pasted this code from render frunction of Enemy.prototype at the top of source code
    //^^Resources.get retreives cached img from sprite, this.x and this.y hold current property values on game 

    handleInput(input) { //using else if statements to move player based on key codes from event Listener ****can I use a different word than INPUT????
        if (input === 'left' && this.x > 0) {
            this.x -= this.colStep; //sub from x axis moves left
        }
        if (input === 'up' && this.y > this.rowStep) { //need to use one rowStep property to ensure Player does not end up in the water
            this.y -= this.rowStep; //sub from y axis moves up
        } 
        if (input === 'right' && this.x < this.colStep * 4) { //left most block starts at 0, a total of 4 steps bring us to the right edge 
            this.x += this.colStep; //add to x axis moves right
        }
        else if (input === 'down' && this.y < this.rowStep * 4) {//for rowSteps down from y-axis creates the bottom border
            this.y += this.rowStep; //add to y axis moves down
        } 
    }
}

const player = new Player(); //instantiates new object from Player class
const beetle1 = new Enemy(-101, 0, 200); //pass in diff arguments into each new Enemy instance so they enter game at different intervals 
const beetle2 = new Enemy(-101, 83, 300); //rememeber, aruguments are:x, y, and speed values from Enemy class
const beetle3 = new Enemy((-101 * 3), 166, 300); 
const allEnemies = [];
allEnemies.push(beetle1, beetle2, beetle3);
console.log(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left', //left arrow - 37
        38: 'up', //up arrow - 38
        39: 'right', //right arrow 39
        40: 'down' //down arrow 40
    };
    player.handleInput(allowedKeys[e.keyCode]); //[e.keycode] holds value of string. This method makes a call on a player that hanles input.
});

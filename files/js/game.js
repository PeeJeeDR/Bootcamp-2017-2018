var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );
// 800, 576

/* ===== GLOBALS ===== */
var onMobile    = true;

var scoreText;
var lvlText;

var graphicOverlay;
var restartButton;
var menuButton;

var currentLevel;

var map;

var enemy;
var enemies         = [];
var nbrOfEnemies    = 2;

var coins;
var coinsArray      = [];
var coinsCollected  = 0;

var point;
var points;
var pointArray  = [];

var player;

var stars;

var groundLayer;
var borderLayer;

<<<<<<< HEAD
var hearts;
=======
>>>>>>> master
var heart;
var heartArray  = [];
var health = 3;

var enemyHitCounter = 0;
var enableToHit = false;
<<<<<<< HEAD
=======

var pacman;
var mariokart;
var menuBackground;

var boxXPositions   = [];
var boxYPositions   = [];
var mysteryBox;
var mysteryBoxes;



var timer;
var total   = 0;

var powerUps    = [
    "rocket",
    "immortal",
    "banana"
]

>>>>>>> master
/* ===== SETTINGS ===== */
var playerSettings = {
    moveSpeed: 15,
    timeToGetHit: 100,
}

var rocketSettings = {
    moveSpeed: 20,
}

var enemySettings = {
    moveSpeed: 200,
}

<<<<<<< HEAD
var pacman;
var mariokart;
var menuBackground;
/*======mysterybox====*/
var min = 20;
var max = 30;


var rndTraitNbr;
var mysteryBoxes;
var mysteryBox;
var boxPointArr = [];

var boxCollected = false;

var mysteryArr     =[];
var rndMysteryBox;

var banaan;

<<<<<<< HEAD
var banaanObj;
var nbrOfBanana =0;
var banaanArr   =[];
var trapArr     =[];   
var rndTrap;

var rocket;
var rocketHit = false;
var explosion;

var rndX;
var rndY;
=======
=======
var mysteryBoxSettings      = {
    timeFirstBox: 7,
    timeBetweenBoxes: 10
}
>>>>>>> master
>>>>>>> 2d1d07a1fdec85237b82958899d8276fe6b7e4b6



/* ===== FUNCTIONS ===== */

function enemyOnPoint (enemy, point)
{
    margeXTop       = point.x + 1;
    margeXBottom    = point.x - 1;

    margeYTop       = point.y + 1;
    margeYBottom    = point.y - 1;

    if ((Math.ceil(enemy.body.x) >= margeXBottom && Math.ceil(enemy.body.x) <= margeXTop) && (Math.ceil(enemy.body.y) >= margeYBottom && Math.ceil(enemy.body.y) <= margeYTop))
    {
        switch (Math.floor(Math.random() * (5 - 1) + 1))
        {
            case 1:
                enemy.body.velocity.x   = 200;
                enemy.animations.play('right');
                enemy.animations.stop('left');
                enemy.animations.stop('up');
                enemy.animations.stop('down');
            break;

            case 2:
                enemy.body.velocity.x   = -200;
                enemy.animations.play('left');
                enemy.animations.stop('right');
                enemy.animations.stop('up');
                enemy.animations.stop('down');
            break;

            case 3:
                enemy.body.velocity.y   = 200;
                enemy.animations.play('down');
                enemy.animations.stop('up');
                enemy.animations.stop('left');
                enemy.animations.stop('right');
            break;

            case 4:
                enemy.body.velocity.y   = -200;
                enemy.animations.play('up');
                enemy.animations.stop('down');
                enemy.animations.stop('lerft');
                enemy.animations.stop('right');
            break;
        }
    }
}

function cursorControls (sprite, autoMovement)
{
    if (!autoMovement)
    {
        sprite.body.velocity.x  = 0;
        sprite.body.velocity.y  = 0;
    }

    if (cursors.down.isDown)
    {
        sprite.body.velocity.y   = 200;
    }
    else if (cursors.up.isDown)
    {
        sprite.body.velocity.y   = -200;
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x   = -200;
    } 
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x   = 200;
    }
}

function collectCoin (enemy, coin)
<<<<<<< HEAD
{   
    
    coin.kill();
    coinsCollected += 1;
    scoreText.text  = coinsCollected
}
=======
{     
    coin.animations.stop('spin');
    coin.animations.play('collected');
    game.time.events.add(Phaser.Timer.SECOND * 0.3, killCoin, this);
>>>>>>> 2d1d07a1fdec85237b82958899d8276fe6b7e4b6

<<<<<<< HEAD
function killHeart(player,enemy)
{
    
    
    console.log('test');
    health--;    
=======
    coin.kill();
        coinsCollected += 1;
        scoreText.text  = coinsCollected
>>>>>>> master

    function killCoin () 
    {
        
    }
}

function killPlayer ()
{
    if(health == 0){

        graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
        graphicOverlay.beginFill(0x000000, 0.7);
        graphicOverlay.drawRect(0,0, game.world.width, game.world.height);
        graphicOverlay.endFill();
        this.overlay = this.game.add.image(-10,-10,graphicOverlay.generateTexture());
        this.overlay.inputEnabled = true;
        
        game_over = game.add.sprite(game.world.centerX , game.world.centerY - 150, 'game_over');
        game_over.anchor.setTo(0.5);
        game_over.animations.add('game_over', [0,1,2,3,4,5,4,5,6,7,8,9], 5, true);
	    game_over.animations.play("game_over");

        restartButton   = game.add.button(game.world.centerX - 150, game.world.centerY, 'restart_btn', resetGame, this);
        restartButton.anchor.setTo(0.5);

        menuButton   = game.add.button(game.world.centerX + 150, game.world.centerY, 'menu_btn', backToMenu, this);
        menuButton.anchor.setTo(0.5);

        game.camera.shake(0.01, 300);
        player.kill();

        gameOver    = true;
    }
}

function resetGame () 
{
    game.state.start('reset');
}

function backToMenu ()
{
    game.state.start('menu');
}

function displayScore ()
{
    scoreText    = game.add.text( 
        592, 
        115, 
        coinsCollected, 
        { 
            font: "32px Arial", 
            fill: "#fff" 
        } 
    );

    scoreText.anchor.setTo( 0.5 );
}

function displayLevel ()
{
    lvlText    = game.add.text( 
        592, 
        115, 
        currentLevel, 
        { 
            font: "32px Arial", 
            fill: "#fff" 
        } 
    );

    lvlText.anchor.setTo( 0.5 );

    lvlText.text    = currentLevel;
}

<<<<<<< HEAD
=======
function displayHearts ()
{
    map.objects.health.forEach(function (hp) {
        heart      = game.add.image(hp.x, hp.y, 'heart');
        heartArray.push(heart);
    }, this);
}

function killHeart(player, enemy)
{
    game.camera.shake(0.008, 300);
    health--;

    stars.animations.play('onHit');

    heartArray[health].destroy();
    
    if (health  === 0)
    {
        killPlayer();
    }
}

>>>>>>> master
function fixFallthrough() 
{
    game.physics.arcade.TILE_BIAS = 40;
}

<<<<<<< HEAD
function handleOrientation (e)
=======
function checkCoins ()
{
    // coinsArray.length
    if (coinsCollected === 10)
    {
        // Wat doen als alle levels gecleared zijn?
    }
}

function addMysteryBox ()
{
    var maxNbr          = boxXPositions.length;
    var randomNbr       = Math.floor(Math.random() * (maxNbr - 0) + 0);

    var randomX         = boxXPositions[randomNbr];
    var randomY         = boxYPositions[randomNbr];

    mysteryBox  = mysteryBoxes.create(randomX, randomY, 'mysterybox');
}

function removeMysteryBox ()
>>>>>>> master
{
    mysteryBox.destroy();
}



function HandleOrientation (e) 
{
    player.body.velocity.y = -e.gamma * playerSettings.moveSpeed;
    player.body.velocity.x = e.beta * playerSettings.moveSpeed;
}

/*function checkOverlap(player, mysteryBox) {

    var boundsA = player.getBounds();
    var boundsB = mysteryBox.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}*/

function createBox(){
    boxCollected = false;

    console.log(boxPointArr);
    

    rndTraitNbr = Math.floor(Math.random()*boxPointArr.length);

    rndX=boxPointArr[rndTraitNbr].x;
    rndY=boxPointArr[rndTraitNbr].y;

    mysteryBox = game.add.image(boxPointArr[rndTraitNbr].x , boxPointArr[rndTraitNbr].y , 'mysteryboxImg');
    game.physics.arcade.enable(mysteryBox);
    game.time.events.repeat(Phaser.Timer.SECOND*min,1, collectMysteryBox, this);
   
 }

function notCollected(){

if(!boxCollected){
    mysteryBox.destroy();
    timeOut();

}

}



function collectMysteryBox (){

    boxCollected = true;

    console.log('in mystery');

    mysteryBox.destroy();


   // mysteryArr=[ "immortal", "bananaDrop", "projectile" ];
   // rndMysteryBox = Phaser.ArrayUtils.getRandomItem(mysteryArr);

    console.log("destroy");
    projectile();

  /* if(rndMysteryBox == "immortal"){ immortal();}
   else if(rndMysteryBox == "bananaDrop"){ bananaDrop();}
   else{ projectile(); }*/

}


function immortal  (){

    console.log('I"m immortal');
    var count = 0;

    var backupHealth = health;
    

   while(count< 10000){
       health=10;

   if( game.physics.arcade.collide( player, enemy))
   {
        enemy.destroy();
   }

   count++;
}

    health = backupHealth;
    console.log("immortal finished");
    timeOut();
    

    
       }
   
function bananaDrop (){
    console.log('drop banana');
    
        banaan  = new Banaan();
        banaanArr.push(banaan);
    

    //banaan      = game.add.image(trapArr[rndTrap].x , trapArr[rndTrap].y , 'banana');
    //banaanObj   = banaan + banaanCnt;

    //banaanArr.push(banaanObj);
    //console.log(banaanArr);
    

    timeOut();
}
   
function projectile (){

    console.log('shoot projectile');

   game.physics.arcade.enable(player, false);
   rocket =  new Rocket(100 , 300); 
   
    
    
}

function explosion (enemy){

    
    explosion = game.add.sprite(enemy.position.x, enemy.position.y, 'explosion');

    explosion.animations.add('explode');

    explosion.animations.play('explode', 4, false);
    timeOut();

}

function timeOut()
{
    var rndTime = Math.floor(Math.random()*(max - min+1)+min);
    console.log(rndTime);
    game.time.events.repeat(Phaser.Timer.SECOND*rndTime, 1, createBox,this);
}
/* ===== STATES ===== */

// CORE STATES
game.state.add('boot', BootState);
game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('reset', ResetState);
game.state.add('instructions', InstructionState);
game.state.add('credits', CreditState);
game.state.add('loading-animation', LoadingAnimationState);

// LEVELS
game.state.add('level_1', Level_1);
game.state.add('level_2', Level_2);
game.state.add('level_3', Level_3);
game.state.add('level_4', Level_4);
game.state.add('level_5', Level_5);

// INTROS

// START
game.state.start('boot');
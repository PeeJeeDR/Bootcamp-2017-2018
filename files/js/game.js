var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );

/* ===== GLOBALS ===== */
var onMobile    = true;

var scoreText;
var lvlText;

var graphicOverlay;
var restartButton;
var menuButton;
var gameOver        = false;

var currentLevel;

var map;

var enemy;
var enemies         = [];
var nbrOfEnemies    = 2;

var coin;
var coins;
var coinsArray      = [];
var coinsCollected  = 0;

var point;
var points;
var pointArray  = [];

var player;

var groundLayer;
var borderLayer;

var hearts;
var heart;
var heartArray= [];
var health = 3;

var enemyHitCounter = 0;
var enableToHit = false;
/* ===== SETTINGS ===== */
var playerSettings = {
    moveSpeed: 20,
}

var enemySettings = {
    moveSpeed: 200,
}

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


/* ===== FUNCTIONS ===== */
function moveEnemy (enemy)
{
    if (enemy.body.blocked.up || enemy.body.blocked.down)
    {
        if (Math.random() >= 0.5)
        {
            enemy.body.velocity.x  = -200;
        } 
        else 
        {
            enemy.body.velocity.x  = 200;
        }
    }

    else if (enemy.body.blocked.left || enemy.body.blocked.right)
    {
        if (Math.random() >= 0.5)
        {
            enemy.body.velocity.y  = 200;
        } 
        else 
        {
            enemy.body.velocity.y  = -200;
        }
    }
}

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
            break;

            case 2:
                enemy.body.velocity.x   = -200;
            break;

            case 3:
                enemy.body.velocity.y   = 200;
            break;

            case 4:
                enemy.body.velocity.y   = -200;
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
{     
    coin.kill();
    coinsCollected += 1;
    scoreText.text  = coinsCollected
}

function killHeart(player,enemy)
{
    
    
    console.log('test');
    health--;    

    for(i=0;i<heartArray.length;i++){
        if(heartArray[i] === health){
            heart.kill();
            
        }
    }
    
}

function killPlayer (player, enemy)
{
    if(health == 0){

        graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
        graphicOverlay.beginFill(0x000000, 0.7);
        graphicOverlay.drawRect(0,0, game.world.width, game.world.height);
        graphicOverlay.endFill();
        this.overlay = this.game.add.image(-10,-10,graphicOverlay.generateTexture());
        this.overlay.inputEnabled = true;

        restartButton   = game.add.button(game.world.centerX - 100, game.world.centerY, 'asset', resetGame, this);
        restartButton.anchor.setTo(0.5);

        menuButton   = game.add.button(game.world.centerX + 100, game.world.centerY, 'asset', backToMenu, this);
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
        208, 
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

function fixFallthrough() 
{
    game.physics.arcade.TILE_BIAS = 40;
}

function handleOrientation (e)
{
    player.body.velocity.y = -e.gamma * playerSettings.moveSpeed;
    player.body.velocity.x = e.beta * playerSettings.moveSpeed;
}

function delayKill(){
    console.log(enemyHitCounter);
}

/*function checkOverlap(player, mysteryBox) {

    var boundsA = player.getBounds();
    var boundsB = mysteryBox.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}*/

function createBox(){
    boxCollected = false;

    console.log(boxPointArr);
    

    rndTraitNbr = Math.floor(Math.random()*12);

    mysteryBox = game.add.image(boxPointArr[rndTraitNbr].x , boxPointArr[rndTraitNbr].y , 'mysteryboxImg');
    game.physics.arcade.enable(mysteryBox);
    game.time.events.repeat(Phaser.Timer.SECOND*min,1, notCollected, this);
   
 }

function notCollected(){

if(!boxCollected){
    mysteryBox.destroy();
    timeOut();

}

}



function collectMysteryBox (player, mysteryBox){

    boxCollected = true;

    console.log('in mystery');

    mysteryBox.destroy();


    mysteryArr=[ "immortal", "bananaDrop", "projectile" ];
    rndMysteryBox = Phaser.ArrayUtils.getRandomItem(mysteryArr);

    console.log("destroy");


   if(rndMysteryBox == "immortal"){ immortal();}
   else if(rndMysteryBox == "bananaDrop"){ bananaDrop();}
   else{ projectile(); }

}


function immortal  (){

    console.log('I"m immortal');
  //  var count = 0;

 /* while(count< 10000){

   if( game.physics.arcade.collide(_player, enemy))
   {
        enemy.kill();
   }

   count++;
}*/

    timeOut();
    

    
       }
   
function bananaDrop (){
    console.log('drop banana');

   //  banaan = game.add.image(game.world.centerX , game.world.centerY , 'banaan'); 
    timeOut();
}
   
function projectile (){

    console.log('shoot projectile');
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

// LEVELS
game.state.add('level_1', Level_1);
game.state.add('level_2', Level_2);
game.state.add('level_3', Level_3);
game.state.add('level_4', Level_4);
game.state.add('level_5', Level_5);

// INTROS

// START
game.state.start('boot');
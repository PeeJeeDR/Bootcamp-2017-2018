var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );
// 800, 576

/* ===== GLOBALS ===== */
// MOBILE
var onMobile    = false;

// TEXT & MENU
var scoreText;
var lvlText;
var graphicOverlay;
var restartButton;
var menuButton;

// MAP & LEVEL
var currentLevel;
var map;
var groundLayer;
var borderLayer;

// ENEMY
var enemy;
var enemies         = [];
var nbrOfEnemies    = 2;
var enemyHitCounter = 0;
var enableToHit = false;

// COINS
var coins;
var coinsArray      = [];
var coinsCollected  = 0;
var coinsArrayLength;

// POINTS
var point;
var points;
var pointArray  = [];

// PLAYER
var player;
var playerFaceDirection;

// STARS
var stars;

// HEARTS
var heart;
var heartArray  = [];
var health = 3;

// ANIMATIONS
var pacman;
var mariokart;
var menuBackground;
var soundBtn;


var coinHit;
var enemyHit;
var pressStart;
var theme;
var gameMusicOver;
var playMusic = true;

// MYSTERY BOXES
var boxXPositions   = [];
var boxYPositions   = [];
var mysteryBox;
var mysteryBoxes;
var spawnTimeFirstBox   = 3;
var firstBoxSpawned     = false;
var timeFirstBox        = 7;
var timeForNextBox      = 7;
var timeBoxRemoved      = 0;
var boxTotal   = 0;

// POWERUPS
var powerUps    = [
    // "rocket",
    //"immortal",
     "banana"
]
var powerUp;

var bananaPowerActive = false;
var bananas;
var graphicsGroup;
var banana;
var bananaOnScreen  = false;
var bananaXPos  = [];
var bananaYPos  = [];
var graphics;

// IMMORTAL
var immortalState   = false;

// IMMORTAL
var immortalState   = false;

/* ===== SETTINGS ===== */
var playerSettings = {
    moveSpeed: 15,
    timeToGetHit: 100,
}

var enemySettings = {
    moveSpeed: 200,
}


var levelNumber;



/* ===== FUNCTIONS ===== */

function enemyOnPoint (enemy, point)
{
    margeXTop       = point.x + 1;
    margeXBottom    = point.x - 1;

    margeYTop       = point.y + 1;
    margeYBottom    = point.y - 1;

    if(!bananaPowerUp){
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
    coin.animations.stop('spin');
    coin.animations.play('collected');
    // game.time.events.add(Phaser.Timer.SECOND * 0.3, killCoin, this);
    killCoin();

    if(playMusic){

    coinHit = game.add.audio('hit');
    coinHit.volume = 0.012;
    coinHit.play();
    }

    function killCoin () 
    {
        coin.kill();
        coinsCollected += 1;
        scoreText.text  = coinsCollected
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

       
        
        if(playMusic){
            theme.stop();
            gameMusicOver = game.add.audio('gameOver');
            gameMusicOver.volume = 0.2;
            gameMusicOver.play();
        }

        gameOver    = true;
    }
}

function killEnemy (player, enemy)
{
    pacman_dead = game.add.sprite(enemy.x, enemy.y, 'pacman_dead');
    pacman_dead.frame = 0;
    pacman_dead.anchor.setTo(0.5);
    pacman_dead.animations.add('onDead', [0, 1, 2, 3, 0], 12, false);
    pacman_dead.animations.play('onDead');
    game.time.events.add(Phaser.Timer.SECOND * 1, pacmanDead, this);
    enemy.kill();
}

function pacmanDead () 
{
	pacman_dead.destroy();
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

function displayHearts ()
{
    map.objects.health.forEach(function (hp) {
        heart      = game.add.image(hp.x, hp.y, 'heart');
        heartArray.push(heart);
    }, this);
}

function killHeart(player, enemy)
{

    game.camera.shake(0.025, 300);
    game.camera.flash(0xff0000, 100);

    stars.animations.play('onHit');
    window.navigator.vibrate([1000,2000,1000]);


    if(playMusic){
        enemyHit = game.add.audio('enemyHit');
        enemyHit.volume = 0.1;
        enemyHit.play();
    }

    if (!immortalState)
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
}

function fixFallthrough() 
{
    game.physics.arcade.TILE_BIAS = 40;
}

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
    firstBoxSpawned     = true;
    var maxNbr          = boxXPositions.length;
    var randomNbr       = Math.floor(Math.random() * (maxNbr - 0) + 0);

    var randomX         = boxXPositions[randomNbr];
    var randomY         = boxYPositions[randomNbr];

    mysteryBox  = mysteryBoxes.create(randomX, randomY, 'mysterybox');
}

function generateBoxes ()
{
    if (boxTotal >= timeFirstBox + spawnTimeFirstBox)
    {
        spawnTimeFirstBox   = 0;
        removeMysteryBox();
        if (boxTotal == timeFirstBox + timeForNextBox)
        {
            boxTotal   = 0;
            game.time.events.add(Phaser.Timer.SECOND, addMysteryBox, this);
        }
    }
}

function collectMysteryBox ()
{
    boxTotal   = 0;

    var randomNbr   = Math.floor(Math.random() * (powerUps.length - 0) + 0);
    powerUp         = powerUps[randomNbr];

    activatePowerUp();

    mysteryBox.destroy();
}

function removeMysteryBox ()
{
    timeBoxRemoved  = boxTotal;
    mysteryBox.destroy();
}

function updateBoxCounter ()
{
    boxTotal++;
}

function activatePowerUp ()
{
    switch (powerUp)
    {
        case 'immortal':
            immortalPowerUp();
        break;

        case 'rocket':
            rocketPowerUp();
        break;

        case 'banana':
            bananaPowerUp();
        break;
    }
}

function immortalPowerUp ()
{
    immortalState   = true;
}

function resetImmortalPowerUp ()
{
    immortalState   = false;
}

function rocketPowerUp ()
{
    console.log('rocket');
}

function bananaPowerUp ()
{

    bananaOnScreen  = true;

    for(var i=0, ilen = boxXPositions.length; i<ilen; i++)
    {
        square(bananaXPos[i], bananaYPos[i]);
    }

    game.input.onTap.add(onTap, this);
}

function square(x, y)
{
    graphics = game.make.graphics(x, y);
    graphics.lineStyle(1, 0x408046, 1);
    
    // draw a square
    graphics.lineTo(0, 32);
    graphics.lineTo(32, 32);
    graphics.lineTo(32, 0);
    graphics.lineTo(0, 0)
    
    graphicsGroup.add(graphics);
}

function onTap( pointer)
{
    if(bananaOnScreen)
    {
        for (var i = 0, ilen = bananaXPos.length; i < ilen; i++)
        {
            if (((pointer.x >= (bananaXPos[i]) && pointer.x <= (bananaXPos[i] + 32))) &&  (pointer.y >= (bananaYPos[i]) && pointer.y <= (bananaYPos[i] + 32)))
            {
                 banaan         = new Banaan((bananaXPos[i] + 32 / 2), (bananaYPos[i] + 32 / 2));
                 bananaOnScreen = false
            }
         }
    }
}

function enemyOnBanana (enemie, banana)
{
    enemie.destroy();
    banana.destroy();
}

function HandleOrientation (e) 
{
    player.body.velocity.y = -e.gamma * playerSettings.moveSpeed;
    player.body.velocity.x = e.beta * playerSettings.moveSpeed;
}

function onWin (currentLevel)
{
	if(coinsCollected == coinsArrayLength)
    {	
    	levelNumber = currentLevel;
        game.state.start('win');
    }
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
game.state.add('win', WinState);

// LEVELS
game.state.add('level_1', Level_1);
game.state.add('level_2', Level_2);
game.state.add('level_3', Level_3);
game.state.add('level_4', Level_4);
game.state.add('level_5', Level_5);

// INTROS

// START
game.state.start('boot');
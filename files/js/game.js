var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );
// 800, 576

/* ===== GLOBALS ===== */
// MOBILE
var onMobile    = false;

var pauseBtn;

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
var enableToHit     = false;
var startEnemiesSpawned     = false;
var enemyCounter     = 0;

// COINS
var coin;
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

// CLOUDS 
var clouds;

// HEARTS
var heart;
var heartArray  = [];
var health = 3;

// ANIMATIONS
var pacman;
var mariokart;
var menuBackground;
var soundBtn;

// AUDIO
var coinHit;
var enemyHit;
var pressStart;
var theme;
var gameMusicOver;
var powerUpSound;
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
var randomX;
var randomY;
   
// POWERUPS
var powerUps    = [
    "rocket",
    "immortal",
    //"banana"
]
var powerUp;
var powerUpRoller;

// IMMORTAL
var immortalState   = false;

// ROCKET
var rocket;
var rocketEnableToFLy   = false;
var rocketTimeInAir     = 0;
var rocketKilledEnemy   = false;
var rocketExploded      = false;

// BANANA
var bananaPowerActive = false;
var bananas;
var graphicsGroup;
var banana;
var bananaOnScreen  = false;
var bananaXPos  = [];
var bananaYPos  = [];
var graphics;

// LEVEL
var levelNumber;
var newLevelNumber  = 1;

/* ===== SETTINGS ===== */
var playerSettings = {
    moveSpeed: 15,
    timeToGetHit: 100,
    timeImmortal: 6 // in seconds
}

var enemySettings = {
    moveSpeed: 200,
}

var scoreString = "0";
var firstScoreNbr = "0";
var secondScoreNbr = "0";
var puActivated;

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

function cursorControls (sprite, autoMovement, velocity)
{
    if (!autoMovement)
    {
        sprite.body.velocity.x  = 0;
        sprite.body.velocity.y  = 0;
    }

    if (cursors.down.isDown)
    {
        sprite.body.velocity.y   = velocity;
    }
    else if (cursors.up.isDown)
    {
        sprite.body.velocity.y   = -velocity;
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x   = -velocity;
    } 
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x   = velocity;
    }
}

function collectCoin (enemy, coin)
{     
    coin.animations.stop('spin');
    coin.animations.play('collected');
    // game.time.events.add(Phaser.Timer.SECOND * 0.3, killCoin, this);
    killCoin();

    if(playMusic)
    {
        coinHit = game.add.audio('hit');
        coinHit.volume = 0.012;
        coinHit.play();
    }

    function killCoin () 
    {
        coin.kill();
        coinsCollected += 1;
        //scoreText.text  = coinsCollected
        scoreString = coinsCollected.toString();
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
    if(scoreString.length > 1)
    {
    	firstScoreNbr = scoreString.slice(0,1);
    	secondScoreNbr = scoreString.slice(1,2);
    }
    else
    {
    	firstScoreNbr = '0'
    	secondScoreNbr = scoreString;
    }

    if(scoreString != '0')
    {
    	destroyPreviousScore();
    	scoreImage1 = game.add.sprite(576, 110, 'number' + firstScoreNbr + '');
        scoreImage2 = game.add.sprite(608, 110, 'number' + secondScoreNbr + '');
        scoreImage1.anchor.setTo(0.5);
        scoreImage2.anchor.setTo(0.5);
    }
}

function destroyPreviousScore () 
{
	scoreImage1.destroy();
    scoreImage2.destroy();
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
    if (coinsCollected === coinsArray.length)
    {
        onWin();
    }
}

function addMysteryBox ()
{
    firstBoxSpawned     = true;

    var maxNbr          = boxXPositions.length;
    var randomNbr       = Math.floor(Math.random() * (maxNbr - 0) + 0);

    randomX         = boxXPositions[randomNbr];
    randomY         = boxYPositions[randomNbr];
    
    clouds = game.add.sprite(randomX, randomY, 'clouds');
    
    clouds.frame = 0;
    clouds.anchor.setTo(0,0);
    clouds.animations.add('boxAppear', [0, 1, 2, 3], 1, false);
    clouds.animations.play('boxAppear');
    
    game.time.events.add(Phaser.Timer.SECOND * 0.9,AppearMysteryBox,this);
    
}

function AppearMysteryBox(){

    game.camera.flash(0xFFD700, 300);
    clouds.destroy();

    var maxNbr          = boxXPositions.length;
    var randomNbr       = Math.floor(Math.random() * (maxNbr - 0) + 0);

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

    rolPowerUp();
    
    var randomNbr   = Math.floor(Math.random() * (powerUps.length - 0) + 0);
    powerUp         = powerUps[randomNbr];

    mysteryBox.destroy();
}

function rolPowerUp()
{
    powerUpRoller.animations.play('power');
    game.time.events.add(Phaser.Timer.SECOND * 4, activatePowerUp, this);
}

function activatePU ()
{
    puActivated     = true;
    activatePowerUp();
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

function updateRocketCounter ()
{
    rocketTimeInAir++;
}

function activatePowerUp ()
{
    powerUpRoller.animations.stop('power');
    switch (powerUp)
    {
        case 'immortal':
        if(playMusic){
            powerUpSound = game.add.audio('powerUpSound');
            powerUpSound.volume = 0.4;
            powerUpSound.play();
          } 
            immortalPowerUp();
            powerUpRoller.frame = 2;
        break;

        case 'rocket':
            rocketPowerUp();
            powerUpRoller.frame = 1;
        break;

        case 'banana':
            bananaPowerUp();
            powerUpRoller.frame = 0;
        break;
    }
}

/* === IMMORTAL === */
function immortalPowerUp ()
{
    immortalState   = true;
}

function resetImmortalPowerUp ()
{
    immortalState   = false;
}
/* ===== */

/* === ROCKET === */
function rocketPowerUp ()
{
    rocketTimeInAir     = 0;
    rocket  = new Rocket(player.x, player.y);
    rocketEnableToFLy   = true;
}

function calculateAirTime ()
{
    game.camera.shake(0.0025, 300);
    if (rocketTimeInAir > 4)
    {
        rocket.body.velocity.x  = 0;
        rocket.body.velocity.y  = 0;
        game.camera.shake(0.025, 600);
        rocketEnableToFLy   = false;
        explosion.animations.play('explode');
        game.time.events.add(Phaser.Timer.SECOND * 0.5, destroyRocket, this);
        if (rocketTimeInAir > 5)
        {
            destroyRocket();
        }
    }
}

function rocketCollision ()
{
    game.physics.arcade.overlap(rocket, enemies, rocketKill, null, this);
}

function rocketKill (rocket, enemy)
{
    rocket.body.velocity.x  = 0;
    rocket.body.velocity.y  = 0;
    explosion.animations.play('explode');
    game.camera.shake(0.025, 600);
    rocketEnableToFLy   = false;
    game.time.events.add(Phaser.Timer.SECOND * 0.5, destroyRocket, this);
    enemy.destroy();
}

function destroyRocket ()
{
    rocket.destroy();
}
/* ===== */

/* === BANANA === */
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

function onTap(pointer, graphics)
{
    if (bananaOnScreen)
    {

        for (var i = 0, ilen = bananaXPos.length; i < ilen; i++)
        {
             if (((pointer.x >= (bananaXPos[i]) && pointer.x <= (bananaXPos[i] + 32))) &&  (pointer.y >= (bananaYPos[i]) && pointer.y <= (bananaYPos[i] + 32)))
            {
                     banana         = new Banana((bananaXPos[i] + 32 / 2), (bananaYPos[i] + 32 / 2));
                     bananaOnScreen = false;
             }
         }
    }
    else if (!bananaOnScreen)
    {
        for(var i = 0, ilen = graphicsGroup.length; i < ilen; i++)
        {
            graphicsGroup[i].destroy();
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
    if (rocketEnableToFLy)
    {
        rocket.body.velocity.y = -e.gamma * playerSettings.moveSpeed;
        rocket.body.velocity.x = e.beta * playerSettings.moveSpeed;

        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }
    else 
    {
        player.body.velocity.y = -e.gamma * playerSettings.moveSpeed;
        player.body.velocity.x = e.beta * playerSettings.moveSpeed;
    }
}

function onWin ()
{
    levelNumber = currentLevel;
    game.state.start('win');
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
game.state.add('level_6', Level_6);
game.state.add('level_7', Level_7);
game.state.add('level_8', Level_8);
game.state.add('level_9', Level_9);
game.state.add('level_10', Level_10);

// INTROS

// START
game.state.start('boot');
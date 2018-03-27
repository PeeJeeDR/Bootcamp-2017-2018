var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );

/* ===== GLOBALS ===== */
var onMobile    = false;

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

var coin;
var coins;
var coinsArray      = [];
var coinsCollected  = 0;

var point;
var points;
var pointArray  = [];

var groundLayer;
var borderLayer;

/* ===== SETTINGS ===== */
var playerSettings = {
    moveSpeed: 200,
}

var enemySettings = {
    moveSpeed: 200,
}


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

function touchControls (sprite)
{
    if (game.input.activePointer.isDown)
    {
        if (game.input.activePointer.position.x < game.world.centerX)
        {
            sprite.body.velocity.x   = -200;
        }
        else if (game.input.activePointer.position.x > game.world.centerX)
        {
            sprite.body.velocity.x   = 200;
        }

        if (game.input.activePointer.position.y < game.world.centerY)
        {
            sprite.body.velocity.y   = -200;
        } 
        else if (game.input.activePointer.position.y > game.world.centerY)
        {
            sprite.body.velocity.y   = 200;
        }
    }
}

function collectCoin (enemy, coin)
{     
    coin.kill();
    coinsCollected += 1;
    scoreText.text  = coinsCollected
}

function killPlayer (player, enemy)
{
    graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
    graphicOverlay.beginFill(0x000000, 0.7);
    graphicOverlay.drawRect(0,0, game.world.width, game.world.height);
    graphicOverlay.endFill();
    this.overlay = this.game.add.image(-10,-10,graphicOverlay.generateTexture());
    this.overlay.inputEnabled = true;

    restartButton   = game.add.button(game.world.centerX, game.world.centerY, 'intro_lvl2', resetGame, this);
    restartButton.anchor.setTo(0.5);

    game.camera.shake(0.01, 300);
    player.kill();
}

function resetGame () {
    game.state.start('level_1');
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

/* ===== STATES ===== */

// CORE STATES
game.state.add( 'boot', BootState );
game.state.add( 'load', LoadState );
game.state.add( 'menu', MenuState );

// LEVELS
game.state.add( 'level_1', Level_1 );

// INTROS

// START
game.state.start( 'boot' );
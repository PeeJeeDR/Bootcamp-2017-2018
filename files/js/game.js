var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );

/* ===== GLOBALS ===== */
var onMobile    = true;

var map;

var enemy;
var enemies         = [];
var nbrOfEnemies    = 5;

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

function cursorControls (enemy)
{
    if (cursors.down.isDown)
    {
        enemy.body.velocity.y   = 200;
    }
    else if (cursors.up.isDown)
    {
        enemy.body.velocity.y   = -200;
    }

    if (cursors.left.isDown)
    {
        enemy.body.velocity.x   = -200;
    } 
    else if (cursors.right.isDown)
    {
        enemy.body.velocity.x   = 200;
    }
}

function collectCoin (enemy, coin)
{     
    coin.kill();
    coinsCollected += 1;
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
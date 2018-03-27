var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );

/* ===== GLOBALS ===== */
var map;
var enemies;
var enemy;

var point;
var points;
var pointArray  = [];

var coins = 0;

var counter     = 0;

/* ===== SETTINGS ===== */
var enemySettings = {
    moveSpeed: 200,
}


/* ===== FUNCTIONS ===== */


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
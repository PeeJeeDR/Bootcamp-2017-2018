var game    = new Phaser.Game( 480, 360, Phaser.AUTO, 'gameDiv' );

/* ===== GLOBALS ===== */



/* === FUNCTIONS === */


/* ===== STATES ===== */

// CORE STATES
game.state.add( 'boot', BootState );
game.state.add( 'load', LoadState );
game.state.add( 'menu', MenuState );
game.state.add( 'play', PlayState );

// LEVELS

// INTROS

// START
game.state.start( 'boot' );
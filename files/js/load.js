var LoadState   = {
    preload: function ()
    {
        loading = game.add.sprite(game.world.centerX, game.world.centerY, 'loading');
	    loading.animations.add('loading', [0,1,2,3,4,5,6,7], 15, true);
	    loading.anchor.setTo(0.5);
	    loading.animations.play("loading");
        this.loadTileMaps();

        cursors = game.input.keyboard.createCursorKeys();
        game.load.image('mysterybox', 'assets/sprites/mysteryBox.png');
        game.load.spritesheet('enemy', 'assets/sprites/pacman.png', 32, 32);
        game.load.image('menu', 'assets/sprites/menu.png');
        game.load.spritesheet('play_btn', 'assets/sprites/play_btn_spritesheet.png', 250, 75);
        game.load.image('credits_btn', 'assets/sprites/credits_btn.png');
        game.load.image('instructions_btn', 'assets/sprites/instructions_btn.png');
        game.load.image('back_btn', 'assets/sprites/back_btn.png');
        game.load.spritesheet('instructions_image', 'assets/sprites/instructions.png', 555, 361);
        game.load.image('heart', 'assets/sprites/heart.png');
        game.load.image('menu_btn', 'assets/sprites/menu_btn.png');
        game.load.image('restart_btn', 'assets/sprites/restart_btn.png');
        game.load.spritesheet('coin', 'assets/sprites/coin-sprite.png', 32, 32);
        game.load.spritesheet('car', 'assets/sprites/mario-sprite-immortal.png', 32, 32);
        game.load.spritesheet('game_over', 'assets/sprites/game_over.png', 250, 75);
        game.load.spritesheet('stars', 'assets/sprites/stars.png', 32, 32);
        game.load.image('number0', 'assets/sprites/number0.png');
        game.load.image('number1', 'assets/sprites/number1.png');
        game.load.image('number2', 'assets/sprites/number2.png');
        game.load.image('number3', 'assets/sprites/number3.png');
        game.load.image('number4', 'assets/sprites/number4.png');
        game.load.image('number5', 'assets/sprites/number5.png');
        game.load.image('number6', 'assets/sprites/number6.png');
        game.load.image('number7', 'assets/sprites/number7.png');
        game.load.image('number8', 'assets/sprites/number8.png');
        game.load.image('number9', 'assets/sprites/number9.png');
        game.load.image('completed', 'assets/sprites/completed.png');
        game.load.image('nextlvl', 'assets/sprites/nextlvl.png');
        game.load.image('banana', 'assets/sprites/banaan.png');
        game.load.spritesheet('musicBtn','assets/sprites/sound_btn.png',75,75);
        game.load.audio('hit','assets/sounds/Mario-coin-sound.mp3');
        game.load.audio('enemyHit','assets/sounds/hitEnemy2.mp3');
        game.load.audio('pressStart','assets/sounds/pressStart.mp3');
        game.load.audio('gameOver','assets/sounds/gameOver.mp3')
        game.load.audio('theme','assets/sounds/mariotheme.mp3');
        game.load.audio('theme2','assets/sounds/stuff-voor-mario.mp3')
        game.load.spritesheet('rocket', 'assets/sprites/projectile.png', 32, 32);
        game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 32, 32);
        game.load.spritesheet('names','assets/sprites/names.png',600,200);
        game.load.spritesheet('made_by','assets/sprites/made_by.png',300,75);
        game.load.spritesheet('pacman_dead','assets/sprites/pacman_dead.png',32,32);
        game.load.spritesheet('pauseAndPlay', 'assets/sprites/pause_play.png', 48, 48);
        game.load.spritesheet('powerUpRoller','assets/sprites/powerup_roller.png',32,32);
        game.load.spritesheet('clouds', 'assets/sprites/clouds.png', 32, 32);
    },

    create: function ()
    {
        game.state.start('menu');
    },

    loadTileMaps: function ()
    {
        game.load.tilemap('level_1', 'assets/maps/level_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_2', 'assets/maps/level_2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_3', 'assets/maps/level_3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_4', 'assets/maps/level_4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_5', 'assets/maps/level_5.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_6', 'assets/maps/level_6.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_7', 'assets/maps/level_7.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_8', 'assets/maps/level_8.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_9', 'assets/maps/level_9.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level_10', 'assets/maps/level_10.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/sprites/pacman_tileset.png', 0, 0);
       
    }
}
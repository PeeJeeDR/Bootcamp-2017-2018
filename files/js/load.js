var LoadState   = {
    preload: function ()
    {
        this.loadTileMaps();

        cursors = game.input.keyboard.createCursorKeys();
        game.load.image('mysterybox', 'assets/sprites/mysteryBox.png');
        game.load.spritesheet('enemy', 'assets/sprites/pacman.png', 32, 32);
        // game.load.image('coin', 'assets/sprites/coin.png');
        game.load.spritesheet('car', 'assets/sprites/mario-sprite.png', 32, 32);
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

        continueText   = game.add.text( 
            game.world.centerX, 
            game.world.centerY + 100, 
            "Loading...", 
            { 
                font: "28px Arial", 
                fill: "#fff" 
            } 
        );

        continueText.anchor.setTo( 0.5 );
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
        game.load.image('tiles', 'assets/sprites/pacman_tileset.png', 0, 0);
       
    }
}
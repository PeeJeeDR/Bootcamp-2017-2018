var LoadState   = {
    preload: function ()
    {
        
    
        this.loadTileMaps();
        
        cursors = game.input.keyboard.createCursorKeys();
        game.load.spritesheet('player','assets/sprites/mario-sprite.png',32,32)
    },

    create: function ()
    {
        game.state.start( 'menu' );
    },

    loadTileMaps: function ()
    {
        game.load.tilemap('level_1', 'assets/maps/level_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/sprites/pacman_tileset.png', 0, 0);
    }
}
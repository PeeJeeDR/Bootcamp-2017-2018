var Level_1   = {
    create: function ()
    {
        map     = game.add.tilemap('level_1');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        detectionLayer  = map.createLayer('detection');
        map.setCollisionBetween(0, 10000, true, groundLayer);
    }, 

    update: function ()
    {

    }
}
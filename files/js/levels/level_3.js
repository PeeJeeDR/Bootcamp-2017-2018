var Level_3   = {
    create: function ()
    {
        coinsCollected = 0;
        
        currentLevel    = 3;
        gameOver        = false;
        this.addMap();

        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            enemy  = new Enemy(48 + (i * 32), 48 + (i * 32));
            enemies.push(enemy);
        }

        
    
        points  = game.add.group();
        points.enableBody   = true;

        coins   = game.add.group();
        coins.enableBody    = true;

        map.objects.detection_points.forEach(function (point) {
            pointArray.push(point);
            points.create(point.x, point.y);
        }, this);

        map.objects.coins.forEach(function (coin) {
            coins.create(coin.x, coin.y, 'coin');
        }, this);

        map.objects.start_position.forEach(function (pos) {
            player  = new Player(pos.x + 16, pos.y + 16);
        }, this);

        displayScore();
        displayLevel();
    }, 

    update: function ()
    {
        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {
            game.physics.arcade.overlap(player, enemies[i], killPlayer, null, this);
        }

        onWin(currentLevel);
    },

    addMap: function ()
    {
        map     = game.add.tilemap('level_3');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        map.setCollisionBetween(0, 10000, true, borderLayer);
    }
}
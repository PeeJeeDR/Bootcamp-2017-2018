var Level_1   = {
    create: function ()
    {
        window.addEventListener("deviceorientation", HandleOrientation, true);

        currentLevel    = 1;
        this.addMap();
        this.groups();
        this.mapObjects();
        this.addEnemies();
        displayScore();
        displayHearts();

        fixFallthrough();
    }, 

    update: function ()
    {
        cursorControls(player, false);
        coins.callAll('play', null, 'spin');
        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {
            game.physics.arcade.overlap(player, enemies[i], killPlayer, null, this);
        }
    },

    addMap: function ()
    {
        map     = game.add.tilemap('level_1');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        map.setCollisionBetween(0, 10000, true, borderLayer);
    },

    groups: function () 
    {
        points  = game.add.group();
        points.enableBody   = true;

        coins   = game.add.group();
        coins.enableBody    = true;

        coins.forEachAlive(function (singleCoin) {
            singleCoin.animations.add('spin', [0, 1, 2, 3], 10, true);
            singleCoin.animations.add('collected', [4, 5, 6, 7], 10, true);
        }, this)
    },

    mapObjects: function ()
    {
        map.objects.detection_points.forEach(function (point) {
            pointArray.push(point);
            points.create(point.x, point.y);
        }, this);

        map.objects.coins.forEach(function (coin) {
            coinsArray.push(coin);
            coins.create(coin.x, coin.y, 'coin');
        }, this);

        map.objects.start_position.forEach(function (pos) {
            player  = new Player(pos.x + 16, pos.y + 16);
        }, this);
    },

    addEnemies: function ()
    {
        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            enemy  = new Enemy(48 + (i * 32), 48 + (i * 32));
            enemies.push(enemy);
        }
    }
}
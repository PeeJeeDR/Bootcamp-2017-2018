var Level_1   = {
    create: function ()
    {

        this.addMap();

        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            enemy  = new Enemy(48 + (i * 32), 48 + (i * 32));
            enemies.push(enemy);
        }

        player  = new Player(399, 304);
    
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

        this.gyro();
    }, 

    update: function ()
    {

    },

    addMap: function ()
    {
        map     = game.add.tilemap('level_1');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        map.setCollisionBetween(0, 10000, true, borderLayer);
    },

    gyro: function ()
    {
        gyro.frequency = 10;

        gyro.startTracking(function(o) {
            player.body.velocity.x += o.gamma/20;
            player.body.velocity.y += o.beta/20;
        });
    },
}
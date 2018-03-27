var Level_1   = {
    create: function ()
    {
        this.addMap();

        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            enemy  = new this.Enemy(48 + (i * 32), 48 + (i * 32));
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
    }, 

    update: function ()
    {
        
        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {
            game.physics.arcade.overlap(enemies[i], coins, collectCoin, null, this);
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

    Enemy: function (x, y)
    {
        var _enemy  = game.add.sprite(x, y, 'enemy');
        game.physics.arcade.enable(_enemy);

        _enemy.animations.add('enemy_idle', [0, 1, 2, 3, 4], 12, true);

        var start   = true;
        if (start)
        {
            start   = false;
            _enemy.body.velocity.x  = enemySettings.moveSpeed;
        }

        game.physics.arcade.enable(_enemy);
        _enemy.anchor.setTo(0.5);

        _enemy.update =  function ()
        {
            _enemy.animations.play("enemy_idle");
            game.physics.arcade.collide(_enemy, borderLayer);
            game.physics.arcade.overlap(_enemy, points, enemyOnPoint, null, this);
            moveEnemy(_enemy);
        }

        return _enemy;
    },
}
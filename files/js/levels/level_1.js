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

        map.objects.mystery_boxes.forEach(function (singleBox) {
            boxPointArr.push(singleBox);
            
            }, this);
            
       
        game.time.events.add(Phaser.Timer.SECOND * 10, createBox , this); 
       
        console.log(enemies);
    }, 

    update: function ()
    {
        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {
            game.physics.arcade.collide(enemies[i], coinsLayer, collectCoin, null, this);
        }
    },

    addMap: function ()
    {
        map     = game.add.tilemap('level_1');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        coinsLayer      = map.createLayer('coins');
        map.setCollisionBetween(0, 10000, true, borderLayer);
        map.setCollisionBetween(30, 30, true, coinsLayer);
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
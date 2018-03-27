var Level_1   = {
    create: function ()
    {
        this.addMap();

        enemy       = new this.Enemy(48, 48);
        enemy2      = new this.Enemy(96, 48);
        enemy3      = new this.Enemy(120, 48);
        enemy4      = new this.Enemy(120, 96);
    
        points  = game.add.group();
        points.enableBody   = true;

        map.objects.detection_points.forEach(function (point) {
            pointArray.push(point);
            points.create(point.x, point.y);
        }, this);
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

    Enemy: function (x, y)
    {
        var _enemy  = game.add.sprite(x, y, 'enemy');
        game.physics.arcade.enable(_enemy);
        var start   = true;

        if (start)
        {
            start   = false;
            _enemy.body.velocity.x  = 200;
        }

        game.physics.arcade.enable(_enemy);
        _enemy.anchor.setTo(0.5);

        _enemy.update =  function ()
        {
            game.physics.arcade.collide(_enemy, borderLayer);
            game.physics.arcade.overlap(_enemy, points, enemyOnPoint, null, this);
            moveEnemy(_enemy);
        }

        return _enemy;
    }
}
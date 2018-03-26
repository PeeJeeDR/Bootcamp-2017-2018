var Level_1   = {
    create: function ()
    {
        this.addMap();

        enemies     = game.add.group();
        enemies.enableBody  = true;
        enemy       = enemies.create(48, 48, 'enemy');
        enemy.scale.setTo(1);
        enemy.anchor.setTo(0.5);

        points  = game.add.group();
        points.enableBody   = true;

        if (map.objects.detection) {
            detectionPoints = map.objects.detection;
            detectionPoints.forEach(function (point) {
                points.create(point.x, point.y);
            }, this);
        }
    }, 

    update: function ()
    {
        this.controls();

        game.physics.arcade.collide(enemy, borderLayer, this.collide, null, this);
        game.physics.arcade.overlap(enemy, points, this.onTurningPoint, null, this);
        game.physics.arcade.overlap(enemy, groundLayer, this.onGround, null, this);
        
    },

    render: function ()
    {

    },

    collide: function ()
    {
        if (enemy.body.blocked.down)
        {
            random_direction = Math.random() >= 0.5;

            console.log(random_direction);

            if (random_direction)
            {
                enemy.body.velocity.x   = 200;
            }
            else 
            {
                enemy.body.velocity.x   = -200;
            }

            if (enemy.body.blocked.left)
            {
                enemy.body.velocity.x   = 200;
                enemy.body.velocity.y   = 0;
            }
        }
    },

    onGround: function ()
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

    onTurningPoint: function ()
    {
        console.log('hoi');
    },

    controls: function ()
    {
        if (cursors.down.isDown)
        {
            enemy.body.velocity.y   = 200;
        }
        else if (cursors.up.isDown)
        {
            enemy.body.velocity.y   = -200;
        }

        if (cursors.left.isDown)
        {
            enemy.body.velocity.x   = -200;
        } 
        else if (cursors.right.isDown)
        {
            enemy.body.velocity.x   = 200;
        }
    }
}
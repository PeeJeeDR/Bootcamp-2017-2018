var Level_1   = {
    create: function ()
    {
        this.addMap();
        random_direction = Math.random() >= 0.5;

        enemies     = game.add.group();
        enemies.enableBody  = true;
        enemy       = enemies.create(48, 48, 'enemy');
        enemy.scale.setTo(1);
        enemy.anchor.setTo(0.5);

        points  = game.add.group();
        points.enableBody   = true;

        points     = game.add.group();
        points.enableBody  = true;

        if (map.objects.Detection_Points) {
            map.objects.Detection_Points.forEach(function (point) {
                pointArray.push(point);
                points.create(point.x, point.y);
            }, this);
        }
    }, 

    update: function ()
    {
        game.physics.arcade.collide(enemy, borderLayer);
        game.physics.arcade.overlap(enemy, points, this.onPoint, null, this);

        this.controls();
        // this.moveEnemy();
    },

    moveEnemy: function ()
    {
        if (enemy.body.blocked.up || enemy.body.blocked.down)
        {
            if (Math.random() >= 0.5)
            {
                enemy.body.velocity.x  = -200;
            } 
            else 
            {
                enemy.body.velocity.x  = 200;
            }
        }

        else if (enemy.body.blocked.left || enemy.body.blocked.right)
        {
            if (Math.random() >= 0.5)
            {
                enemy.body.velocity.y  = 200;
            } 
            else 
            {
                enemy.body.velocity.y  = -200;
            }
        }
    },

    onPoint: function (enemy, point)
    {
        // console.log(point.x);
        // console.log(Math.floor(enemy.body.x));
        if (Math.round(enemy.x) === point.x || Math.round(enemy.y) === point.y)
        {
            console.log('test');
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

    controls: function ()
    {
        enemy.body.velocity.x   = 0;
        enemy.body.velocity.y   = 0;

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
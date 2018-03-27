var Level_1   = {
    create: function ()
    {
        this.addMap();
        random_direction = Math.random() >= 0.5;

        enemies     = game.add.group();
        enemies.enableBody  = true;
        enemy       = enemies.create(48, 48, 'enemy');
        enemy.anchor.setTo(0.5);
        enemy.scale.setTo(0.3);

        //enemies.callAll('animations.add', 'animations', 'fly3', [0,1], 4, true);
        //enemies.callAll('play', null, 'fly3');
        enemies.forEachAlive(function (enemy) {
            enemy.animations.add('enemy_idle', [0,1,2,3], 12, true);
        })

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

        game.physics.arcade.collide(enemy, coinsLayer, this.collectCoin, null, this);

        game.physics.arcade.overlap(enemy, points, this.onPoint, null, this);

        enemies.forEachAlive(function (enemy) {
            enemy.animations.play('enemy_idle');
        })

        this.controls();
        this.moveEnemy();
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
        margeXTop       = point.x + 1;
        margeXBottom    = point.x - 1;

        margeYTop       = point.y + 1;
        margeYBottom    = point.y - 1;

        if ((Math.ceil(enemy.body.x) >= margeXBottom && Math.ceil(enemy.body.x) <= margeXTop) && (Math.ceil(enemy.body.y) >= margeYBottom && Math.ceil(enemy.body.y) <= margeYTop))
        {
            switch (Math.floor(Math.random() * (5 - 1) + 1))
            {
                case 1:
                    enemy.body.velocity.x   = 200;
                break;

                case 2:
                    enemy.body.velocity.x   = -200;
                break;

                case 3:
                    enemy.body.velocity.y   = 200;
                break;

                case 4:
                    enemy.body.velocity.y   = -200;
                break;
            }
        }
    },

    addMap: function ()
    {
        map     = game.add.tilemap('level_1');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        coinsLayer     = map.createLayer('coins');
        map.setCollisionBetween(0, 10000, true, borderLayer);
        map.setCollisionBetween(30, 30, true, coinsLayer);
    },

    controls: function ()
    {
        /*
        enemy.body.velocity.y   = 0;
        enemy.body.velocity.x   = 0;
        */

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
    },

    collectCoin: function (enemy, coin)
    {     
        coins += 1;
        console.log("Coins: ",coins);
        map.removeTile(coin.x,coin.y,coinsLayer);
    }
}
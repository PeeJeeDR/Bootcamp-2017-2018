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

        console.log(map.objects);

        if (map.objects.detection_points) {
            map.objects.detection_points.forEach(function (point) {
                pointArray.push(point);
                points.create(point.x, point.y);
                console.log(point);
            }, this);
        }
    }, 

    update: function ()
    {
        this.controls();
        // console.log(random_direction);
        game.physics.arcade.collide(enemy, borderLayer);
        game.physics.arcade.overlap(enemy, points, this.inCorner, null, this);
    },

    inCorner: function (enemy, corner)
    {
        for (var i = 0, ilen = pointArray.length; i < ilen; i++)
        {
            if (pointArray[i].x == corner.position.x && pointArray[i].y == corner.position.y)
            {
                switch (pointArray[i].name) 
                {
                    case "tl":
                        if (enemy.body.blocked.up || enemy.body.blocked.left)
                        {
                            cameFromCorner  = true;
                            if (random_direction) 
                            {
                                enemy.body.velocity.x   = 200;
                            }
                            else 
                            {
                                enemy.body.velocity.y   = 200;
                            }
                            random_direction = Math.random() >= 0.3;
                        }
                    break;

                    case "tr":
                        if (enemy.body.blocked.up || enemy.body.blocked.right)
                        {
                            cameFromCorner  = true;
                            if (random_direction) 
                            {
                                enemy.body.velocity.x   = -200;
                            }
                            else 
                            {
                                enemy.body.velocity.y   = 200;
                            }
                            random_direction = Math.random() >= 0.5;
                        }
                    break;

                    case "bl":
                        if (enemy.body.blocked.down || enemy.body.blocked.left)
                        {
                            cameFromCorner  = true;
                            if (random_direction) 
                            {
                                enemy.body.velocity.x   = 200;
                            }
                            else 
                            {
                                enemy.body.velocity.y   = -200;
                            }
                            random_direction = Math.random() >= 0.3;
                        }
                    break;

                    case "br":
                        if (enemy.body.blocked.down || enemy.body.blocked.right)
                        {
                            cameFromCorner  = true;
                            if (random_direction) 
                            {
                                enemy.body.velocity.x   = -200;
                            }
                            else 
                            {
                                enemy.body.velocity.y   = -200;
                            }
                            random_direction = Math.random() >= 0.3;
                        }
                    break;

                    default:
                        
                    break;
                }
            }
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
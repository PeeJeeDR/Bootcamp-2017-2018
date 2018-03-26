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

        corners     = game.add.group();
        corners.enableBody  = true;

        if (map.objects.corners) {
            map.objects.corners.forEach(function (corner) {
                cornersArray.push(corner);
                corners.create(corner.x, corner.y);
                console.log(corner);
            }, this);
        }
    }, 

    update: function ()
    {
        this.controls();
        console.log(random_direction);
        game.physics.arcade.collide(enemy, borderLayer);
        game.physics.arcade.overlap(enemy, corners, this.inCorner, null, this);
    },

    inCorner: function (enemy, corner)
    {
        for (var i = 0, ilen = cornersArray.length; i < ilen; i++)
        {
            if (cornersArray[i].x == corner.position.x && cornersArray[i].y == corner.position.y)
            {
                switch (cornersArray[i].name) 
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
var Level_1   = {
    create: function ()
    {
        currentLevel    = 1;
        gameOver        = false;
        this.addMap();

        

        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            enemy  = new Enemy(48 + (i * 32), 48 + (i * 32));
            enemies.push(enemy);
        }
    
        points  = game.add.group();
        points.enableBody   = true;

        coins   = game.add.group();
        coins.enableBody    = true;

        hearts   = game.add.group();
        hearts.enableBody    = true;
    
        hearts.scale.setTo(0.15);
    
        
        

        map.objects.detection_points.forEach(function (point) {
            pointArray.push(point);
            points.create(point.x, point.y);
        }, this);

        map.objects.coins.forEach(function (coin) {
            coins.create(coin.x, coin.y, 'coin');
        }, this);

        map.objects.start_position.forEach(function (pos) {
            player  = new Player(pos.x + 16, pos.y + 16);
        }, this);

        map.objects.mystery_boxes.forEach(function (singleBox) {
            boxPointArr.push(singleBox);
            
            }, this);
            
        
        game.time.events.add(Phaser.Timer.SECOND * 10, createBox , this); 

        displayScore();
        displayLevel();
        window.addEventListener("deviceorientation", handleOrientation, true);
    }, 

    update: function ()
    {
        
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
}
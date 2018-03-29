var Level_1   = {
    create: function ()
    {
        window.addEventListener("deviceorientation", HandleOrientation, true);

        currentLevel    = 1;
        this.addMap(currentLevel);
        this.groups();
        this.mapObjects();
        this.addEnemies();
        displayScore();
        displayHearts();

        game.time.events.add(Phaser.Timer.SECOND * spawnTimeFirstBox, addMysteryBox, this);
        game.time.events.loop(Phaser.Timer.SECOND, updateBoxCounter, this);

        fixFallthrough();
        
    },

    update: function ()
    {
        cursorControls(player, false);

        if (firstBoxSpawned)
        {
            generateBoxes();
        }

        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {
            game.physics.arcade.overlap(player, enemies[i], killPlayer, null, this);
        }
<<<<<<< HEAD

       
    
=======
    },

    addMap: function (currentLevel)
    {
        map     = game.add.tilemap('level_' + currentLevel);
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        map.setCollisionBetween(0, 10000, true, borderLayer);
    },

    groups: function () 
    {
>>>>>>> 2d1d07a1fdec85237b82958899d8276fe6b7e4b6
        points  = game.add.group();
        points.enableBody   = true;

        game.time.events.add(Phaser.Timer.SECOND * 10, createBox , this); 

        coins   = game.add.group();
        coins.enableBody    = true;

<<<<<<< HEAD
        hearts   = game.add.group();
        hearts.enableBody    = true;
    
        hearts.scale.setTo(0.15);
    
        map.objects.detection_points.forEach(function (point) {
            pointArray.push(point);
            points.create(point.x, point.y);
        }, this);

        map.objects.coins.forEach(function (coin) {
            coins.create(coin.x, coin.y, 'coin');
=======
        mysteryBoxes    = game.add.group();
        mysteryBoxes.enableBody     = true;

        coins.forEachAlive(function (singleCoin) {
            singleCoin.animations.add('spin', [0, 1, 2, 3], 10, true);
            singleCoin.animations.add('collected', [4, 5, 6, 7], 10, true);
        }, this)
    },

    mapObjects: function ()
    {
        map.objects.detection_points.forEach(function (obj) {
            pointArray.push(obj);
            points.create(obj.x, obj.y);

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
>>>>>>> master
        }, this);

        map.objects.coins.forEach(function (obj) {
            coinsArray.push(obj);
            coins.create(obj.x, obj.y, 'coin');
        }, this);

<<<<<<< HEAD
        map.objects.mystery_boxes.forEach(function (singleBox) {
            boxPointArr.push(singleBox);
        }, this);

        map.objects.trap_points.forEach(function (trap) {
            trapArr.push(trap);
        }, this);
            

        displayScore();
        displayLevel();
        window.addEventListener("deviceorientation", handleOrientation, true);
    }, 
=======
        map.objects.start_position.forEach(function (obj) {
            player  = new Player(obj.x + 16, obj.y + 16);
            game.physics.arcade.enable(player);

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        }, this);
>>>>>>> master

        map.objects.mystery_boxes.forEach(function (obj) {
            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        })
    },

    addEnemies: function ()
    {
<<<<<<< HEAD
        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {   
            
            game.physics.arcade.overlap(player, enemies[i], killPlayer, null, this);
<<<<<<< HEAD

        

=======
=======
        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            enemy  = new Enemy(48 + (i * 32), 48 + (i * 32));
            enemies.push(enemy);
>>>>>>> master
>>>>>>> 2d1d07a1fdec85237b82958899d8276fe6b7e4b6
        }

        game.physics.arcade.collide(player, mysteryBox, collectMysteryBox, null, this);

     


        for (var i = 0, ilen = banaanArr.length; i < ilen; i++)
        {   
            
           if( game.physics.arcade.overlap(enemies, banaanArr[i])){
                banaanArr[i].destroy();
                enemy.destroy();
                nbrOfBanana--;
            
           };

        

        }
    },

    render: function ()
    {
        if (mysteryBox)
        {
            game.debug.body(mysteryBox)
        }
        
    },
}
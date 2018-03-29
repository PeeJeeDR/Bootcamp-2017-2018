var Level_1   = {
    create: function ()
    {
        window.addEventListener("deviceorientation", HandleOrientation, true);

        if(playMusic){
            theme = game.add.audio('theme');
            theme.volume = 0.07;
            theme.play();
        }
        currentLevel    = 1;
        this.addMap(currentLevel);
        this.groups();
        this.mapObjects();
        this.addEnemies();
        displayScore();
        displayHearts();

        game.time.events.add(Phaser.Timer.SECOND * 1, addMysteryBox, this);

        fixFallthrough();

        coins.forEachAlive(function (sc) {
            sc.animations.play('spin');
        }, this)

       
        
    }, 

    update: function ()
    {
        cursorControls(player, false);
        

        game.physics.arcade.overlap(player, mysteryBox);
        // Niewe spawnen door lengte van groep te meten.

        if ('length' == "0")
        {
            "do shizzle";
        }

        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {
            game.physics.arcade.overlap(player, enemies[i], killPlayer, null, this);
        }

        
        

    },

    test: function () 
    {
        console.log('eindelijk');
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
        points  = game.add.group();
        points.enableBody   = true;

        coins   = game.add.group();
        coins.enableBody    = true;

        mysteryBoxes    = game.add.group();
        mysteryBoxes.enableBody     = true;

        
    },

    mapObjects: function ()
    {
        map.objects.detection_points.forEach(function (obj) {
            pointArray.push(obj);
            points.create(obj.x, obj.y);

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        }, this);

        map.objects.coins.forEach(function (obj) {
            coinsArray.push(obj);
            coin = coins.create(obj.x, obj.y, 'coin');
            coin.animations.add('spin', [0, 1, 2, 3], 10, true);

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        }, this);

        map.objects.start_position.forEach(function (obj) {
            player  = new Player(obj.x + 16, obj.y + 16);
            game.physics.arcade.enable(player);

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        }, this);

        map.objects.mystery_boxes.forEach(function (obj) {
            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        })
    },

    addEnemies: function ()
    {
        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            enemy  = new Enemy(48 + (i * 32), 48 + (i * 32));
            enemies.push(enemy);
        }
    },
}
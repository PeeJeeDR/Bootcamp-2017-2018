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

        game.time.events.add(Phaser.Timer.SECOND * spawnTimeFirstBox, addMysteryBox, this);
        game.time.events.loop(Phaser.Timer.SECOND, updateBoxCounter, this);
        game.time.events.loop(Phaser.Timer.SECOND, setImmortalTime, this);

        fixFallthrough();

        coins.forEachAlive(function (sc) {
            sc.animations.play('spin');
        }, this)

       
        
    },

    update: function ()
    {
        cursorControls(player, false);
        

        console.log(health);

        if (firstBoxSpawned)
        {
            generateBoxes();
        }

        if (!immortalState)
        {
            for (var i = 0, ilen = enemies.length; i < ilen; i++)
            {
                game.physics.arcade.overlap(player, enemies[i], killPlayer, null, this);
            }
        }
        else 
        {
            for (var i = 0, ilen = enemies.length; i < ilen; i++)
            {
                game.physics.arcade.overlap(player, enemies[i], killEnemy, null, this);
            }

            game.time.events.add(Phaser.Timer.SECOND * 6, resetImmortalPowerUp, this);
        }
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
            coins.create(obj.x, obj.y, 'coin');
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
var Level_1   = {
    create: function ()
    {
        window.addEventListener("deviceorientation", HandleOrientation, true);

        currentLevel    = 1;
        coinsCollected  = 0;
        this.addMap(currentLevel);
        this.groups();
        this.mapObjects();
        this.addEnemies();
        displayScore();
        displayHearts();

        coins.forEachAlive(function (sc) {
            sc.animations.play('spin');
        }, this)

        if (playMusic)
        {
            theme = game.add.audio('theme');
            theme.volume = 0.07;
            theme.play();
        }

        game.time.events.add(Phaser.Timer.SECOND * spawnTimeFirstBox, addMysteryBox, this);
        game.time.events.loop(Phaser.Timer.SECOND, updateBoxCounter, this);
        game.time.events.loop(Phaser.Timer.SECOND, updateRocketCounter, this);

     

       
        
        fixFallthrough();

        console.log(bananaXPos + ', ' + bananaYPos);
    
        coinsArrayLength = coinsArray.length;
    }, 

    update: function ()
    {
        this.controls();
        this.immortalState();
        rocketCollision();

        if (firstBoxSpawned)    {generateBoxes();}
        if (rocketEnableToFLy)  {calculateAirTime();}
        onWin(currentLevel); 
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

        bananas = game.add.group();
        bananas.enableBody  = true;

        graphicsGroup   = game.add.group();

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

            bananaXPos.push(obj.x);
            bananaYPos.push(obj.y);
        }, this);

        map.objects.coins.forEach(function (obj) {
            coinsArray.push(obj);
            coin    = coins.create(obj.x, obj.y, 'coin');
            coin.animations.add('spin', [0, 1, 2, 3], 10, true);
        }, this);

        map.objects.start_position.forEach(function (obj) {
            player  = new Player(obj.x + 16, obj.y + 16);
            game.physics.arcade.enable(player);

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);

            bananaXPos.push(obj.x);
            bananaYPos.push(obj.y);
        }, this);

        map.objects.mystery_boxes.forEach(function (obj) {
            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);

            bananaXPos.push(obj.x);
            bananaYPos.push(obj.y);
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

    controls: function ()
    {
        if (!onMobile) 
        {
            if (rocketEnableToFLy)
            {
                cursorControls(rocket, false, 200);
                cursorControls(player, false, 0);
            }
            else 
            {
                cursorControls(player, false, 200);
            }
        }
    },

    immortalState: function ()
    {
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
            game.time.events.add(Phaser.Timer.SECOND * playerSettings.timeImmortal, resetImmortalPowerUp, this);
        }
    },
}
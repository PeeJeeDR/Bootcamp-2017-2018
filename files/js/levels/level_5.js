var Level_5   = {
    create: function ()
    {
        window.addEventListener("deviceorientation", HandleOrientation, true);

        currentLevel    = 5;
        this.addMap(currentLevel);
        this.groups();
        this.mapObjects();
        this.addEnemies();

        powerUpRoller = game.add.sprite(63.5,512.5,'powerUpRoller');
        powerUpRoller.anchor.setTo(0.5);
        powerUpRoller.scale.setTo(2);
        powerUpRoller.frame = 3;

        powerUpRoller.animations.add('power', [0,1,2], 5, true);
        
        this.addPauseBtn();
        displayHearts();

        coins.forEachAlive(function (sc) {
            sc.animations.play('spin');
        }, this)

        if (playMusic)
        {
            theme = game.add.audio('theme2');
            theme.volume = 0.16;
            theme.play();
            theme.loopFull();
        }

        game.time.events.add(Phaser.Timer.SECOND * spawnTimeFirstBox, addMysteryBox, this);
        game.time.events.loop(Phaser.Timer.SECOND, this.updateEnemyCounter, this);
        game.time.events.loop(Phaser.Timer.SECOND, updateBoxCounter, this);
        game.time.events.loop(Phaser.Timer.SECOND, updateRocketCounter, this);

        fixFallthrough();

        scoreImage1 = game.add.sprite(576, 110, 'number0');
        scoreImage2 = game.add.sprite(608, 110, 'number0');
        scoreImage1.anchor.setTo(0.5);
        scoreImage2.anchor.setTo(0.5);
    }, 

    update: function ()
    {
        this.controls();
        this.immortalState();
        rocketCollision();

        console.log(enemyCounter);

        if (enemyCounter > (10 + Math.floor(Math.random() * (5 - 0) + 0)))
        {
            enemyCounter    = 0;
            this.addEnemy();
        }

        if (firstBoxSpawned)    {generateBoxes();}
        if (rocketEnableToFLy)  {calculateAirTime();}
        displayScore();
    },

    updateEnemyCounter: function ()
    {
        enemyCounter++;
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

        graphicsGroup   = game.add.group();

        bananas = game.add.group();
        bananas.enableBody  = true;
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

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        }, this);

        map.objects.start_position.forEach(function (obj) {
            player  = new Player(obj.x + 16, obj.y + 16);
            game.physics.arcade.enable(player);
        }, this);

        map.objects.mystery_boxes.forEach(function (obj) {
            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);

            bananaXPos.push(obj.x);
            bananaYPos.push(obj.y);
        })
    },

    addEnemy: function ()
    {
        var randomNbr   = Math.floor(Math.random() * (bananaXPos.length - 0) + 0);
        var x   = boxXPositions[randomNbr];
        var y   = boxYPositions[randomNbr];

        enemy  = new Enemy(x, y);
        enemies.push(enemy);
    },

    addEnemies: function ()
    {
        for (var i = 0, ilen = nbrOfEnemies; i < ilen; i++)
        {
            var randomNbr   = Math.floor(Math.random() * (bananaXPos.length - 0) + 0);
            var x   = boxXPositions[randomNbr];
            var y   = boxYPositions[randomNbr];

            enemy  = new Enemy(x, y);
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

    addPauseBtn: function ()
    {
        pauseBtn    = game.add.sprite(game.world.width - 64, game.world.height - 64, 'pauseAndPlay');
        pauseBtn.anchor.setTo(0.5);
        pauseBtn.scale.setTo(1.3);

        pauseBtn.inputEnabled   = true;
        pauseBtn.events.onInputDown.add(this.pauseGame, this);
    },

    pauseGame: function ()
    {

        if (game.paused)
        {
            game.paused     = false;
            pauseBtn.frame  = 0;
        }
        else 
        {
            game.paused     = true;
            pauseBtn.frame  = 1;
            pauseBtn.scale.setTo(-1.3);
        }
    }
}
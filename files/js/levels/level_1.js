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

        mystery_box     = new MysteryBox();

        fixFallthrough();
    }, 

    update: function ()
    {

        
        cursorControls(player, false);
        for (var i = 0, ilen = enemies.length; i < ilen; i++)
        {
            game.physics.arcade.overlap(player, enemies[i], killPlayer, null, this);
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
        }, this);

        map.objects.coins.forEach(function (obj) {
            coinsArray.push(obj);
            coins.create(obj.x, obj.y, 'coin');

            boxXPositions.push(obj.x);
            boxYPositions.push(obj.y);
        }, this);

        map.objects.start_position.forEach(function (obj) {
            player  = new Player(obj.x + 16, obj.y + 16);

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

    addNewMysteryBox: function ()
    {
        activated   = true;
        console.log('test');
    }
}
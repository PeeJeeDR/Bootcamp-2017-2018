var Level_1   = {
    create: function ()
    {
        this.addMap();

        enemies     = game.add.group();
        enemies.enableBody  = true;
        enemy       = enemies.create(48, 48, 'enemy');

        enemies.forEachAlive(function(enemy) {
            enemy.anchor.setTo(0.5);
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
        game.physics.arcade.overlap(enemy, points, enemyOnPoint, null, this);

        cursorControls();
        moveEnemy();
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
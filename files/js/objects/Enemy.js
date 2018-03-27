var Enemy   = function (x, y)
{
    var _enemy  = game.add.sprite(x, y, 'enemy');
    game.physics.arcade.enable(_enemy);

    _enemy.animations.add('enemy_idle', [0, 1, 2, 3, 4], 12, true);

    var start   = true;
    if (start)
    {
        start   = false;
        _enemy.body.velocity.x  = enemySettings.moveSpeed;
    }

    game.physics.arcade.enable(_enemy);
    _enemy.anchor.setTo(0.5);

    _enemy.update =  function ()
    {
        _enemy.animations.play("enemy_idle");
        game.physics.arcade.collide(_enemy, borderLayer);
        game.physics.arcade.overlap(_enemy, points, enemyOnPoint, null, this);
        moveEnemy(_enemy);
    }

    return _enemy;
}
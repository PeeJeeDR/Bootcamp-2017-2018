var Enemy   = function (x, y)
{
    var _enemy  = game.add.sprite(x, y, 'enemy');
    game.physics.arcade.enable(_enemy);

    _enemy.animations.add('right', [0, 1, 2, 3], 12, true);
    _enemy.animations.add('down', [4, 5, 6, 7], 12, true);
    _enemy.animations.add('left', [8, 9, 10, 11], 12, true);
    _enemy.animations.add('up', [12, 13, 14, 15], 12, true);

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
        game.physics.arcade.collide(_enemy, borderLayer);
        game.physics.arcade.overlap(_enemy, points, enemyOnPoint, null, this);
        this.move();
    }

    _enemy.move     = function () 
    {
        if (_enemy.body.blocked.up || _enemy.body.blocked.down)
        {
            if (Math.random() >= 0.5)
            {
                _enemy.body.velocity.y  = 0;
                _enemy.body.velocity.x  = -200;
                _enemy.animations.play('left');
                _enemy.animations.stop('right');
                _enemy.animations.stop('up');
                _enemy.animations.stop('down');
            } 
            else 
            {
                _enemy.body.velocity.y  = 0;
                _enemy.body.velocity.x  = 200;
                _enemy.animations.play('right');
                _enemy.animations.stop('left');
                _enemy.animations.stop('up');
                _enemy.animations.stop('down');
            }
        }

        else if (_enemy.body.blocked.left || _enemy.body.blocked.right)
        {
            if (Math.random() >= 0.5)
            {
                _enemy.body.velocity.x  = 0;
                _enemy.body.velocity.y  = 200;
                _enemy.animations.play('down');
                _enemy.animations.stop('up');
                _enemy.animations.stop('left');
                _enemy.animations.stop('right');
            } 
            else 
            {
                _enemy.body.velocity.x  = 0;
                _enemy.body.velocity.y  = -200;
                _enemy.animations.play('up');
                _enemy.animations.stop('down');
                _enemy.animations.stop('lerft');
                _enemy.animations.stop('right');
            }
        }
    }

    return _enemy;
}
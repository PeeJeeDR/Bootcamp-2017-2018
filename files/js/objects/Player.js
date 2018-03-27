var Player  = function (x, y)
{
    var _player     =  game.add.sprite(x, y, 'car');
    game.physics.arcade.enable(_player);
    _player.anchor.setTo(0.5);
    _player.scale.setTo(0.99);
    _player.frame   = 4;

    /*
    gyro.frequency = 10;

    gyro.startTracking(function(o) {
        _player.body.velocity.x += o.gamma/20;
        _player.body.velocity.y += o.beta/20;
    });
    */

    _player.update  = function ()
    {
        cursorControls(_player, false);
        touchControls(_player);
        game.physics.arcade.collide(_player, borderLayer);
        game.physics.arcade.overlap(_player, coins, collectCoin, null, this);
    }

    return _player;
}
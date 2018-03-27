var Player  = function (x, y)
{
    var _player     =  game.add.sprite(x, y, 'car');
    game.physics.arcade.enable(_player);
    _player.anchor.setTo(0.5);
    _player.scale.setTo(0.7);
    _player.frame   = 4;

    _player.update  = function ()
    {
        
        cursorControls(_player, true);
        touchControls(_player);
        moveSprites(_player);
        
        game.physics.arcade.collide(_player, borderLayer);
        game.physics.arcade.overlap(_player, coins, collectCoin, null, this);
    }

    return _player;
}
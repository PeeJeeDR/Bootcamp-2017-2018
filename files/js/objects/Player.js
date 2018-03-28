var Player  = function (x, y)
{
    var _player     =  game.add.sprite(x, y, 'car');
    game.physics.arcade.enable(_player);
    _player.anchor.setTo(0.5);
    _player.scale.setTo(0.99);
    _player.frame   = 4;

    hearts   = game.add.group();
    hearts.enableBody    = true;

    hearts.scale.setTo(0.15);

    for (var i = 0; i < 3; i++)
    {
        heart = hearts.create(i * 100, 125, 'heart');
    }


    // Enable da terug als de shit morgen nie meer werkt :p
    // window.addEventListener("deviceorientation", handleOrientation, true);
    fixFallthrough();
    
    _player.update  = function ()
    {
        game.physics.arcade.overlap(player, enemies, killHeart, null, this);

        cursorControls(_player, false);
        game.physics.arcade.collide(_player, borderLayer);
        game.physics.arcade.overlap(_player, coins, collectCoin, null, this);
    }

    return _player;
}
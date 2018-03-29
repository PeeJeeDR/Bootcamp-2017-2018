var Player  = function (x, y)
{
    var _player     =  game.add.sprite(x, y, 'car');

    game.physics.arcade.enable(_player);
    _player.anchor.setTo(0.5);
    _player.scale.setTo(0.80);
    _player.frame   = 4;

    _player.animations.add('immortal-up-fast', [1, 7], 10, true);
    _player.animations.add('immortal-down-fast', [4, 10], 10, true);
    _player.animations.add('immortal-left-fast', [3, 9], 10, true);
    _player.animations.add('immortal-right-fast', [5, 11], 10, true);

    stars = _player.addChild(game.make.sprite(0, 0, 'stars'));
    stars.frame = 0;
    stars.anchor.setTo(0.5,1);
    stars.animations.add('onHit', [0, 1, 2, 3, 0], 12, false);
    
    _player.update  = function ()
    {
        if(enemyHitCounter > playerSettings.timeToGetHit || !enableToHit)
        {
            if(game.physics.arcade.overlap(player, enemies, killHeart, null, this))
            {
                enableToHit = true;
                enemyHitCounter = 0;
            }
        }

        if (_player.body.velocity.x < 0) {playerFaceDirection = "LEFT";}
        if (_player.body.velocity.x > 0) {playerFaceDirection = "RIGHT";}
        if (_player.body.velocity.y < 0) {playerFaceDirection = "UP";}
        if (_player.body.velocity.y > 0) {playerFaceDirection = "DOWN";}

        if (!immortalState)
        {
            _player.animations.stop();
            if (playerFaceDirection === "LEFT")     {player.frame = 3;}
            if (playerFaceDirection === "RIGHT")    {player.frame = 5;}
            if (playerFaceDirection === "UP")       {player.frame = 1;}
            if (playerFaceDirection === "DOWN")     {player.frame = 4;}
        }
        else 
        {
            if (playerFaceDirection === "LEFT")     {_player.animations.play('immortal-left-fast');}            
            if (playerFaceDirection === "RIGHT")    {_player.animations.play('immortal-right-fast');}            
            if (playerFaceDirection === "UP")       {_player.animations.play('immortal-up-fast');}            
            if (playerFaceDirection === "DOWN")     {_player.animations.play('immortal-down-fast');}            
        }
        
        checkCoins();
        game.physics.arcade.collide(_player, borderLayer);
        game.physics.arcade.overlap(_player, coins, collectCoin, null, this);
        game.physics.arcade.overlap(_player, mysteryBoxes, collectMysteryBox, null, this);

        if(enableToHit){
            enemyHitCounter++;
        }
    }

    return _player;
}
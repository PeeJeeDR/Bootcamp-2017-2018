var Player  = function (x, y)
{
    var _player     =  game.add.sprite(x, y, 'car');
    game.physics.arcade.enable(_player);
    _player.anchor.setTo(0.5);
    _player.scale.setTo(0.99);
    _player.frame   = 4;

    


    // Enable da terug als de shit morgen nie meer werkt :p
    // window.addEventListener("deviceorientation", handleOrientation, true);
    fixFallthrough();
    
    _player.update  = function ()
    {
        console.log(enemyHitCounter);
        console.log('ena' + enableToHit);
        console.log('health=' + health);
        if(enemyHitCounter > 200 || !enableToHit){
            
            if(game.physics.arcade.collide(player, enemies, killHeart, null, this)){

                enableToHit = true;
                enemyHitCounter = 0;
            }
        }
        cursorControls(_player, false);
        game.physics.arcade.collide(_player, borderLayer);
        game.physics.arcade.overlap(_player, coins, collectCoin, null, this);
        game.physics.arcade.collide(_player, mysteryBox, collectMysteryBox, null , this);
//game.physics.arcade.overlap(_player, mysteryBox, collectMysteryBox, null, this);

  
        

        if(enableToHit){
            enemyHitCounter++;
        }
        
    }

    return _player;
}
var Banaan  = function (x,y)
{
    //var rndTrap     = Math.floor(Math.random()*trapArr.length);
    var _banaan     =  game.add.image(x , y, 'banana');
    _banaan.anchor.setTo(0.5);
    game.physics.arcade.enable(_banaan);
    
    
    

  
    // window.addEventListener("deviceorientation", handleOrientation, true);
    fixFallthrough();


   _banaan.update  = function ()
    {
        group.destroy();
        //group.pendingOnDestroy = true;
    
        game.physics.arcade.collide(_banaan, borderLayer);
        if(game.physics.arcade.collide(_banaan, enemy)){
            banaan.destroy();
        }
        
    }
  
return _banaan;
}
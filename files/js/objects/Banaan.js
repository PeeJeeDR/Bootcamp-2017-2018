var Banaan  = function (x,y)
{
    //var rndTrap     = Math.floor(Math.random()*trapArr.length);
    var _banaan     =  game.add.image(x , y, 'banana');
    game.physics.arcade.enable(_banaan);
    
    
    

  
    // window.addEventListener("deviceorientation", handleOrientation, true);
    fixFallthrough();


   _banaan.update  = function ()
    {
    
        game.physics.arcade.collide(_banaan, borderLayer);
    }
  
return _banaan;
}
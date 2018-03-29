var Rocket  = function (x, y)
{
    var _rocket     =  game.add.image(player.x, player.y, 'rocket');
    game.physics.arcade.enable(_rocket);
    _rocket.anchor.setTo(0.5);
    _rocket.scale.setTo(0.99);
    
    

  
    // window.addEventListener("deviceorientation", handleOrientation, true);
   // fixFallthrough();


    _rocket.update  = function ()
    {
       // cursorControls(_rocket, false);

        if( game.physics.arcade.collide(_rocket, enemy))
        {
            rocketHit = true;
            enemy.destroy();
            player.enable = true;
             explosion(enemy);
             
             

        }

        
       
        game.physics.arcade.collide(_rocket, borderLayer);
    }
  
return _rocket;
}
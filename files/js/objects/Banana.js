var Banana  = function (x,y)
{
    
    var _banana     =  bananas.create(x , y, 'banana');
    var counter     = 0;
    _banana.anchor.setTo(0.5);
    game.physics.arcade.enable(_banana);

    _banana.update  = function ()
    {
        if (counter === 0)
        {
            if (game.physics.arcade.overlap(bananas, enemies, enemyOnBanana, null, this))
            {
                console.log('hoeveel?');
                counter++;
            }
        }
        
        if(bananaOnScreen)
        {
            graphicsGroup.kill();
          

        }
    }

    
  
    return _banana;
}

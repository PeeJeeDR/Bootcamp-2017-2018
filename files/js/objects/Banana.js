var Banana  = function (x,y)
{
    
    var _banana     =  bananas.create(x , y, 'banana');
    var counter     = 0;
    _banana.anchor.setTo(0.5);
    game.physics.arcade.enable(_banana);

    _banana.update  = function ()
    {
        game.physics.arcade.collide(bananas, enemies, enemyOnBanana, null, this)
    }

    
  
    return _banana;
}

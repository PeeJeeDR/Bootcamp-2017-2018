var Banaan  = function (x,y)
{
    
    var _banaan     =  bananas.create(x , y, 'banana');
    _banaan.anchor.setTo(0.5);
    game.physics.arcade.enable(_banaan);

   _banaan.update  = function ()
    {
        game.physics.arcade.overlap(bananas, enemies, enemyOnBanana, null, this)
    }
  
return _banaan;
}
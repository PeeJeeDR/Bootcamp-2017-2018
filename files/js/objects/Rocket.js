var Rocket  = function (x, y) 
{
    var _rocket     = game.add.sprite(x, y, 'rocket');
    game.physics.arcade.enable(_rocket);
    _rocket.frame   = 0;
    _rocket.anchor.setTo(0.5);
    _rocket.scale.setTo(2);

    _rocket.animations.add('left', [6, 7, 8], 10, true);
    _rocket.animations.add('right', [9, 10, 11], 10, true);
    _rocket.animations.add('up', [3, 4, 5], 10, true);
    _rocket.animations.add('down', [0, 1, 2], 10, true);

    explosion = _rocket.addChild(game.make.sprite(0, 0, 'explosion'));
    explosion.frame = 0;
    explosion.anchor.setTo(0.5);
    explosion.scale.setTo(2);
    explosion.animations.add('explode', [0, 1, 2, 3, 0], 7, false);

    _rocket.update  = function ()
    {
        if (_rocket.body.velocity.x > 0) {_rocket.animations.play('right');}
        if (_rocket.body.velocity.x < 0) {_rocket.animations.play('left');}
        if (_rocket.body.velocity.y > 0) {_rocket.animations.play('down');}
        if (_rocket.body.velocity.y < 0) {_rocket.animations.play('up');}
    }

    _rocket.getPos  = function ()
    {
        
    }

    return _rocket;
}
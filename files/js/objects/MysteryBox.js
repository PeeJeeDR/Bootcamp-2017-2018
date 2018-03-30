var MysteryBox  = function () {

    //clouds = _mysteryBox.addChild(game.make.sprite(0, 0, 'clouds'));
    //clouds = game.add.sprite(0, 0, 'clouds');
   
    var _mysteryBox     = game.add.image(randomX, randomY, 'mysterybox');
    game.physics.arcade.enable(_mysteryBox);

    return _mysteryBox;
}
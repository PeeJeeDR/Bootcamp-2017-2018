var MysteryBox  = function () {
    var maxNbr          = boxXPositions.length;
    var randomNbr       = Math.floor(Math.random() * (maxNbr - 0) + 0);

    var randomX         = boxXPositions[randomNbr];
    var randomY         = boxYPositions[randomNbr];

    var _mysteryBox     = game.add.image(randomX, randomY, 'mysterybox');

    return _mysteryBox;
}
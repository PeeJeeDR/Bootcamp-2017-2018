var WinState   = {
    create: function ()
    {
    	var numberImage = 'number' + levelNumber + '';
    	completed = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'completed');
	    completed.anchor.setTo(0.5);

	    number = game.add.sprite(completed.x + 75, completed.y + 25, numberImage);
    	number.anchor.setTo(0.5);

    	nextlvlBtn   = game.add.button(game.world.centerX, game.world.centerY + 100, 'nextlvl', this.nextLevel, this);
        nextlvlBtn.anchor.setTo(0.5);
    },

    nextLevel: function ()
    {
    	newLevelNumber 	= currentLevel + 1;
    	// nextLevelName 	= "level_" + newLevelNumber;
    	if(newLevelNumber == 9)
    	{
    		game.state.start('menu');
    	}
    	game.state.start('reset');
    },
}
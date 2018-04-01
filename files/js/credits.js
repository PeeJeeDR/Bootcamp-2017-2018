var CreditState   = {
    create: function ()
    {
    	names = game.add.sprite(game.world.centerX, game.world.centerY + 100, 'names');
    	names.frame = 19;
	    names.animations.add('animation', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,18,19,18,19], 5, false);
	    names.anchor.setTo(0.5);
	    names.animations.play('animation');

	    made_by = game.add.sprite(game.world.centerX, game.world.centerY - 125, 'made_by');
	    made_by.animations.add('shine', [0,0,0,0,0,1,2,3,4,5,6,7], 15, true);
	    made_by.frame = 0;
	    made_by.anchor.setTo(0.5);
	    made_by.animations.play('shine');

		back_button = game.add.button(20, 20, 'back_btn', this.back, this, 2, 1, 0);
		
		back_button.inputEnabled = true;
		back_button.events.onInputDown.add(this.backToMenu, this);
    },

    update: function ()
    {
		
	},
	
	backToMenu: function ()
	{
		game.state.start('menu');
	}
}
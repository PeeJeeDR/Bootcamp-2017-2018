var MenuState   = {
    create: function ()
    {
        menuBackground = game.add.sprite(0,0,"menu");

    	this.createText();

    	game.physics.setBoundsToWorld();

    	pacman  = game.add.sprite(0, 515, 'enemy');
	    game.physics.arcade.enable(pacman);
	    pacman.animations.add('pacman_idle', [0, 1, 2, 3], 12, true);
	    pacman.body.velocity.x  = 200;
	    pacman.anchor.setTo(0.5);
	    pacman.checkWorldBounds = true;

	    pacman.events.onOutOfBounds.add(this.pacmanOut, this);

	    pacman.update =  function ()
	    {
	        pacman.animations.play("pacman_idle");
	    }

    	mariokart = game.add.sprite(50, 515, 'car');
    	game.physics.arcade.enable(mariokart);
	    mariokart.animations.add('mario', [5], 12, true);
	    mariokart.body.velocity.x  = 200;
	    mariokart.anchor.setTo(0.5);
	    mariokart.checkWorldBounds = true;

	    mariokart.update =  function ()
	    {
	        mariokart.animations.play("mario");
	    }

	    mariokart.events.onOutOfBounds.add(this.marioOut, this);

	    playText.inputEnabled 			= true;
	    instructionText.inputEnabled 	= true;
	    creditsText.inputEnabled 	 	= true;
    },

    update: function () 
    {
        playText.events.onInputDown.add(this.play, this);
        instructionText.events.onInputDown.add(this.instructions, this);
        creditsText.events.onInputDown.add(this.credits, this);
    },

    pacmanOut: function () {
    	pacman.reset(0, 515);
    	pacman.body.velocity.x  = 200;
    },

    marioOut: function () {
    	mariokart.reset(0, 515);
    	mariokart.body.velocity.x  = 200;
    },

    createText: function () {

		playText = game.add.text(game.world.centerX,game.world.centerY -40, "Play",{font:"32px Arial", fill:"#fff", align:"center"});
		playText.anchor.setTo(0.5,0.5);

		instructionText = game.add.text(game.world.centerX,game.world.centerY + 20, "Instructions",{font:"32px Arial", fill:"#fff", align:"center"});
		instructionText.anchor.setTo(0.5,0.5);

		creditsText = game.add.text(game.world.centerX,game.world.centerY + 80, "Credits",{font:"32px Arial", fill:"#fff", align:"center"});
		creditsText.anchor.setTo(0.5,0.5);
	},

	play: function () {
    	game.state.start( 'reset' );
    },

    instructions: function () {
    	game.state.start( 'instructions' );
    },

    credits: function () {
    	game.state.start( 'credits' );
    }
}
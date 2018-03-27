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

	    playtext.inputEnabled = true;
    },

    update: function () 
    {

        playtext.events.onInputDown.add(this.play, this);
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

		playtext = game.add.text(game.world.centerX,game.world.centerY, "Play",{font:"32px Arial", fill:"#fff", align:"center"});
		playtext.anchor.setTo(0.5,0.5);
	},

	play: function () {
    	game.state.start( 'level_1' );
    }
}
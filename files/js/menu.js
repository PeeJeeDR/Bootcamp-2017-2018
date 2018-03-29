var MenuState   = {
    create: function ()
    {
        menuBackground = game.add.sprite(0,0,"menu");

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

	    play_button = game.add.button(game.world.centerX, game.world.centerY -40, 'play_btn', this.play, this, 2, 1, 0);
	    play_button.anchor.setTo(0.5);
	    play_button.animations.add('play_flash', [0,1,2,3,4,5,6,7,8,9,10,11,10,9,8,7,6,5,4,3,2,1], 35, true);

	    play_button.animations.play("play_flash");

	    instructions_button = game.add.button(game.world.centerX +150 , game.world.centerY +80, 'instructions_btn', this.instructions, this, 2, 1, 0);
	    instructions_button.anchor.setTo(0.5);

	    credits_button = game.add.button(game.world.centerX -150, game.world.centerY +80, 'credits_btn', this.credits, this, 2, 1, 0);
		credits_button.anchor.setTo(0.5);

		soundBtn = game.add.button(400,440,'musicBtn',this.onClickAction);
		soundBtn.anchor.setTo(0.5);
		soundBtn.scale.setTo(0.7);

		if (playMusic)
		{
			pressStart = game.add.audio('pressStart');
			pressStart.volume = 0.08;
			pressStart.play();
		} 
    },

    update: function () 
    {
        
    },

	onClickAction: function(){
		
		if(playMusic && soundBtn.frame == 0){
			soundBtn.frame = 1;
		 	playMusic = false;
		 	pressStart.stop();
		}
		else{ 
			soundBtn.frame =0;
			playMusic = true;
		}
	},

    pacmanOut: function () {
    	pacman.reset(0, 515);
    	pacman.body.velocity.x  = 200;
    },

    marioOut: function () {
    	mariokart.reset(0, 515);
    	mariokart.body.velocity.x  = 200;
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

function play ()
{
    game.state.start( 'reset' );
}
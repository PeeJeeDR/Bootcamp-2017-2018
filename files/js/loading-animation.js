var LoadingAnimationState   = {
	preload: function ()
	{
		game.load.spritesheet('loading', 'assets/sprites/loading.png', 200, 200);
	},

    create: function ()
    {
    	game.state.start('load');
    },
}
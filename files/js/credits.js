var CreditState   = {
    create: function ()
    {
        back_button = game.add.button(20, 20, 'back_btn', this.back, this, 2, 1, 0);
    },

    back: function ()
    {
    	game.state.start('menu');
    }
}
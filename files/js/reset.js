var ResetState   = {
    create: function ()
    {
        coinsCollected  = 0;
    },

    update: function ()
    {
        this.state.start('level_3');
    }
}
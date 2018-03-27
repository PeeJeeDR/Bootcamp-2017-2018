var ResetState   = {
    create: function ()
    {
        coinsCollected  = 0;
        console.log('test');
    },

    update: function ()
    {
        this.state.start('level_1');
    }
}
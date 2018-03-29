var ResetState   = {
    create: function ()
    {
        coinsCollected  = 0;
        health          = 3;
        enableToHit     = false;
        heartArray      = []
    },

    update: function ()
    {
        this.state.start('level_1');
    }
}
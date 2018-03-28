var BootState   = {
    create: function ()
    {
        if (onMobile) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.forceLandscape = true;
            game.scale.pageAlignHorizontally = true;
            game.scale.updateLayout(true);
        }

        game.physics.startSystem( Phaser.Physics.ARCADE );
        game.state.start('load');
    },

    fitScreen: function ()
    {
        game.scale.setMaximum();
        game.scale.setScreenSize(true);
    }
}
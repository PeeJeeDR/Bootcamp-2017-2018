var BootState   = {
    create: function ()
    {
        if (onMobile) {
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.forceLandscape = true;
            game.scale.pageAlignHorizontally = true;
            game.scale.updateLayout(true);
        }

        game.physics.startSystem( Phaser.Physics.ARCADE );
        game.stage.backgroundColor = "#000";
        game.state.start('loading-animation');
    },

    fitScreen: function ()
    {
        game.scale.setMaximum();
        game.scale.setScreenSize(true);
    }
}
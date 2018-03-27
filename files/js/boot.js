var BootState   = {
    create: function ()
    {
        if (onMobile) {
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.parentIsWindow = true;
            game.scale.refresh();
        }

        game.physics.startSystem( Phaser.Physics.ARCADE );
        game.state.start( 'load' );
    }
}
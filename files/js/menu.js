var MenuState   = {
    create: function ()
    {
        lvlText    = game.add.text( 
            game.world.centerX, 
            game.world.centerY, 
            "Press to continue", 
            { 
                font: "32px Arial", 
                fill: "#fff" 
            } 
        );
    
        lvlText.anchor.setTo( 0.5 );
    },

    update: function () 
    {
        if (game.input.activePointer.isDown)
        {
            game.state.start('reset');
        }
    }
}
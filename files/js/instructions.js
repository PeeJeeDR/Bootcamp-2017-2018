var InstructionState   = {
    create: function ()
    {
        back_button = game.add.button(20, 20, 'back_btn', this.back, this, 2, 1, 0);

        instructions_image = game.add.sprite(game.world.centerX, game.world.centerY +75, 'instructions_image');
        instructions_image.animations.add('tilt', [0,1,0,2,0,3,0,4], 2, true);
        instructions_image.anchor.setTo(0.5);
        instructions_image.animations.play("tilt");

        instructionText1 = game.add.text(250,20, "Move Mario by tilting your phone.",{font:"32px Arial", fill:"#fff", align:"center"});
        instructionText2 = game.add.text(250,60, "Collect coins to level up...",{font:"32px Arial", fill:"#fff", align:"center"});
        instructionText3 = game.add.text(250,110, "...or get eaten by pacman!",{font:"32px Arial", fill:"#fff", align:"center"});
    },

    back: function ()
    {
        game.state.start('menu');
    }
}
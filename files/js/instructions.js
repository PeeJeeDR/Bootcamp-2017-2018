var InstructionState   = {
    create: function ()
    {
        instructionText = game.add.text(game.world.centerX,game.world.centerY, "Instructions",{font:"32px Arial", fill:"#fff", align:"center"});
        instructionText.anchor.setTo(0.5,0.5);
    }
}
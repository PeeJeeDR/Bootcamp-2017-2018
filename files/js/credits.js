var CreditState   = {
    create: function ()
    {
        creditText = game.add.text(game.world.centerX,game.world.centerY, "Credits",{font:"32px Arial", fill:"#fff", align:"center"});
        creditText.anchor.setTo(0.5,0.5);
    }
}
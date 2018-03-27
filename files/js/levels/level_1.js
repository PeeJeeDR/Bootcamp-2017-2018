var Level_1   = {
    create: function ()
    {
        this.addMap();

        player = this.add.sprite(120,48, 'player');
        player.anchor.set(0.5,0.5);
       

        this.physics.arcade.enable(player);
        

      

    }, 

    update: function ()
    {
        this.controls();

        game.physics.arcade.collide(player, borderLayer, this.collide, null, this);
        game.physics.arcade.overlap(player, groundLayer, this.onGround, null, this);
        
    },

    render: function ()
    {

    },

    collide: function ()
    {
       
    },

    onGround: function ()
    {

    },

    addMap: function ()
    {
        map     = game.add.tilemap('level_1');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        map.setCollisionBetween(0, 10000, true, borderLayer);
    },


    controls: function ()
    {
        if (cursors.down.isDown)
        {
            
            player.body.velocity.y   = 200;
           
        }
        else if (cursors.up.isDown)
        {
            
            player.body.velocity.y   = -200;
            
        }

        else if (cursors.left.isDown)
        {
            
            player.body.velocity.x   = -200;
            player.scale.y = 1; 
        } 
        else if (cursors.right.isDown)
        {
           
            player.body.velocity.x   = 200;
            player.scale.y = -1; 
        }
    }
}
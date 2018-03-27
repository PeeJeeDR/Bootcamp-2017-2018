var Level_1   = {
    create: function ()
    {
        this.addMap();

        player = this.game.add.sprite(150,30, 'player');
        player.frame = 5;
        

        this.physics.arcade.enable(player);
        
    }, 

    update: function ()
    {
        this.controls();
        this.movePlayer();
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

    movePlayer: function ()
    {

     },

    controls: function ()
    {
        if (cursors.down.isDown  && !player.body.blocked.down)
        {
           
            player.body.velocity.y   = 200;
            player.frame = 4;
            
           
        }
        else if (cursors.up.isDown && !player.body.blocked.up)
        {
            
            
            player.body.velocity.y   = -200;
            player.frame = 1;
        }

        else if (cursors.left.isDown  && !player.body.blocked.right)
        {
            
            player.body.velocity.x   = -200;
            player.frame = 3;
            
        } 
        else if (cursors.right.isDown  && !player.body.blocked.left)
        {
           
            player.frame = 5;
            player.body.velocity.x   = 200;
            
        }
    }
}
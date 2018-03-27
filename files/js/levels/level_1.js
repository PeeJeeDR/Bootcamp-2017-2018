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
        this.moveSprites();
        game.physics.arcade.collide(player, borderLayer, this.collide, null, this);
        game.physics.arcade.overlap(player, groundLayer, this.onGround, null, this);

        //player.body.velocity.x = 0;
        console.log('x= ' + player.body.velocity.x);
        console.log('y= ' +player.body.velocity.y);

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

    moveSprites: function ()
    {
        
        
        if(player.body.velocity.x < 0 )
        {
            player.frame = 3;
        }
        else if(player.body.velocity.x > 0){
            player.frame = 5;
        }
        
        if(player.body.velocity.y < 0){
            player.frame = 1;
        }
        else if(player.body.velocity.y > 0){
            player.frame = 4;
        }
        
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
            
            
        } 
        else if (cursors.right.isDown)
        {
           
            player.body.velocity.x   = 200;
            
        }
    }
}
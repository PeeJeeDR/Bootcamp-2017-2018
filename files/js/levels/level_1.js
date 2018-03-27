var Level_1   = {
    create: function ()
    {
        map     = game.add.tilemap('level_1');
        map.addTilesetImage('pacman_tileset', 'tiles');
        groundLayer     = map.createLayer('ground');
        borderLayer     = map.createLayer('borders');
        detectionLayer  = map.createLayer('detection');
        coinsLayer      = map.createLayer('coins');
        mysteryboxLayer = map.coinsLayer('mysterybox');
        map.setCollisionBetween(0, 10000, true, groundLayer);

       //----------------------------------------

       /* 
*/           

       /* 

        this.physics.add.overlap(player, mysteryBoxes, collectMysteryBox, null, this);*/
    }, 

    update: function ()
    {

    },

   /* collectMysteryBox: function(){
        
        mysteryBoxes.disableBody(true, true);

        mysteryArr=[ "immortal", "bananaDrop", "projectile" ];
        rndMysteryBox = Phaser.ArrayUtils.getRandomItem(mysteryArr);

       // console.log(rndMysteryBox)

       if(rndMysteryBox == "immortal"){ immortal();}
       else if(rndMysteryBox == "bananaDrop"){ bananaDrop();}
       else{ projectile(); }
    },

    immortal: function(){
 //console.log('I"m immortal');
    },

    bananaDrop: function(){
 //  console.log('drop banana');


    },

    projectile: function(){
// console.log('shoot projectile');

    },*/

    

  
}
var game    = new Phaser.Game( 800, 576, Phaser.AUTO, 'gameDiv' );

/* ===== GLOBALS ===== */
var map;

var enemy;
var enemies         = [];
var nbrOfEnemies    = 3;

var coin;
var coins   = 0;

var point;
var points;
var pointArray  = [];

var timer;


var rndTraitNbr;
var mysteryBoxes;
var mysteryBox;
var mysteryBox2;
var boxPointArr = [];
var player;
var event;

var firstBoxSpawned = false;
var boxCollected = false;

var collectMysteryBox;
var mysteryArr     =[];
var rndMysteryBox;

/* ===== SETTINGS ===== */
var enemySettings = {
    moveSpeed: 200,
}


/* ===== FUNCTIONS ===== */
function moveEnemy (enemy)
{
    if (enemy.body.blocked.up || enemy.body.blocked.down)
    {
        if (Math.random() >= 0.5)
        {
            enemy.body.velocity.x  = -200;
        } 
        else 
        {
            enemy.body.velocity.x  = 200;
        }
    }

    else if (enemy.body.blocked.left || enemy.body.blocked.right)
    {
        if (Math.random() >= 0.5)
        {
            enemy.body.velocity.y  = 200;
        } 
        else 
        {
            enemy.body.velocity.y  = -200;
        }
    }
}

function enemyOnPoint (enemy, point)
{
    margeXTop       = point.x + 1;
    margeXBottom    = point.x - 1;

    margeYTop       = point.y + 1;
    margeYBottom    = point.y - 1;

    if ((Math.ceil(enemy.body.x) >= margeXBottom && Math.ceil(enemy.body.x) <= margeXTop) && (Math.ceil(enemy.body.y) >= margeYBottom && Math.ceil(enemy.body.y) <= margeYTop))
    {
        switch (Math.floor(Math.random() * (5 - 1) + 1))
        {
            case 1:
                enemy.body.velocity.x   = 200;
            break;

            case 2:
                enemy.body.velocity.x   = -200;
            break;

            case 3:
                enemy.body.velocity.y   = 200;
            break;

            case 4:
                enemy.body.velocity.y   = -200;
            break;
        }
    }
}

function cursorControls (enemy)
{
    if (cursors.down.isDown)
    {
        enemy.body.velocity.y   = 200;
    }
    else if (cursors.up.isDown)
    {
        enemy.body.velocity.y   = -200;
    }

    if (cursors.left.isDown)
    {
        enemy.body.velocity.x   = -200;
    } 
    else if (cursors.right.isDown)
    {
        enemy.body.velocity.x   = 200;
    }
}

function collectCoin (enemy, coin)
{     
    coins += 1;
    map.removeTile(coin.x,coin.y,coinsLayer);

}

function createBox(){
    boxCollected = false;
    map.objects.mystery_boxes.forEach(function (singleBox) {
    boxPointArr.push(singleBox);
    
    }, this);
    
    console.log(boxPointArr);
   

     rndTraitNbr = Math.floor(Math.random()*12);

    /*console.log(rndTraitNbr);
    console.log(boxPointArr[rndTraitNbr]);
    console.log(boxPointArr[rndTraitNbr].x);
    console.log(boxPointArr[rndTraitNbr].y);*/

   mysteryBox = game.add.image(boxPointArr[rndTraitNbr].x , boxPointArr[rndTraitNbr].y , 'mysteryboxImg');

   setTimeout(notCollected, 5000);
   
   
   


 }

function notCollected(){



if(!boxCollected){
    mysteryBox.destroy();
    setTimeout(createBox, 5000);



}

}



function collectMysteryBox ( player, mysteryBox){
    boxCollected = true;

    mysteryBox.destroy();


    mysteryArr=[ "immortal", "bananaDrop", "projectile" ];
    rndMysteryBox = Phaser.ArrayUtils.getRandomItem(mysteryArr);

   // console.log(rndMysteryBox)


   if(rndMysteryBox == "immortal"){ immortal();}
   else if(rndMysteryBox == "bananaDrop"){ bananaDrop();}
   else{ projectile(); }

}


function immortal  (){
    //console.log('I"m immortal');
    setTimeout(createBox, 5000);
    

    ;
       }
   
function bananaDrop (){
    //  console.log('drop banana');
   
    
    setTimeout(createBox, 5000);
    
       }
   
function projectile (){
   // console.log('shoot projectile');
  
  
   setTimeout(createBox, 5000);
       }





/* ===== STATES ===== */

// CORE STATES
game.state.add( 'boot', BootState );
game.state.add( 'load', LoadState );
game.state.add( 'menu', MenuState );

// LEVELS
game.state.add( 'level_1', Level_1 );

// INTROS

// START
game.state.start( 'boot' );
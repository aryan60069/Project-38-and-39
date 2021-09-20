class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      racer1 = createSprite(100,150,10,10);
      racer1.addAnimation("cycle1", cycleRacer1Moving);
      racer1.scale = 0.1;
  
      racer2 = createSprite(100,400,10,10);
      racer2.addAnimation("cycle2", cycleRacer2Moving);
      racer2.scale = 0.1
  
      cycles = [racer1, racer2];
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        
        image(road,0 , 0, displayWidth+100, displayHeight-100);
        
        //index of the array
        var index = 0;
  
        //x and y position of the cycles
        var x;
        var y = 100;
  
        for(var plr in allPlayers){

          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cycless a little away from each other in y direction
          y = y + 250;

          //use data form the database to display the cycles in x direction
          x = displayWidth - allPlayers[plr].distance;
          //cycles[index-1].x = x;
          //cycles[index-1].y = y;
  
          if (index === player.index){
            camera.position.y = displayHeight/2;
            camera.position.x = cycles[index-1].x;
          }

          allPlayers[plr].velocityX = 5;

        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        allPlayers[plr].position.y = allPlayers[plr].position.y -5; 
        //camera.position.y = allPlayers[plr].position.y
      }

      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        allPlayera[plr].position.y = allPlayers[plr].position.y +5; 
      }

      //console.log(player);
  
      if(player.distance>2000){
        gameState = 2
      }
  
      drawSprites();
    }
  
    end(){
        console.log("Game Ended");
    }
}
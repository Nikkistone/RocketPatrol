class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload(){
        //load images/tile sprites
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.image('rocket','./assets/rocket.png');
        this.load.spritesheet('redspaceship','./assets/spaceship_red.png',{frameWidth: 63, frameHeight: 32, startFrame: 0, endFrame:2});
        this.load.spritesheet('blackspaceship','./assets/spaceship_black.png',{frameWidth:63, frameHeight: 32, startFrame: 0, endFrame: 2});
        this.load.spritesheet('purplespaceship','./assets/spaceship_purple.png',{frameWidth:63, frameHeight: 32, startFrame: 0, endFrame: 2});
        this.load.image('starfield','./assets/starfield.png');
        this.load.spritesheet('explosion','./assets/explosion.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame:9});
    }
    
    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
     //white rectangle borders
     this.add.rectangle(5,5,630,32,0xFFFFFF).setOrigin(0,0);
     this.add.rectangle(5,443,630,32,0xFFFFFF).setOrigin(0,0);
     this.add.rectangle(5,5,32,455,0xFFFFFF).setOrigin(0,0);
     this.add.rectangle(603,5,32,455,0xFFFFFF).setOrigin(0,0);
    
     // green UI background
     this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0)

     //add rocket {p1}
     // constructor (scene,x,y,texture,frame)
     this.p1Rocket = new Rocket(this, game.config.width/2, 435,'rocket').setScale(0.5,0.5).setOrigin(0,0);
    
     // add spaceship (x3)
     this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'redspaceship',0, 30).setOrigin(0,0);
     this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'blackspaceship',0, 20).setOrigin(0,0);
     this.ship03 = new Spaceship(this, game.config.width, 250, 'purplespaceship',0, 30).setOrigin(0,0);

     //define keyboard keys
     keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
     keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
     keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

     //animation configuration
     this.anims.create({
        key:'explode',
        frames: this.anims.generateFrameNumbers('explosion',{ start: 0, end: 9, first: 0}),
        frameRate:30
      });
     
      //redship animation
      this.anims.create({
        key:'redfly',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('redspaceship',{start: 0, end: 1, first: 0}),
        frameRate: 10
    })

    this.ship01.anims.play('redfly');

      //blackship animation
      this.anims.create({
          key:'blackfly',
          repeat: -1,
          frames: this.anims.generateFrameNumbers('blackspaceship',{start: 0, end: 1, first: 0}),
          frameRate: 10
      })

      this.ship02.anims.play('blackfly');

      //purpleship animation
      this.anims.create({
        key:'purplefly',
        repeat: -1,
        frames: this.anims.generateFrameNumbers('purplespaceship',{start: 0, end: 1, first: 0}),
        frameRate: 10
    })

    this.ship03.anims.play('purplefly');



      //score
      this.p1Score=0;

      //score's display
      let scoreConfig = {
          fontFamily: 'Arial',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          alight: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 100
      }
      this.scoreLeft = this.add.text(69,54,this.p1Score,scoreConfig);

      //game over flag
      this.gameOver = false;


      this.clock=this.time.delayedCall(game.settings.gameTimer-30000, ()=> {
       game.settings.spaceshipSpeed+=2;
       this.sound.play('sfx_select');
      },null,this);   

      //timer
      scoreConfig.fixedWidth = 0;
      this.clock=this.time.delayedCall(game.settings.gameTimer, ()=> {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press F to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
          this.gameOver = true;
        },null,this);   
    }

    
    
        update(){
            //restart game check
            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
                this.scene.restart(this.p1Score);
            }
            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.start("menuScene");
            }

            if(!this.gameOver){
            // scroll starfield
            this.starfield.tilePositionX -=4;

            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
             // Check for collision
            if(this.checkCollision(this.p1Rocket, this.ship01)){
                this.p1Rocket.reset();
                this.shipExplode(this.ship01);
            }
           
            if(this.checkCollision(this.p1Rocket, this.ship02)){
                this.p1Rocket.reset();
                this.shipExplode(this.ship02);
            }
          
            if(this.checkCollision(this.p1Rocket, this.ship03)){
               this.p1Rocket.reset();
               this.shipExplode(this.ship03);
            }
         }

         checkCollision(rocket, ship){
            //Collision detection
             if(rocket.x < ship.x + ship.width && 
                rocket.x + rocket.width > ship.x &&
               rocket.y < ship.y + ship.height && 
               rocket.height + rocket.y > ship.y){
                   return true;
             }else{
                   return false;
               }
       }

       
       
         shipExplode(ship){
             ship.alpha = 0; //temporarily hide ship
             //explode on ships position
             let  pleaseWork = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
             pleaseWork.anims.play('explode'); //Plays the animation
             pleaseWork.on('animationcomplete',() => {   // after the animaion is completed....
                 ship.reset();              //resets position of ship
                 ship.alpha = 1;            // makes the ship visible
                 pleaseWork.destroy();       // removes the sprite for explosion 
             }); 
             //score incrementing/repaint
             this.p1Score += ship.points;
             this.scoreLeft.text = this.p1Score;

             //explosion sfx
             this.sound.play('sfx_explosion');
         }

         

}
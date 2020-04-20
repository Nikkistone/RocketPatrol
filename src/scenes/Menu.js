class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocketshot', './assets/rocket_shot.wav');
        this.load.image('menuBackground','./assets/menu_background.png');
    }

    create() {
        // menu
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '25px',
            backgroundColor: '#F3B141',
            color: '#843605',
            alight: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.image(270,230,'menuBackground');

        //show text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY-16, "Player 1 Use the A and D buttons to move and press F to fire", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY+16, "Player 2 Use the ← → arrows to move and press Space to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);


        //display menu text
        this.add.text(20, 20, "Rocket Patrol Menu")

        // keyboard keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy difficulty
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard difficulty
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }

    }

}
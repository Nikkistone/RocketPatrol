let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

// reserve keyboard variables
let keyF, keyLEFT, keyRIGHT, keySPACE, keyA, keyD;

// game settings defined
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
}

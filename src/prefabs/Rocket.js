// Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, id) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing scene, displayList, updateList
        this.id = id;
        this.isFiring = false;  // track rocket's firing status
        this.sfxRocket = scene.sound.add('sfx_rocketshot'); //rocket sfx

    }


    update() {
        //PLAYER 1 CONTROLS
        //left/right movement
        if (this.id == 1) {
            if (this.isFiring || !this.isFiring) {
                if (keyA.isDown && this.x >= 47) {
                    this.x -= 3;
                } else if (keyD.isDown && this.x <= 578) {
                    this.x += 3;
                }
            }

            //fire button
            if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play(); //plays rocketshot when firing

            }
        }
        //PLAYER 2 CONTROLS
        if (this.id == 2) {
            if (this.isFiring || !this.isFiring) {
                if (keyLEFT.isDown && this.x >= 47) {
                    this.x -= 3;
                } else if (keyRIGHT.isDown && this.x <= 578) {
                    this.x += 3;
                }
            }


            //fire button
            if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play(); //plays rocketshot when firing
            }
        }

        // if fired, move up
        if (this.isFiring && this.y >= 108) {
            this.y -= 4;
        }
        // reset on miss
        if (this.y <= 108) {
            // this.isFiring = false;
            this.reset();
        }
    }
    //resets rocket to primary position
    reset() {
        this.isFiring = false;
        this.y = 431;
    }

}
import Phaser from 'phaser'

// Import assets
import bear from '-assets/bear'
import chicken from '-assets/chicken'
import duck from '-assets/duck'
import parrot from '-assets/parrot'
import penguin from '-assets/penguin'
import sokoban_tilesheet from '-assets/sokoban_tilesheet.png'

// Constants
import {keyWords} from '../constants/keywords'
const {BEAR, CHICKEN, DUCK, PARROT, PENGUIN, TILESHEET} = keyWords

export default class Preloader extends Phaser.Scene
{
   constructor() {
      super('preloader');
   }

   preload() {
      this.load.spritesheet(TILESHEET, sokoban_tilesheet, {frameWidth: 64})
      this.load.image(BEAR, bear)
      this.load.image(CHICKEN, chicken)
      this.load.image(DUCK, duck)
      this.load.image(PARROT, parrot)
      this.load.image(PENGUIN, penguin)
   }

   create() {
      this.anims.create({
         key: 'down-idle',
         frames: [{key: TILESHEET, frame: 52}]
      })
      this.anims.create({
         key: 'down-walk',
         frames: this.anims.generateFrameNumbers(TILESHEET,
            {start: 52, end: 54}),
         frameRate: 8,
         repeat: -1
      })
      this.anims.create({
         key: 'up-idle',
         frames: [{key: TILESHEET, frame: 55}]
      })
      this.anims.create({
         key: 'up-walk',
         frames: this.anims.generateFrameNumbers(TILESHEET,
            {start: 55, end: 57}),
         frameRate: 8,
         repeat: -1
      })

      this.anims.create({
         key: 'left-idle',
         frames: [{key: TILESHEET, frame: 81}]
      })
      this.anims.create({
         key: 'left-walk',
         frames: this.anims.generateFrameNumbers(TILESHEET,
            {start: 81, end: 83}),
         frameRate: 8,
         repeat: -1
      })
      this.anims.create({
         key: 'right-idle',
         frames: [{key: TILESHEET, frame: 78}]
      })
      this.anims.create({
         key: 'right-walk',
         frames: this.anims.generateFrameNumbers(TILESHEET,
            {start: 78, end: 80}),
         frameRate: 8,
         repeat: -1
      })

      this.scene.start('game')
   }
}

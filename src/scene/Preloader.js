import Phaser from 'phaser'

// Import assets
import bear from '-assets/bear'
import chicken from '-assets/chicken'
import duck from '-assets/duck'
import parrot from '-assets/parrot'
import penguin from '-assets/penguin'
import sokoban_tilesheet from '-assets/sokoban_tilesheet.png'

export default class Preloader extends Phaser.Scene
{
   constructor() {
      super('preloader');
   }

   preload() {
      this.load.spritesheet('sokoban', sokoban_tilesheet,
         {frameWidth: 64})
      this.load.image('bear', bear)
      this.load.image('chicken', chicken)
      this.load.image('duck', duck)
      this.load.image('parrot', parrot)
      this.load.image('penguin', penguin)
   }

   create() {
      this.anims.create({
         key: 'down-idle',
         frames: [{key: 'sokoban', frame: 52}]
      })
      this.anims.create({
         key: 'down-walk',
         frames: this.anims.generateFrameNumbers('sokoban',
            {start: 52, end: 54}),
         frameRate: 8,
         repeat: -1
      })
      this.anims.create({
         key: 'up-idle',
         frames: [{key: 'sokoban', frame: 55}]
      })
      this.anims.create({
         key: 'up-walk',
         frames: this.anims.generateFrameNumbers('sokoban',
            {start: 55, end: 57}),
         frameRate: 8,
         repeat: -1
      })

      this.anims.create({
         key: 'left-idle',
         frames: [{key: 'sokoban', frame: 81}]
      })
      this.anims.create({
         key: 'left-walk',
         frames: this.anims.generateFrameNumbers('sokoban',
            {start: 81, end: 83}),
         frameRate: 8,
         repeat: -1
      })
      this.anims.create({
         key: 'right-idle',
         frames: [{key: 'sokoban', frame: 78}]
      })
      this.anims.create({
         key: 'right-walk',
         frames: this.anims.generateFrameNumbers('sokoban',
            {start: 78, end: 80}),
         frameRate: 8,
         repeat: -1
      })

      this.scene.start('game')
   }
}

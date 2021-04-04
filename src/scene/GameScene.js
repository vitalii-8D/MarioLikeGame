import Phaser from 'phaser'

const level = [
   [1, 0, 3],
   [2, 4, 1],
   [3, 4, 2]
]

export default class GameScene extends Phaser.Scene {

   /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
   cursor

   /** @type {Phaser.Physics.Arcade.Sprite} */
   player

   /** @type {Phaser.Physics.Arcade.StaticGroup} */
   boxGroup

   /** @type {Phaser.GameObjects.Group} */
   itemsGroup

   /** @type {Phaser.Physics.Arcade.Sprite} */
   activeBox

   constructor() {
      super('game');
   }

   init() {
      this.cursor = this.input.keyboard.createCursorKeys()
   }

   create() {
      const {width, height} = this.scale;

      this.player = this.physics.add.sprite(width * 0.5, height * 0.6, 'sokoban', 52)
         .setSize(40, 16)
         .setOffset(12, 38)
         .play('down-idle')

      this.boxGroup = this.physics.add.staticGroup()
      this.createBoxes()

      this.itemsGroup = this.add.group()

      this.physics.add.collider(this.player, this.boxGroup,
         this.handlePlayerBoxCollide, undefined, this)

      // Couldn`t find true way to add 3 rows at once
      // this.boxGroup = this.physics.add.staticGroup({
      //    key: 'sokoban',
      //    frame: 10,
      //    repeat: 2,
      //    setXY: {x: width * 0.25, y: 150, stepX: width * 0.25}
      // })
   }

   createBoxes() {
      const width = this.scale.width
      let xPer = 0.25
      let y = 150
      for (let row = 0; row < level.length; row++) {
         for (let col = 0; col < level[row].length; col++) {
            /** @type {Phaser.Physics.Arcade.Sprite}*/
            const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10)
            box.setSize(64, 32)
               .setOffset(0, 32)
               .setData('itemType', level[row][col])
            xPer += 0.25
         }
         xPer = 0.25
         y += 150
      }
   }

   /**
    * @param {Phaser.Physics.Arcade.Sprite} player
    * @param {Phaser.Physics.Arcade.Sprite} box
    */
   handlePlayerBoxCollide(player, box) {
      if (this.activeBox) {
         return false;
      }

      this.activeBox = box
      this.activeBox.setFrame(9)
   }

   updatePlayer() {
      const speed = 200;

      if (this.cursor.left.isDown) {
         this.player.setVelocity(-speed, 0)
         this.player.play('left-walk', true)
      } else if (this.cursor.right.isDown) {
         this.player.setVelocity(speed, 0)
         this.player.play('right-walk', true)
      } else if (this.cursor.up.isDown) {
         this.player.setVelocity(0, -speed)
         this.player.play('up-walk', true)
      } else if (this.cursor.down.isDown) {
         this.player.setVelocity(0, speed)
         this.player.play('down-walk', true)
      } else {
         this.player.setVelocity(0, 0)

         const key = this.player.anims.currentAnim.key
         const direction = key.split('-')[0]

         this.player.play(`${direction}-idle`)
      }

      const spaceJustPressed = Phaser.Input.Keyboard.JustUp(this.cursor.space)
      if (spaceJustPressed && this.activeBox) {
         this.openBox(this.activeBox)
      }
   }

   updateActiveBox() {
      if (!this.activeBox) {
         return false;
      }

      const distance = Phaser.Math.Distance.Between(
         this.player.x, this.player.y,
         this.activeBox.x, this.activeBox.y
      )

      if (distance < 64) {
         return false;
      }

      this.activeBox.setFrame(10)
      this.activeBox = undefined;
   }

   /** @param {Phaser.Physics.Arcade.Sprite} box */
   openBox(box) {
      if (!box) return false;

      const itemType = box.getData('itemType')
      console.log(itemType);

      /** @type {Phaser.GameObjects.Sprite} */
      let item;

      switch (itemType) {
         case 0:
            item = this.itemsGroup.get(box.x, box.y)
            item.setTexture('bear')
            break;
         case 1:
            item = this.itemsGroup.get(box.x, box.y)
            item.setTexture('chicken')
            break;
         case 2:
            item = this.itemsGroup.get(box.x, box.y)
            item.setTexture('duck')
            break;
         case 3:
            item = this.itemsGroup.get(box.x, box.y)
            item.setTexture('parrot')
            break;
         case 4:
            item = this.itemsGroup.get(box.x, box.y)
            item.setTexture('penguin')
            break;
      }

      if (!item) return false;

      item.scale = 0
      item.alpha = 0

      this.tweens.add({
         targets: item,
         y: '-=50',
         alpha: 1,
         scale: 0.5,
         duration: 500
      })

      this.activeBox = undefined
   }

   update() {
      this.updatePlayer()

      this.updateActiveBox()

      this.children.each(c => {
         /** @type {Phaser.Physics.Arcade.Sprite} */
         const child = c;
         child.setDepth(child.y)
      })
   }
}
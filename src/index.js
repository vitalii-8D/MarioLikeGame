import Phaser from 'phaser';
import GameScene from "./scene/GameScene";
import Preloader from "./scene/Preloader";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 700,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 0}
        }
    },
    scene: [Preloader, GameScene]
};


export default new Phaser.Game(config);

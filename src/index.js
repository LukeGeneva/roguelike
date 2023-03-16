const Phaser = require('phaser');
const { MainScene } = require('./MainScene');

const TILE_SIZE = 32;

const config = {
  type: Phaser.AUTO,
  width: TILE_SIZE * 30,
  height: TILE_SIZE * 20,
  parent: 'game',
  scene: [MainScene],
  render: {
    // pixelArt: true,
  },
};

const game = new Phaser.Game(config);

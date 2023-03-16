const Phaser = require('phaser');
const { MainScene } = require('./MainScene');

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  scene: [MainScene],
  render: {
    pixelArt: true,
  },
};

const game = new Phaser.Game(config);

const Phaser = require('phaser');

class Player extends Phaser.GameObjects.Text {
  constructor(scene, x, y) {
    super(scene, x * 32, y * 32, '@', { fontSize: '32px', color: '#FFF' });
    this.scene.add.existing(this);
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
}

module.exports = { Player };

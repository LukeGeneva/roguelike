const Phaser = require('phaser');
const { MapGenerator } = require('./MapGenerator');
const { Player } = require('./Player');

const TILE_SIZE = 32;

class MainScene extends Phaser.Scene {
  constructor() {
    super('main');
  }

  create() {
    const mapGenerator = new MapGenerator(30, 20, 30, 2, 10);
    this.map = mapGenerator.map;
    const mapData = mapGenerator.map;

    // Find an empty cell for the player
    const playerStartPosition = this.findEmptyCell(mapData);
    if (playerStartPosition) {
      this.player = new Player(
        this,
        playerStartPosition.x,
        playerStartPosition.y
      );
    } else {
      console.error('No empty cell found for the player');
    }

    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        if (this.map[x][y] === 1) {
          const wall = this.add.text(x * TILE_SIZE, y * TILE_SIZE, '#', {
            fontSize: `${TILE_SIZE}px`,
            color: '#0F0',
          });
          wall.setOrigin(0);
        }
      }
    }

    this.input.keyboard.on('keydown', this.handleKeyInput, this);
  }

  findEmptyCell(mapData) {
    for (let x = 0; x < mapData.length; x++) {
      for (let y = 0; y < mapData[x].length; y++) {
        if (mapData[x][y] === 0) {
          return { x, y };
        }
      }
    }
    return null;
  }

  isEmptyCell(x, y) {
    return this.map[x][y] === 0;
  }

  handleKeyInput(event) {
    const x = this.player.x / TILE_SIZE;
    const y = this.player.y / TILE_SIZE;
    switch (event.key) {
      case 'ArrowUp':
        if (this.isEmptyCell(x, y - 1)) this.player.move(0, -TILE_SIZE);
        break;
      case 'ArrowDown':
        if (this.isEmptyCell(x, y + 1)) this.player.move(0, TILE_SIZE);
        break;
      case 'ArrowLeft':
        if (this.isEmptyCell(x - 1, y)) this.player.move(-TILE_SIZE, 0);
        break;
      case 'ArrowRight':
        if (this.isEmptyCell(x + 1, y)) this.player.move(TILE_SIZE, 0);
        break;
    }
  }
}

module.exports = { MainScene };

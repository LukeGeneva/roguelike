class Room {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class MapGenerator {
  constructor(width, height, roomAttempts, minRoomSize, maxRoomSize) {
    this.width = width;
    this.height = height;
    this.roomAttempts = roomAttempts;
    this.minRoomSize = minRoomSize;
    this.maxRoomSize = maxRoomSize;
    this.map = this.generateMap();
  }

  generateMap() {
    const map = this.createEmptyMap();
    const rooms = this.placeRooms();

    rooms.forEach((room) => {
      this.carveRoom(map, room);
    });

    for (let i = 0; i < rooms.length - 1; i++) {
      const roomA = rooms[i];
      const roomB = rooms[i + 1];

      const pointA = {
        x: Math.floor(roomA.x + roomA.width / 2),
        y: Math.floor(roomA.y + roomA.height / 2),
      };

      const pointB = {
        x: Math.floor(roomB.x + roomB.width / 2),
        y: Math.floor(roomB.y + roomB.height / 2),
      };

      this.carveHallway(map, pointA, pointB);
    }

    return map;
  }

  createEmptyMap() {
    const map = [];
    for (let x = 0; x < this.width; x++) {
      map[x] = [];
      for (let y = 0; y < this.height; y++) {
        map[x][y] = 1;
      }
    }
    return map;
  }

  placeRooms() {
    const rooms = [];

    for (let i = 0; i < this.roomAttempts; i++) {
      const roomWidth = this.randomInt(this.minRoomSize, this.maxRoomSize);
      const roomHeight = this.randomInt(this.minRoomSize, this.maxRoomSize);
      const roomX = this.randomInt(1, this.width - roomWidth - 1);
      const roomY = this.randomInt(1, this.height - roomHeight - 1);

      const newRoom = new Room(roomX, roomY, roomWidth, roomHeight);
      let overlap = false;

      rooms.forEach((room) => {
        if (
          newRoom.x <= room.x + room.width &&
          newRoom.x + newRoom.width >= room.x &&
          newRoom.y <= room.y + room.height &&
          newRoom.height + newRoom.y >= room.y
        ) {
          overlap = true;
        }
      });

      if (!overlap) {
        rooms.push(newRoom);
      }
    }

    return rooms;
  }

  carveRoom(map, room) {
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        map[x][y] = 0;
      }
    }
  }

  carveHallway(map, pointA, pointB) {
    const x1 = Math.min(pointA.x, pointB.x);
    const x2 = Math.max(pointA.x, pointB.x);
    const y1 = Math.min(pointA.y, pointB.y);
    const y2 = Math.max(pointA.y, pointB.y);

    for (let x = x1; x <= x2; x++) {
      map[x][pointA.y] = 0;
    }

    for (let y = y1; y <= y2; y++) {
      map[pointB.x][y] = 0;
    }
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = { MapGenerator };

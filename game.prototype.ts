interface Field {
  positionX: number;
  positionY: number;
  isHited: boolean;
  hasShip: boolean;
}
interface Board {
  fields: Array<Array<Field>>;
}
class Ship {
  size: number;
  fields: Array<Field>;
  isDrown: boolean;
  deploy(position:Position, direction:string){
      //deploing ship
  }
}
interface Position{
  x:number;
  y:number;
}
class Player {
  name: string;
  board: Board;
  ships: Array<Ship>;
  deployment() {
    this.ships.forEach(ship=>ship.deploy(humanInput.position, humanInput.direction))
  }
  hasShips(): boolean {
    //checkin thet player has any ship left
  }
  move(){}{
    //handle palyer move
  }
}
class Game {
  player: Player;
  enemy: Player;
  deployment() {
    player.deployment();
    enemy.deplayment();
  }
  gameOver() {}
  gameLoop() {
    this.deployment();
    while (player.hasShips() && enemy.hasShips()) {
      player.move();
      enemy.move();
    }
    this.gameOver();
  }
}

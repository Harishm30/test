const prompt = require('prompt-sync')();

class TeamPlayer {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class Team {
  constructor() {
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getAverageScore() {
    if (this.players.length === 0) {
      return 0;
    }

    const totalScore = this.players.reduce((sum, player) => sum + player.score, 0);
    return totalScore / this.players.length;
  }

  getMinimumScore() {
    if (this.players.length === 0) {
      return 0;
    }

    let minScore = this.players[0].score;
    for (let i = 1; i < this.players.length; i++) {
      if (this.players[i].score < minScore) {
        minScore = this.players[i].score;
      }
    }

    return minScore;
  }

  getMaximumScore() {
    if (this.players.length === 0) {
      return 0;
    }

    let maxScore = this.players[0].score;
    for (let i = 1; i < this.players.length; i++) {
      if (this.players[i].score > maxScore) {
        maxScore = this.players[i].score;
      }
    }

    return maxScore;
  }
}

// Example usage
const team = new Team();

const numPlayers = prompt('Enter the number of players: ');

for (let i = 1; i <= numPlayers; i++) {
  const name = prompt(`Enter the name of player ${i}: `);
  const score = parseFloat(prompt(`Enter the score of player ${i}: `));
  const player = new TeamPlayer(name, score);
  team.addPlayer(player);
}

console.log('Average score:', team.getAverageScore());
console.log('Minimum score:', team.getMinimumScore());
console.log('Maximum score:', team.getMaximumScore());

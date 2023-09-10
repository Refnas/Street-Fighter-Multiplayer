
const player1Name = document.getElementById('player1');
const player2Name = document.getElementById('player2');
const healthP1 = document.getElementById('hpP1');
const healthP2 = document.getElementById('hpP2');
const result = document.getElementById('result');

const updateGame = (p1,p2,gameState) => {
    player1Name.innerText = p1.name;
    player2Name.innerText = p2.name;
    healthP1.value = p1.health;
    healthP2.value = p2.health;

    if (p1.health <= 0 || p2.health <= 0) {
        game.isOver = true;
        gameState = game.isOver;
        result.innerText = game.declareWinner(p1, p2);
        return gameState;
    }
}


class Player{
    constructor(name,health,attackDamage){
        this.name = name;
        this.health = health;
        this.attackDmg = attackDamage;
    }

    strike(player,enemy,attackDmg){
        let damageAmount = Math.ceil(Math.random() * attackDmg);
        enemy.health -= damageAmount;
        updateGame(p1, p2, game.isOver);
        return `${player.name} attacks ${enemy.name} for ${damageAmount} damage!`
    }

    heal(player) {
        let hpAmount = Math.ceil(Math.random() * 5);
        player.health += hpAmount;
        
        // Make sure the player's health doesn't exceed the maximum (100)
        if (player.health > 100) {
            player.health = 100;
        }
        
        // Update the corresponding health element
        if (player === p1) {
            healthP1.value = player.health;
        } else if (player === p2) {
            healthP2.value = player.health;
        }
    
        updateGame(player, enemy, game.isOver);
        return `${player.name} heals for ${hpAmount} HP`;
    }
    
}

class Game{
    constructor(){
        this.isOver = false;
    }

    declareWinner(p1, p2) {
        let message = `TIE`;
        if (this.isOver && p1.health <= 0) {
            message = `${p2.name} WINS!`;
        } else if (this.isOver && p2.health <= 0) {
            message = `${p1.name} WINS!`;
        }
    
        document.getElementById('victory').play();
        return message;
    }
    

    reset(p1,p2){
        p1.health = 100;
        p2.health = 100;
        this.isOver = false;
        result.innerText = '';
        updateGame(p1,p2,this.isOver);
    }

    simulate(p1,p2){
        this.reset(p1,p2);
        while(!this.isOver){
            p1.strike(p1, p2, p1.attackDmg);    
            p2.heal(p2);
            p2.strike(p2, p1, p2.attackDmg);
            p1.heal(p1);
        }
        return this.declareWinner(this.isOver,p1,p2);
    }
}


const player1 = new Player('Player 1',100,10);
const player2 = new Player('Player 2',100,10);

let p1 = player1;
let p2 = player2;

let game = new Game();

let gameState;

const simulateBtn = document.getElementById('simulation');
 
simulateBtn.onclick = () =>{
    result.innerText = game.simulate(p1,p2);
}

const p1Attack = document.getElementById('attackP1');
const p2Attack = document.getElementById('attackP2');
const p1Heal = document.getElementById('healP1');
const p2Heal = document.getElementById('healP2');
const resetBtn = document.getElementById('reset');

const healAudio = document.getElementById('healAudio');


p1Attack.onclick = () =>{
    if(p2.health > 0 && game.isOver == false){
        p1.strike(p1,p2,p1.attackDmg);
        document.getElementById('player1attack').play();
    }
}

p1Heal.onclick = () => {
    if (p1.health > 0 && !game.isOver) {
        p1.heal(p1);
        healAudio.play();
    }
}

p2Attack.onclick = () =>{
    if(p1.health > 0 && game.isOver == false){
        p2.strike(p2,p1,p2.attackDmg);
        document.getElementById('player2attack').play();
    }
}

p2Heal.onclick = () => {
    if (p2.health > 0 && !game.isOver) {
        p2.heal(p2);
        healAudio.play();
    }
}

resetBtn.onclick = () => {
    game.reset(p1, p2);
};





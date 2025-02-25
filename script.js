const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game Variables
let player = { x: 50, y: canvas.height - 100, width: 50, height: 50, speed: 5};
let enemies = [];
let mathsProblem = "";
let correctAnswer = 0;
let currentLevel = 1;


// Loading Assets
const playerImage = new Image();
playerImage.src = "";  // Replace with the player sprite path

const enemyImages = [
    new Image(),  // Haliled
    new Image(),  // Eesirahp
    new Image(),  // H'tailog
    new Image(),  // Reficul
    new Image()  // Saduj
];
enemyImages[0].src = "";  // Replace with enemy sprite path (Haliled)
enemyImages[1].src = "";  // Replace with enemy sprite path (Eesirahp)
enemyImages[2].src = "";  // Replace with enemy sprite path (H'tailog)
enemyImages[3].src = "";  // Replace with enemy sprite path (Reficul)
enemyImages[4].src = "";  // Replace with enemy sprite path (Saduj)


// Player Movement
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.x -= player.speed;
    if (e.key === "ArrowRight") player.x += player.speed;
    if (e.key === "ArrowUp") player.y -= player.speed;
    if (e.key === "ArrowDown") player.y += player.speed;
});


// Game Rendering
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    enemies.forEach((enemy, index) => {
        ctx.drawImage(enemyImages[enemy.type], enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.x -= enemy.speed;

        // Remove enemy if off-screen
        if (enemy.x + enemy.width < 0) {
            enemies.splice(index, 1);
        }
    });
}

function gameLoop() {
    ctx.clearReact(0, 0, canvas,width, canvas.height);
    drawPlayer();
    drawEnemies();
    requestAnimationFrame(gameLoop);
}

gameLoop();


// Generating Maths-Based Puzzles
function generateMathsProblem() {
    let num1, num2;
    switch (currentLevel) {
        case 1:  // Basic Arithmetic and Algebra
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            mathsProblem = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;

        case 2:  // Geometry
            const side = Math.floor(Math.random() * 10) + 1;
            mathsProblem = `Area of a square with side ${side}?`;
            correctAnswer = side * side;
            break;

        case 3:  // Linear Equations
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            mathsProblem = `Solve for x: ${num1}x + ${num2} = ${num1 * 2 + num2}`;
            correctAnswer = 2;
            break;

        case 4:  // Trigonometry
            const angle = Math.floor(Math.random() * 90);
            mathsProblem = `sin(${angle}°)`;
            correctAnswer = Math.sin((angle * Math.PI) / 180).toFixed(2);
            break;

        case 5:  // Probability
            const probability = Math.floor(Math.random() * 10) + 1;
            mathsProblem = `Probability of rolling a ${probability} on a 10-sided die?`;
            correctAnswer = 0.1;
            break;
    }
    document.getElementById("math-problem").textContent = mathsProblem;
}

generateMathsProblem();


// Player Input
document.getElementById("submit-answer").addEventListener("click", () => {
    const playerAnswer = parseFloat(document.getElementById("math-input").value);
    if (playerAnswer === correctAnswer) {
        alert("You did it! You may proceed to the next level!");
        currentLevel++;
        document.getElementById("level-indicator").textContent = `Level: ${currentLevel}`;
        generateMathsProblem();
    } else {
        alert("Incorrect. Try again!");
    }
});


// Enemy Creation
function createEnemy() {
    const enemy = { x: canvas.width, y: canvas.height - 100, width: 50, height: 50, speed: 3, type: currentLevel - 1 };
    enemies.push(enemy);
}

// Create a new enemy every 4 seconds
setInterval(createEnemy, 4000); 


// Loading BGM
const bgm = new Howl({
    src: [''],   // Add the path to the bgm file
    loop: true,
    volume: 0.5
});

// Play BGM on Page Load
window.onload = function() {
    bgm.play();
};


// Loading SFX
const sfx = {
    buttonClick: new Howl({ src: [''], volume: 0.8}),  // Add path to the button click sound file
    enemyHit: new Howl({ src: [''], volume: 1.0}),  // Add path to the enemy hit sound
    magicCast: new Howl({ src: [''], volume: 0.9 }),  //Add path to sound that indicates that a spell has been casted
};

// Play Sound When Button is Clicked  (FOLLOW THIS FORMAT TO LOAD ALL OTHER SFXs)
document.querySelector("#submit-answer").addEventListener("click", () => {
    sfx.buttonClick.play();
});


// Play Character Voice Lines
const voices = new Howl({
    src: [''],  // Add path to the character voice - protagonist
    src: [''],  // Add path to the character voice - Haliled
    src: [''],  // Add path to the character voice - Eesirahp
    src: [''],  // Add path to the character voice - H'tailog
    src: [''],  // Add path to the character voice - Reficul
    src: [''],  // Add path to the character voice - Saduj
    volume: 1.0
});

// Trigger Voice When The Protagonist Character Attacks
function attack() {
    voices.play(0);
}


// Audio Controls
document.getElementById("volume-slider").addEventListener("input", (event) => {
    let volume = parseFloat(event.target.value);
    Howler.volume(volume);  // Adjusts all sounds
});

// Toggle BGM
let bgmMuted = false;
document.getElementById("mute-bgm").addEventListener("click", () => {
    bgmMuted = !bgmMuted;
    bgmMuted ? bgm.mute(true) : bgm.mute(false);
});

// Toggle SFX 
let sfxMuted = false;
document.getElementById("mute-sfx").addEventListener("click", () => {
    sfxMuted = !sfxMuted;
    for (let key in sfx) {
        sfx[key].mute(sfxMuted);
    }
});
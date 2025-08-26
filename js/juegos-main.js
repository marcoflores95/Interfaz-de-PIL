/**
 * ================================================================================
 * Módulo Principal de la Galería de Minijuegos (juegos-main.js)
 * Versión: 12.0.0 (Producción Final - Estable y Depurada)
 * --------------------------------------------------------------------------------
 * - LÓGICA 100% COMPLETA Y CORREGIDA: Este archivo contiene la lógica final y
 * funcional para los 15 juegos. Se han corregido todos los errores reportados,
 * incluyendo el crash de `showGameResult` y los fallos de inicio post-modal.
 * - INICIALIZACIÓN ASÍNCRONA: Todos los juegos esperan a que el usuario cierre
 * el modal de instrucciones antes de iniciar, garantizando una ejecución correcta.
 * - UI UNIFICADA: Implementado un modal de instrucciones genérico y una barra de
 * estado en cada juego (Puntuación, Monedas, Reiniciar).
 * ================================================================================
 */

import * as Player from './player-data.js';
import * as UI from './ui.js';
import { updateHeaderUI } from './app.js';
import { MUNICIPIOS } from './config.js';

// --- ELEMENTOS DEL DOM ---
const DOMElements = {
    noProfileView: document.getElementById('no-profile-view'),
    mainView: document.getElementById('games-main-view'),
    gameGrid: document.getElementById('game-grid'),
    modalBackdrop: document.getElementById('game-modal-backdrop'),
    modalHeader: {
        title: document.getElementById('game-modal-title'),
    },
    backToGalleryBtn: document.getElementById('back-to-gallery-btn'),
    gameCanvasContainer: document.getElementById('game-canvas-container'),
    gameResultOverlay: document.getElementById('game-result-overlay'),
    gameResultTitle: document.getElementById('game-result-title'),
    gameResultMessage: document.getElementById('game-result-message'),
    gameResultButtons: document.getElementById('game-result-buttons'),
    instructions: {
        backdrop: document.getElementById('instructions-modal-backdrop'),
        content: document.getElementById('instructions-modal-content'),
        title: document.getElementById('instructions-modal-title'),
        body: document.getElementById('instructions-modal-body'),
        playBtn: document.getElementById('instructions-modal-play-btn'),
    }
};

// --- LÓGICA DE JUEGO GENERAL ---
let activeGame = {
    id: null,
    interval: null,
    listeners: [],
    animationFrame: null,
    level: 1,
    timeouts: [],
    sessionCoins: 0,
};

function clearActiveGame() {
    if (activeGame.interval) clearInterval(activeGame.interval);
    if (activeGame.animationFrame) cancelAnimationFrame(activeGame.animationFrame);
    activeGame.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    activeGame.listeners.forEach(({ event, element, handler }) => {
        element.removeEventListener(event, handler);
    });
    activeGame = { id: null, interval: null, listeners: [], animationFrame: null, level: 1, timeouts: [], sessionCoins: 0 };
}

// --- HELPERS DE UI DE JUEGO ---

function showInstructions(title, htmlInstructions) {
    return new Promise(resolve => {
        DOMElements.instructions.title.textContent = title;
        DOMElements.instructions.body.innerHTML = htmlInstructions;
        DOMElements.instructions.backdrop.classList.remove('hidden');
        DOMElements.instructions.backdrop.classList.add('flex');
        setTimeout(() => {
            DOMElements.instructions.backdrop.classList.add('visible');
        }, 10);

        const playHandler = () => {
            DOMElements.instructions.backdrop.classList.remove('visible');

            setTimeout(() => {
                // [23-Jul-2025] TEAM-Diego Armando Salazar Barron: Se agregaron las siguientes líneas para manejar correctamente el ID "instructions-modal-backdrop".
                // Esto asegura que al hacer clic en el botón "¡JUGAR!", se oculte el backdrop y se permita iniciar los minijuegos sin bloqueo visual.

                DOMElements.instructions.backdrop.classList.add('hidden');
                DOMElements.instructions.backdrop.classList.remove('flex');
                
                DOMElements.instructions.playBtn.removeEventListener('click', playHandler);
                resolve();
            }, 300);
        };
        DOMElements.instructions.playBtn.addEventListener('click', playHandler);
    });
}

function createGameUI(container) {
    const uiBar = document.createElement('div');
    uiBar.className = 'game-ui-bar';
    uiBar.innerHTML = `
        <div class="flex gap-4">
            <div>Puntuación: <span id="game-score" class="stat">0</span></div>
            <div>Monedas Ganadas: <span id="session-coins" class="stat">0 🪙</span></div>
        </div>
        <button id="restart-game-btn" class="restart-btn" title="Reiniciar Juego">🔄</button>
    `;
    container.prepend(uiBar);

    const restartBtn = uiBar.querySelector('#restart-game-btn');
    const restartHandler = () => openGameModal(activeGame.id);
    restartBtn.addEventListener('click', restartHandler);
    activeGame.listeners.push({ event: 'click', element: restartBtn, handler: restartHandler });
}

function updateGameScore(score) {
    const scoreEl = document.getElementById('game-score');
    if (scoreEl) scoreEl.textContent = score;
}

function updateSessionCoins(amount) {
    activeGame.sessionCoins += amount;
    Player.updatePlayerCoins(amount);
    updateHeaderUI();
    const coinsEl = document.getElementById('session-coins');
    if (coinsEl) coinsEl.textContent = `${activeGame.sessionCoins} 🪙`;
}

// --- CATÁLOGO DE JUEGOS ---
const GAMES_CATALOG = [
    { id: 'minesweeper', name: 'Buscaminas de Momias', description: 'Encuentra los tesoros sin despertar a las momias.', icon: '🏺', initFunction: initMinesweeper },
    { id: 'snake', name: 'Gusano Comelón', description: '¡Come todas las fresas que puedas sin chocar!', icon: '🍓', initFunction: initSnake },
    { id: 'flappy', name: 'Xoconostle Volador', description: 'Aletea para esquivar los cactus y llegar lejos.', icon: '🐦', initFunction: initFlappyBird },
    { id: 'labyrinth', name: 'Laberinto del Callejón', description: 'Encuentra la salida y avanza de nivel.', icon: '🧱', initFunction: initLabyrinth },
    { id: 'riddle', name: 'Acertijo del Pípila (IA)', description: 'Resuelve la adivinanza que la IA tiene para ti.', icon: '🧠', initFunction: initRiddleGame },
    { id: 'explorer-route', name: 'Ruta del Explorador', description: 'Memoriza y repite la ruta por los municipios.', icon: '🗺️', initFunction: initExplorerRoute },
    { id: 'snakes-ladders', name: 'Serpientes y Escaleras', description: '¡Compite contra los bots para llegar a la meta!', icon: '🎲', initFunction: initSnakesAndLadders },
    { id: 'legend-hunter', name: 'Cazador de Leyendas', description: 'Vive una leyenda de Guanajuato y elige tu propio camino.', icon: '📜', initFunction: initLegendHunter },
    { id: 'feria-leon', name: 'Feria de León', description: '¡Atrapa todas las guacamayas que puedas!', icon: '🎡', initFunction: initFeriaLeon },
    { id: 'pottery-master', name: 'Alfarero de Dolores', description: 'Modela la vasija perfecta con tus propias manos.', icon: '🏺', initFunction: initPotteryMaster },
    { id: 'chichimeca-defense', name: 'Guerra Chichimeca', description: '¡Defiende el fuerte lanzando flechas a los enemigos!', icon: '🏹', initFunction: initChichimecaDefense },
    { id: 'rally-gto', name: 'Rally Guanajuato', description: 'Compite a toda velocidad, esquiva y recoge monedas.', icon: '🏎️', initFunction: initRallyGTO },
    { id: 'secret-tunnels', name: 'Túneles Secretos', description: 'Conecta la ruta con un número limitado de movimientos.', icon: '🚇', initFunction: initSecretTunnels },
    { id: 'balloon-festival', name: 'Festival del Globo', description: 'Eleva tu globo, recoge monedas y evita los peligros.', icon: '🎈', initFunction: initBalloonFestival },
    { id: 'wine-tasting', name: 'Cosecha de Dolores', description: 'Cosecha uvas y evita las plagas. ¡Maximiza tu puntaje!', icon: '🍇', initFunction: initWineTasting },
];

// --- LÓGICA PRINCIPAL ---
async function openGameModal(gameId) {
    const game = GAMES_CATALOG.find(g => g.id === gameId);
    if (!game) return;

    clearActiveGame();
    activeGame.id = gameId;
    activeGame.level = 1;

    DOMElements.modalHeader.title.textContent = game.name;
    DOMElements.gameCanvasContainer.innerHTML = '';
    DOMElements.gameResultOverlay.classList.add('hidden');
    DOMElements.modalBackdrop.classList.remove('hidden');
    DOMElements.modalBackdrop.classList.add('flex');

    await game.initFunction(DOMElements.gameCanvasContainer);
}

function closeGameModal() {
    clearActiveGame();
    DOMElements.modalBackdrop.classList.add('hidden');
    DOMElements.modalBackdrop.classList.remove('flex');
    DOMElements.gameCanvasContainer.innerHTML = '';
}

function showGameResult(title, message, buttons) {
    DOMElements.gameResultTitle.textContent = title;
    DOMElements.gameResultMessage.textContent = message;
    DOMElements.gameResultButtons.innerHTML = '';
    buttons.forEach(btnInfo => {
        const button = document.createElement('button');
        button.className = `btn-3d px-6 py-2 ${btnInfo.class}`;
        button.textContent = btnInfo.text;
        button.onclick = btnInfo.action;
        DOMElements.gameResultButtons.appendChild(button);
    });
    DOMElements.gameResultOverlay.classList.remove('hidden');
    DOMElements.gameResultOverlay.classList.add('flex');
}

function handleWin(coins, points) {
    showGameResult("¡Excelente!", `Ganaste ${coins} 🪙 y ${points} ⭐ puntos.`, [
        { text: "Jugar de Nuevo", class: "bg-green-500 text-white border-green-700", action: () => openGameModal(activeGame.id) },
        { text: "Volver a la Galería", class: "bg-blue-500 text-white border-blue-700", action: closeGameModal }
    ]);
}

function handleLoss(reason) {
    showGameResult("¡Juego Terminado!", reason, [
        { text: "Intentar de Nuevo", class: "bg-green-500 text-white border-green-700", action: () => openGameModal(activeGame.id) },
        { text: "Salir", class: "bg-red-500 text-white border-red-700", action: closeGameModal },
    ]);
}

function renderGameCards() {
    if (!DOMElements.gameGrid) return;
    DOMElements.gameGrid.innerHTML = '';
    GAMES_CATALOG.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300';
        card.innerHTML = `
            <div class="game-card-icon-container bg-blue-100 dark:bg-blue-900 flex justify-center items-center p-4 h-32 text-6xl">
                ${game.icon}
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="font-title text-xl text-primary dark:text-sky-400">${game.name}</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 mt-1 flex-grow">${game.description}</p>
                <button class="w-full mt-4 btn-3d bg-green-500 text-white border-green-700" data-game-id="${game.id}">Jugar</button>
            </div>
        `;
        DOMElements.gameGrid.appendChild(card);
    });
}
// --- LÓGICA DE MINIJUEGOS ---

// 1. Buscaminas
async function initMinesweeper(container) {
    await showInstructions("Buscaminas de Momias", `
        <p>¡Encuentra los tesoros sin despertar a las momias!</p>
        <ul class="text-left list-disc pl-6 mt-2">
            <li><strong>Clic izquierdo:</strong> Revela una celda.</li>
            <li><strong>Clic derecho:</strong> Marca una posible momia con 🚩.</li>
            <li>Un número indica cuántas momias hay en las 8 celdas de alrededor.</li>
            <li>¡Gana revelando todas las celdas seguras!</li>
        </ul>`);

    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const GRID_SIZE = 10;
    const MUMMY_COUNT = 15;
    let grid = [];
    let revealedCount = 0;
    let gameOver = false;

    function createGrid() {
        grid = Array(GRID_SIZE * GRID_SIZE).fill(0);
        let mummiesPlaced = 0;
        while (mummiesPlaced < MUMMY_COUNT) {
            const index = Math.floor(Math.random() * grid.length);
            if (grid[index] !== 'M') {
                grid[index] = 'M';
                mummiesPlaced++;
            }
        }
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === 'M') continue;
            let adjacentMummies = 0;
            const isLeftEdge = (i % GRID_SIZE === 0);
            const isRightEdge = (i % GRID_SIZE === GRID_SIZE - 1);
            const neighbors = [i - 1, i + 1, i - GRID_SIZE, i + GRID_SIZE, i - 1 - GRID_SIZE, i + 1 - GRID_SIZE, i - 1 + GRID_SIZE, i + 1 + GRID_SIZE];
            neighbors.forEach(nIndex => {
                if (nIndex >= 0 && nIndex < grid.length) {
                    if (isLeftEdge && (nIndex % GRID_SIZE === GRID_SIZE - 1)) return;
                    if (isRightEdge && (nIndex % GRID_SIZE === 0)) return;
                    if (grid[nIndex] === 'M') adjacentMummies++;
                }
            });
            grid[i] = adjacentMummies;
        }
    }

    function revealCell(index, element) {
        if (gameOver || element.classList.contains('revealed') || element.classList.contains('flag')) return;
        element.classList.add('revealed');
        if (grid[index] === 'M') {
            element.innerHTML = '💀';
            element.classList.add('momia');
            gameOver = true;
            document.querySelectorAll('.minesweeper-grid .cell').forEach((cell, i) => { if (grid[i] === 'M') cell.innerHTML = '💀'; });
            handleLoss("¡Despertaste a una momia!");
            return;
        }
        revealedCount++;
        if (grid[index] > 0) {
            element.textContent = grid[index];
        } else {
            const isLeftEdge = (index % GRID_SIZE === 0);
            const isRightEdge = (index % GRID_SIZE === GRID_SIZE - 1);
            const neighbors = [index - 1, index + 1, index - GRID_SIZE, index + GRID_SIZE, index - 1 - GRID_SIZE, index + 1 - GRID_SIZE, index - 1 + GRID_SIZE, index + 1 + GRID_SIZE];
            setTimeout(() => {
                neighbors.forEach(nIndex => {
                    if (nIndex >= 0 && nIndex < grid.length) {
                        if (isLeftEdge && (nIndex % GRID_SIZE === GRID_SIZE - 1)) return;
                        if (isRightEdge && (nIndex % GRID_SIZE === 0)) return;
                        const neighborEl = document.querySelector(`.cell[data-index='${nIndex}']`);
                        if (neighborEl && !neighborEl.classList.contains('revealed')) revealCell(nIndex, neighborEl);
                    }
                });
            }, 10);
        }
        updateGameScore(revealedCount);
        if (revealedCount === (GRID_SIZE * GRID_SIZE) - MUMMY_COUNT) {
            gameOver = true;
            updateSessionCoins(50);
            handleWin(activeGame.sessionCoins, 100);
        }
    }

    createGrid();
    const gridEl = document.createElement('div');
    gridEl.className = 'minesweeper-grid';
    gridEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
    gridEl.innerHTML = grid.map((_, i) => `<div class="cell" data-index="${i}"></div>`).join('');
    gameArea.appendChild(gridEl);

    gridEl.querySelectorAll('.cell').forEach((cell, i) => {
        const clickHandler = () => revealCell(i, cell);
        const contextHandler = e => {
            e.preventDefault();
            if (gameOver || cell.classList.contains('revealed')) return;
            cell.classList.toggle('flag');
            cell.innerHTML = cell.classList.contains('flag') ? '🚩' : '';
        };
        cell.addEventListener('click', clickHandler);
        cell.addEventListener('contextmenu', contextHandler);
        activeGame.listeners.push({ event: 'click', element: cell, handler: clickHandler }, { event: 'contextmenu', element: cell, handler: contextHandler });
    });
}

// 2. Gusano Comelón
async function initSnake(container) {
    await showInstructions("Gusano Comelón", `<p>Usa las <strong>teclas de flecha</strong> para mover al gusano. ¡Come todas las fresas 🍓 que puedas sin chocar contigo mismo o con las paredes!</p>`);
    
    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const box = 20;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let food = {};
    let score = 0;
    let d;

    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        const size = Math.min(containerSize.width, containerSize.height - 60) * 0.95;
        canvas.width = Math.floor(size / box) * box;
        canvas.height = Math.floor(size / box) * box;
        placeFood();
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    }

    function direction(event) {
        if (event.keyCode === 37 && d !== "RIGHT") d = "LEFT";
        else if (event.keyCode === 38 && d !== "DOWN") d = "UP";
        else if (event.keyCode === 39 && d !== "LEFT") d = "RIGHT";
        else if (event.keyCode === 40 && d !== "UP") d = "DOWN";
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? "#4ade80" : "#a3e635";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = "#0f172a";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        ctx.fillStyle = "#ef4444";
        ctx.font = `${box}px sans-serif`;
        ctx.fillText("🍓", food.x, food.y + box * 0.8);

        if (!d) return;

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        if (d === "LEFT") snakeX -= box;
        if (d === "UP") snakeY -= box;
        if (d === "RIGHT") snakeX += box;
        if (d === "DOWN") snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            updateGameScore(score);
            updateSessionCoins(5);
            placeFood();
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };
        const collision = (head, array) => array.some(segment => head.x === segment.x && head.y === segment.y);

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(activeGame.interval);
            handleLoss(`Chocaste. Puntuación final: ${score}`);
            return;
        }
        snake.unshift(newHead);
    }

    resizeCanvas();
    const keydownHandler = (e) => direction(e);
    document.addEventListener("keydown", keydownHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
    activeGame.interval = setInterval(draw, 180);
}


// 3. Xoconostle Volador
async function initFlappyBird(container) {
    await showInstructions("Xoconostle Volador", `
        <p>¡Ayuda al Xoconostle a volar!</p>
        <p class="mt-2">Presiona la <strong>barra espaciadora</strong> o haz <strong>clic</strong> para aletear y esquivar los cactus. ¡El juego es infinito! ¿Cuál será tu récord?</p>`);

    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let bird = { x: 50, y: 150, width: 40, height: 30 };
    let gravity = 0.5, velocity = 0, lift = -8;
    let pipes = [], pipeWidth = 60, pipeGap = 200;
    let frame = 0, score = 0, gameOver = false;
    
    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height - 60);
        bird.y = canvas.height / 2;
    }

    function jump(e) {
        if (gameOver || (e.code && e.code !== "Space")) return;
        velocity = lift;
    }
    
    function gameLoop() {
        if (gameOver) return;
        
        velocity += gravity;
        bird.y += velocity;
        frame++;

        if (frame % 90 === 0) {
            let pipeY = Math.random() * (canvas.height - pipeGap - 150) + 75;
            pipes.push({ x: canvas.width, y: pipeY, passed: false });
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = pipes.length - 1; i >= 0; i--) {
            let p = pipes[i];
            p.x -= 3;
            ctx.fillStyle = "#4ade80";
            ctx.fillRect(p.x, 0, pipeWidth, p.y);
            ctx.fillRect(p.x, p.y + pipeGap, pipeWidth, canvas.height - p.y - pipeGap);

            if (p.x + pipeWidth < 0) pipes.splice(i, 1);

            if (bird.x < p.x + pipeWidth && bird.x + bird.width > p.x && (bird.y < p.y || bird.y + bird.height > p.y + pipeGap)) {
                gameOver = true;
            }
            
            if (p.x + pipeWidth < bird.x && !p.passed) {
                p.passed = true;
                score++;
                updateGameScore(score);
                updateSessionCoins(2);
            }
        }

        ctx.font = `${bird.width}px sans-serif`;
        ctx.fillText('🐦', bird.x, bird.y);

        if (bird.y + bird.height > canvas.height || bird.y < 0) {
            gameOver = true;
        }
        
        if (gameOver) {
            cancelAnimationFrame(activeGame.animationFrame);
            handleLoss(`Chocaste. Puntuación final: ${score}`);
            return;
        }
        
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    }

    resizeCanvas();
    const keydownHandler = (e) => jump(e);
    const mousedownHandler = (e) => jump(e);
    document.addEventListener('keydown', keydownHandler);
    canvas.addEventListener('mousedown', mousedownHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler }, { event: 'mousedown', element: canvas, handler: mousedownHandler });
    gameLoop();
}

// 4. Laberinto
async function initLabyrinth(container) {
    await showInstructions("Laberinto del Callejón", `<p>Usa las <strong>teclas de flecha</strong> para moverte y llegar al cuadro verde. Cada vez que lo logres, pasarás a un nivel más difícil.</p>`);

    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let MAZE_SIZE, cellSize, maze, player;
    
    function setupLevel() {
        MAZE_SIZE = 9 + (activeGame.level * 2);
        player = { x: 1, y: 0 };
        generateMaze();
        resizeCanvas();
        draw();
        updateGameScore(`Nivel ${activeGame.level}`);
    }

    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        const size = Math.min(containerSize.width, containerSize.height - 60) * 0.95;
        canvas.width = size;
        canvas.height = size;
        cellSize = canvas.width / MAZE_SIZE;
    }

    function generateMaze() {
        maze = Array(MAZE_SIZE).fill(0).map(() => Array(MAZE_SIZE).fill(1));
        let stack = [], x = 1, y = 1;
        maze[y][x] = 0;
        stack.push([x, y]);
        while (stack.length > 0) {
            [x, y] = stack[stack.length - 1];
            let neighbors = [];
            if (x > 1 && maze[y][x - 2] === 1) neighbors.push([x - 2, y, x - 1, y]);
            if (x < MAZE_SIZE - 2 && maze[y][x + 2] === 1) neighbors.push([x + 2, y, x + 1, y]);
            if (y > 1 && maze[y - 2][x] === 1) neighbors.push([x, y - 2, x, y - 1]);
            if (y < MAZE_SIZE - 2 && maze[y + 2][x] === 1) neighbors.push([x, y + 2, x, y + 1]);
            if (neighbors.length > 0) {
                const [nx, ny, wx, wy] = neighbors[Math.floor(Math.random() * neighbors.length)];
                maze[ny][nx] = 0;
                maze[wy][wx] = 0;
                stack.push([nx, ny]);
            } else {
                stack.pop();
            }
        }
        maze[0][1] = 0;
        maze[MAZE_SIZE - 1][MAZE_SIZE - 2] = 0;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < MAZE_SIZE; y++) {
            for (let x = 0; x < MAZE_SIZE; x++) {
                ctx.fillStyle = maze[y][x] === 1 ? "#475569" : "#e2e8f0";
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(player.x * cellSize + cellSize / 2, player.y * cellSize + cellSize / 2, cellSize / 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#22c55e";
        ctx.fillRect((MAZE_SIZE - 2) * cellSize, (MAZE_SIZE - 1) * cellSize, cellSize, cellSize);
    }

    function movePlayer(e) {
        let newX = player.x, newY = player.y;
        if (e.key === "ArrowUp") newY--;
        if (e.key === "ArrowDown") newY++;
        if (e.key === "ArrowLeft") newX--;
        if (e.key === "ArrowRight") newX++;

        if (newX >= 0 && newX < MAZE_SIZE && newY >= 0 && newY < MAZE_SIZE && maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
            draw();
            if (player.x === MAZE_SIZE - 2 && player.y === MAZE_SIZE - 1) {
                UI.showNotification(`¡Nivel ${activeGame.level} completado!`, 'success');
                updateSessionCoins(25 * activeGame.level);
                activeGame.level++;
                setupLevel();
            }
        }
    }
    
    const keydownHandler = (e) => movePlayer(e);
    document.addEventListener('keydown', keydownHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
    setupLevel();
}

// 5. Ruta del Explorador
async function initExplorerRoute(container) {
    await showInstructions("Ruta del Explorador", `<p>¡Pon a prueba tu memoria! Observa la secuencia de luces en los municipios. Luego, haz clic en los botones en el mismo orden para ganar.</p>`);

    container.innerHTML = `<div class="game-area text-white text-center"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);
    
    let sequence = [], playerSequence = [];
    let showingSequence = true;
    const gameMunicipios = [...MUNICIPIOS].sort(() => 0.5 - Math.random()).slice(0, 10);

    function generateSequence() {
        const sequenceLength = 3 + activeGame.level;
        sequence = [];
        for (let i = 0; i < sequenceLength; i++) {
            sequence.push(gameMunicipios[Math.floor(Math.random() * gameMunicipios.length)]);
        }
        updateGameScore(`Nivel ${activeGame.level}`);
    }

    function flashButton(municipioName) {
        const button = gameArea.querySelector(`[data-municipio="${municipioName}"]`);
        if (button) {
            button.classList.add('bg-amber-400');
            const timeoutId = setTimeout(() => button.classList.remove('bg-amber-400'), 500);
            activeGame.timeouts.push(timeoutId);
        }
    }

    async function showSequence() {
        showingSequence = true;
        updateStatus('Memoriza la secuencia...');
        gameArea.querySelectorAll('button').forEach(b => b.disabled = true);
        for (const municipio of sequence) {
            await new Promise(resolve => {
                const timeoutId = setTimeout(() => {
                    flashButton(municipio);
                    resolve();
                }, 800);
                activeGame.timeouts.push(timeoutId);
            });
        }
        showingSequence = false;
        gameArea.querySelectorAll('button').forEach(b => b.disabled = false);
        updateStatus('Tu turno. Repite la secuencia.');
    }

    function updateStatus(text) {
        gameArea.querySelector('#status-text').textContent = text;
    }

    function handlePlayerClick(e) {
        const button = e.target.closest('button[data-municipio]');
        if (showingSequence || !button) return;

        const municipio = button.dataset.municipio;
        flashButton(municipio);
        playerSequence.push(municipio);

        if (sequence[playerSequence.length - 1] !== municipio) {
            handleLoss("Secuencia incorrecta.");
            return;
        }

        if (playerSequence.length === sequence.length) {
            updateSessionCoins(50);
            UI.showNotification(`¡Nivel ${activeGame.level} superado!`, 'success');
            activeGame.level++;
            playerSequence = [];
            generateSequence();
            showSequence();
        }
    }
    
    const contentEl = document.createElement('div');
    contentEl.className = "flex flex-col items-center justify-center h-full";
    contentEl.innerHTML = `
        <p id="status-text" class="text-xl font-bold mb-4">Preparando...</p>
        <div id="municipio-grid" class="grid grid-cols-2 md:grid-cols-5 gap-4">
            ${gameMunicipios.map(m => `<button data-municipio="${m}" class="btn-3d bg-sky-600 border-sky-800 text-white p-4 transition-colors duration-200">${m}</button>`).join('')}
        </div>`;
    gameArea.appendChild(contentEl);

    const clickHandler = (e) => handlePlayerClick(e);
    contentEl.addEventListener('click', clickHandler);
    activeGame.listeners.push({ event: 'click', element: contentEl, handler: clickHandler });

    generateSequence();
    showSequence();
}

// 6. Serpientes y Escaleras
async function initSnakesAndLadders(container) {
    await showInstructions("Serpientes y Escaleras", `<p>Haz clic en el dado 🎲 para lanzar. Compites contra dos bots. El primero en llegar a la casilla <strong>100</strong> gana. ¡Cuidado con las serpientes 🐍 y aprovecha las escaleras 🪜!</p>`);

    container.innerHTML = `<div class="game-area !p-0"></div>`;
    const gameArea = container.querySelector('.game-area');

    const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
    const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
    
    let players = [
        { id: 'player', name: 'Tú', pos: 1, token: '🚶', color: '#ef4444' },
        { id: 'bot1', name: 'Bot 1', pos: 1, token: '🤖', color: '#3b82f6' },
        { id: 'bot2', name: 'Bot 2', pos: 1, token: '🤖', color: '#f59e0b' },
    ];
    let currentPlayerIndex = 0;
    let gameOver = false;

    function buildBoard() {
        let cells = '';
        const boardNumbers = [];
        for (let i = 0; i < 100; i++) boardNumbers.push(i + 1);
        
        for (let row = 9; row >= 0; row--) {
            const rowNumbers = boardNumbers.slice(row * 10, (row + 1) * 10);
            if (row % 2 !== 0) rowNumbers.reverse();
            for (const num of rowNumbers) {
                 let content = `<span class="opacity-50">${num}</span>`;
                 if(snakes[num]) content += `<span class="text-2xl absolute">🐍</span>`;
                 if(ladders[num]) content += `<span class="text-2xl absolute">🪜</span>`;
                 cells += `<div id="cell-${num}" class="board-cell">${content}</div>`;
            }
        }
        
        gameArea.innerHTML = `
            <div class="flex flex-col md:flex-row items-center justify-center gap-4 h-full p-4">
                <div id="snakes-board" class="grid grid-cols-10 w-[90vw] h-[90vw] max-w-[500px] max-h-[500px] bg-amber-50 border-4 border-amber-600 rounded-lg">
                    ${cells}
                </div>
                <div id="game-controls" class="flex flex-col items-center gap-4 p-4 bg-slate-800 rounded-lg">
                    <p id="turn-indicator" class="text-white text-xl font-bold">Turno de: Tú</p>
                    <button id="dice-btn" class="text-6xl hover:scale-110 transition-transform">🎲</button>
                    <div id="dice-result" class="text-white text-3xl font-bold h-10"></div>
                </div>
            </div>`;

        players.forEach(p => {
            const tokenEl = document.createElement('div');
            tokenEl.id = `token-${p.id}`;
            tokenEl.className = 'player-token';
            tokenEl.textContent = p.token;
            tokenEl.style.backgroundColor = p.color;
            document.getElementById(`cell-${p.pos}`).appendChild(tokenEl);
        });
    }

    function updateTokenPosition(player) {
        const tokenEl = document.getElementById(`token-${player.id}`);
        const cellEl = document.getElementById(`cell-${player.pos}`);
        if (tokenEl && cellEl) {
            cellEl.appendChild(tokenEl);
        }
    }
    
    async function movePlayer(player, steps) {
        document.getElementById('dice-btn').disabled = true;
        for(let i=0; i<steps; i++){
            if(player.pos < 100) player.pos++;
            await new Promise(r => setTimeout(r, 100));
            updateTokenPosition(player);
        }

        if (snakes[player.pos]) {
            UI.showNotification(`${player.name} cayó en una serpiente.`, 'error');
            player.pos = snakes[player.pos];
        } else if (ladders[player.pos]) {
            UI.showNotification(`${player.name} subió por una escalera.`, 'success');
            player.pos = ladders[player.pos];
        }
        await new Promise(r => setTimeout(r, 500));
        updateTokenPosition(player);

        if (player.pos === 100) {
            gameOver = true;
            if (player.id === 'player') {
                updateSessionCoins(100);
                handleWin(100, 200);
            } else {
                handleLoss(`${player.name} ha ganado la partida.`);
            }
        }
    }

    async function nextTurn() {
        if(gameOver) return;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        const currentPlayer = players[currentPlayerIndex];
        document.getElementById('turn-indicator').textContent = `Turno de: ${currentPlayer.name}`;
        if (currentPlayer.id.startsWith('bot')) {
            document.getElementById('dice-btn').disabled = true;
            await new Promise(r => setTimeout(r, 1000));
            rollDice();
        } else {
            document.getElementById('dice-btn').disabled = false;
        }
    }

    function rollDice() {
        if (gameOver) return;
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-result').textContent = diceRoll;
        movePlayer(players[currentPlayerIndex], diceRoll).then(nextTurn);
    }
    
    buildBoard();
    const diceBtn = document.getElementById('dice-btn');
    const rollHandler = () => rollDice();
    diceBtn.addEventListener('click', rollHandler);
    activeGame.listeners.push({ event: 'click', element: diceBtn, handler: rollHandler });
}

// 7. Cazador de Leyendas
async function initLegendHunter(container) {
    await showInstructions("Cazador de Leyendas", `<p>Lee la historia y toma decisiones. Las respuestas correctas te darán monedas 🪙, ¡pero las incorrectas te las quitarán!</p>`);
    
    container.innerHTML = `<div class="game-area text-white text-center"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);
    updateGameScore('N/A');

    const loadingEl = document.createElement('div');
    loadingEl.innerHTML = `<div class="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>`;
    gameArea.appendChild(loadingEl);
    
    const prompt = `Eres un narrador de leyendas de Guanajuato. Crea una mini-aventura interactiva de 2 pasos para un niño. Responde ÚNICAMENTE con un objeto JSON. El JSON debe tener una clave "startNode" que contenga un objeto con: "text" (string con la introducción), y "options" (un array de 2 objetos). Cada option object tiene "text", "nextNode" (una clave para el siguiente nodo o "win"/"loss"), y "coins" (un número positivo para la opción correcta, negativo para la incorrecta).`;

    try {
        const response = await puter.ai.chat(prompt, { model: 'gemini-1.5-flash' });
        const jsonString = response.message.content.match(/{[\s\S]*}/)[0];
        const storyData = JSON.parse(jsonString);
        loadingEl.remove();

        function renderNode(nodeKey) {
            const node = storyData[nodeKey];
            if (!node) {
                handleLoss("La historia no pudo continuar.");
                return;
            }
            const storyContainer = document.createElement('div');
            storyContainer.className = "riddle-container";
            storyContainer.innerHTML = `<p class="text-lg mb-6">${node.text}</p><div class="flex flex-col gap-4">${node.options.map(opt => `<button data-target="${opt.nextNode}" data-coins="${opt.coins || 0}" class="btn-3d bg-sky-600 border-sky-800 text-white p-3">${opt.text}</button>`).join('')}</div>`;
            gameArea.querySelector('.riddle-container')?.remove();
            gameArea.appendChild(storyContainer);
        }

        const clickHandler = (e) => {
            const button = e.target.closest('button[data-target]');
            if (!button) return;

            const targetNodeKey = button.dataset.target;
            const coins = parseInt(button.dataset.coins);

            updateSessionCoins(coins);
            if (coins > 0) UI.showNotification(`¡Correcto! Ganaste ${coins} monedas.`, 'success');
            else if (coins < 0) UI.showNotification(`¡Oh no! Perdiste ${-coins} monedas.`, 'error');

            if (targetNodeKey === 'win') handleWin(activeGame.sessionCoins, activeGame.sessionCoins * 2);
            else if (targetNodeKey === 'loss') handleLoss("Esa decisión no fue la mejor.");
            else renderNode(targetNodeKey);
        };
        
        gameArea.addEventListener('click', clickHandler);
        activeGame.listeners.push({ event: 'click', element: gameArea, handler: clickHandler });
        renderNode('startNode');

    } catch (error) {
        gameArea.innerHTML = `<p class="text-red-400">La IA no pudo crear una leyenda. Inténtalo de nuevo más tarde.</p>`;
    }
}

// 8. Feria de León
async function initFeriaLeon(container) {
    await showInstructions("Feria de León", `<p>¡Bienvenido al tiro al blanco! Haz clic en las guacamayas 🦜 para capturarlas y sumar puntos. ¡Tienes 30 segundos!</p>`);
    
    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let targets = [], effects = [], score = 0, timeLeft = 30, gameOver = false;

    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height - 60);
    }

    function spawnTarget() {
        if (gameOver) return;
        targets.push({ x: Math.random() * (canvas.width - 60) + 30, y: canvas.height, size: 50, speed: 2 + Math.random() * 2 });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        targets.forEach(t => {
            t.y -= t.speed;
            ctx.font = `${t.size}px sans-serif`;
            ctx.fillText('🦜', t.x, t.y);
        });
        targets = targets.filter(t => t.y > -t.size);
        effects.forEach(e => {
            e.opacity -= 0.05;
            ctx.globalAlpha = e.opacity;
            ctx.font = `${e.size}px sans-serif`;
            ctx.fillText('💥', e.x, e.y);
            ctx.globalAlpha = 1.0;
        });
        effects = effects.filter(e => e.opacity > 0);
    }

    const clickHandler = (e) => {
        if (gameOver) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        for (let i = targets.length - 1; i >= 0; i--) {
            const t = targets[i];
            if (clickX >= t.x && clickX <= t.x + t.size && clickY >= t.y - t.size && clickY <= t.y) {
                effects.push({ x: t.x, y: t.y, size: t.size * 1.2, opacity: 1.0 });
                targets.splice(i, 1);
                score += 10;
                updateGameScore(score);
                updateSessionCoins(10);
            }
        }
    };
    
    const gameLoop = () => {
        if (gameOver) return;
        timeLeft -= 1 / 60;
        if (timeLeft <= 0) {
            gameOver = true;
            clearInterval(activeGame.interval);
            cancelAnimationFrame(activeGame.animationFrame);
            handleWin(activeGame.sessionCoins, score);
            return;
        }
        draw();
        updateGameScore(`Tiempo: ${Math.ceil(timeLeft)}s`);
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    };

    resizeCanvas();
    canvas.addEventListener('click', clickHandler);
    activeGame.listeners.push({ event: 'click', element: canvas, handler: clickHandler });
    activeGame.interval = setInterval(spawnTarget, 800);
    gameLoop();
}

// 9. Alfarero de Dolores
async function initPotteryMaster(container) {
    await showInstructions("Alfarero de Dolores", `<p>Haz clic y mantén presionado. Mueve el mouse para dar forma a la vasija. Intenta que coincida con el contorno punteado para lograr la máxima perfección.</p>`);

    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let potPoints = [];
    const targetPoints = [];
    const sections = 20;
    let shaping = false;
    
    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        const size = Math.min(containerSize.width, containerSize.height - 60) * 0.9;
        canvas.width = size;
        canvas.height = size;
        initShapes();
        draw();
    }
    
    function initShapes() {
        potPoints = [];
        targetPoints.length = 0;
        const targetBaseWidth = canvas.width * 0.2;
        const targetTopWidth = canvas.width * 0.4;
        const targetMaxHeight = canvas.height * 0.8;
        for (let i = 0; i <= sections; i++) {
            const t = i / sections;
            const y = (canvas.height * 0.9) - (t * targetMaxHeight);
            const targetWidth = targetBaseWidth + (Math.sin(t * Math.PI) * targetTopWidth);
            targetPoints.push({ x: canvas.width / 2, y, width: targetWidth });
            potPoints.push({ x: canvas.width / 2, y, width: canvas.width * 0.2 });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 10]);
        ctx.beginPath();
        for(const p of targetPoints) {
            ctx.moveTo(p.x - p.width / 2, p.y);
            ctx.lineTo(p.x + p.width / 2, p.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#ca8a04";
        ctx.beginPath();
        ctx.moveTo(potPoints[0].x - potPoints[0].width / 2, potPoints[0].y);
        for(let i=1; i < potPoints.length; i++) {
             ctx.lineTo(potPoints[i].x - potPoints[i].width / 2, potPoints[i].y);
        }
        for(let i=potPoints.length - 1; i >= 0; i--) {
             ctx.lineTo(potPoints[i].x + potPoints[i].width / 2, potPoints[i].y);
        }
        ctx.closePath();
        ctx.fill();
    }

    const mousedownHandler = () => { shaping = true; };
    const mouseupHandler = () => {
        shaping = false;
        checkPot();
    };
    const mousemoveHandler = (e) => {
        if (!shaping) return;
        const rect = canvas.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const mouseX = e.clientX - rect.left;
        potPoints.forEach(p => {
            const distance = Math.abs(mouseY - p.y);
            if (distance < 50) {
                 const influence = (50 - distance) / 50;
                 const pull = (mouseX - p.x) * 0.02 * influence;
                 p.width += pull;
                 p.width = Math.max(20, Math.min(p.width, canvas.width * 0.9));
            }
        });
        draw();
    };
    
    function checkPot() {
        let diffSum = 0;
        for (let i = 0; i < potPoints.length; i++) {
            diffSum += Math.abs(potPoints[i].width - targetPoints[i].width);
        }
        const avgDiff = diffSum / potPoints.length;
        const perfection = Math.max(0, 100 - avgDiff * 2);
        updateGameScore(`${perfection.toFixed(0)}%`);
        if (perfection > 90) {
            updateSessionCoins(100);
            handleWin(100, 200);
        } else if (perfection > 70) {
             updateSessionCoins(50);
             UI.showNotification('¡Casi perfecto! Ganas 50 monedas.', 'success');
        } else {
             UI.showNotification('¡Sigue intentando!', 'info');
        }
    }

    resizeCanvas();
    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('mouseup', mouseupHandler);
    canvas.addEventListener('mouseleave', mouseupHandler);
    canvas.addEventListener('mousemove', mousemoveHandler);
    activeGame.listeners.push({ event: 'mousedown', element: canvas, handler: mousedownHandler }, { event: 'mouseup', element: canvas, handler: mouseupHandler }, { event: 'mouseleave', element: canvas, handler: mouseupHandler }, { event: 'mousemove', element: canvas, handler: mousemoveHandler });
}

// 10. Guerra Chichimeca
async function initChichimecaDefense(container) {
    await showInstructions("Guerra Chichimeca", `<p>¡Defiende el fuerte! Usa las <strong>flechas Izquierda/Derecha</strong> para mover el arco y la <strong>barra espaciadora</strong> para lanzar flechas 🏹. ¡No dejes que los enemigos lleguen abajo!</p>`);
    
    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let bow = { x: 0, y: 0, width: 60, height: 40, speed: 10 };
    let arrows = [], enemies = [], score = 0, gameOver = false;

    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height - 60);
        bow.x = canvas.width / 2 - bow.width / 2;
        bow.y = canvas.height - bow.height - 10;
    }

    function handleInput(e) {
        if (e.key === "ArrowLeft") bow.x -= bow.speed;
        else if (e.key === "ArrowRight") bow.x += bow.speed;
        else if (e.code === "Space") {
            e.preventDefault();
            arrows.push({ x: bow.x + bow.width / 2 - 2.5, y: bow.y, width: 5, height: 20, speed: 8 });
        }
        bow.x = Math.max(0, Math.min(bow.x, canvas.width - bow.width));
    }
    
    function spawnEnemy() {
        if (gameOver) return;
        enemies.push({ x: Math.random() * (canvas.width - 40), y: -40, width: 40, height: 40, speed: 1 + Math.random() * 1.5, icon: '🛡️' });
    }

    function gameLoop() {
        if (gameOver) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${bow.width}px sans-serif`;
        ctx.fillText('🏹', bow.x, bow.y + bow.height);

        ctx.fillStyle = "#f59e0b";
        arrows.forEach((arrow, index) => {
            arrow.y -= arrow.speed;
            ctx.fillRect(arrow.x, arrow.y, arrow.width, arrow.height);
            if (arrow.y < 0) arrows.splice(index, 1);
        });
        
        enemies.forEach((enemy, eIndex) => {
            enemy.y += enemy.speed;
            ctx.font = `${enemy.width}px sans-serif`;
            ctx.fillText(enemy.icon, enemy.x, enemy.y);
            
            arrows.forEach((arrow, aIndex) => {
                if (arrow.x < enemy.x + enemy.width && arrow.x + arrow.width > enemy.x && arrow.y < enemy.y + enemy.height && arrow.y + arrow.height > enemy.y) {
                    arrows.splice(aIndex, 1);
                    enemies.splice(eIndex, 1);
                    score += 10;
                    updateGameScore(score);
                    updateSessionCoins(10);
                }
            });

            if (enemy.y + enemy.height > canvas.height) gameOver = true;
        });

        if (gameOver) {
            cancelAnimationFrame(activeGame.animationFrame);
            clearInterval(activeGame.interval);
            handleLoss("Los enemigos han llegado a la base.");
            return;
        }
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    }

    resizeCanvas();
    const keydownHandler = (e) => handleInput(e);
    document.addEventListener('keydown', keydownHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
    activeGame.interval = setInterval(spawnEnemy, 2000);
    gameLoop();
}

// 11. Rally GTO
async function initRallyGTO(container) {
    await showInstructions("Rally Guanajuato", `
        <p>¡A toda velocidad!</p>
        <ul class="text-left list-disc pl-6 mt-2">
            <li><strong>Flechas Arriba/Abajo:</strong> Muévete para esquivar.</li>
            <li><strong>Flechas Izquierda/Derecha:</strong> Ajusta tu velocidad.</li>
            <li>Esquiva los barriles 🛢️ y recoge las monedas 🪙.</li>
        </ul>`);

    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let car = { x: 100, y: 0, width: 60, height: 60 };
    let obstacles = [], coins = [], score = 0, keys = {}, roadSpeed = 5;

    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height - 60);
        car.y = canvas.height / 2;
    }

    function updatePlayer() {
        if (keys['ArrowUp']) car.y -= 5;
        if (keys['ArrowDown']) car.y += 5;
        if (keys['ArrowRight']) roadSpeed += 0.1;
        if (keys['ArrowLeft']) roadSpeed -= 0.1;
        roadSpeed = Math.max(2, Math.min(roadSpeed, 15));
        car.y = Math.max(0, Math.min(car.y, canvas.height - car.height));
    }

    function spawnObjects() {
        if (Math.random() < 0.03) obstacles.push({ x: canvas.width, y: Math.random() * (canvas.height - 40), width: 50, height: 50, icon: '🛢️' });
        if (Math.random() < 0.02) coins.push({ x: canvas.width, y: Math.random() * (canvas.height - 30), width: 40, height: 40, icon: '🪙' });
    }

    function gameLoop() {
        updatePlayer();
        spawnObjects();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        [...obstacles, ...coins].forEach(item => {
            item.x -= roadSpeed;
            ctx.font = `${item.width}px sans-serif`;
            ctx.fillText(item.icon, item.x, item.y + item.height);
        });
        
        obstacles = obstacles.filter(item => item.x > -item.width);
        coins = coins.filter(item => item.x > -item.width);

        ctx.font = `${car.width}px sans-serif`;
        ctx.fillText('🏎️', car.x, car.y + car.height);

        for (const o of obstacles) {
            if (car.x < o.x + o.width && car.x + car.width > o.x && car.y < o.y + o.height && car.y + car.height > o.y) {
                cancelAnimationFrame(activeGame.animationFrame);
                handleLoss("¡Chocaste con un obstáculo!");
                return;
            }
        }
        for (let i = coins.length - 1; i >= 0; i--) {
            const c = coins[i];
            if (car.x < c.x + c.width && car.x + car.width > c.x && car.y < c.y + c.height && car.y + car.height > c.y) {
                coins.splice(i, 1);
                score += 5;
                updateSessionCoins(5);
            }
        }
        
        score += 0.1;
        updateGameScore(Math.floor(score));
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    }
    
    resizeCanvas();
    const keydownHandler = (e) => { keys[e.key] = true; };
    const keyupHandler = (e) => { keys[e.key] = false; };
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler }, { event: 'keyup', element: document, handler: keyupHandler });
    gameLoop();
}

// 12. Túneles Secretos
async function initSecretTunnels(container) {
    await showInstructions("Túneles Secretos", `<p>Conecta la <strong>CASA 🏠</strong> con el <strong>MUSEO 🏛️</strong>. Haz clic en las casillas vacías para construir un camino. Tienes un número limitado de movimientos.</p>`);

    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const GRID_SIZE = 7;
    const MAX_MOVES = 15 + activeGame.level;
    let movesLeft = MAX_MOVES;
    let grid = [];
    let startNode = {x: 0, y: Math.floor(GRID_SIZE/2)};
    let endNode = {x: GRID_SIZE - 1, y: Math.floor(GRID_SIZE/2)};

    function generateGrid() {
        grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
        for(let i=0; i<GRID_SIZE * GRID_SIZE * 0.2; i++) {
            const x = Math.floor(Math.random() * GRID_SIZE);
            const y = Math.floor(Math.random() * GRID_SIZE);
            if ((x !== startNode.x || y !== startNode.y) && (x !== endNode.x || y !== endNode.y)) {
                grid[y][x] = 1;
            }
        }
    }
    
    function drawGrid() {
        let gridHTML = '';
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                let icon = '';
                let cellClass = 'bg-slate-700 hover:bg-slate-600';
                if (x === startNode.x && y === startNode.y) { icon = '🏠'; cellClass="bg-green-700"; }
                else if (x === endNode.x && y === endNode.y) { icon = '🏛️'; cellClass="bg-blue-700"; }
                else if (grid[y][x] === 1) { icon = '🧱'; cellClass="bg-slate-900 cursor-not-allowed"; }
                else if (grid[y][x] === 2) { icon = ''; cellClass="bg-amber-500"; }
                gridHTML += `<div class="cell aspect-square flex items-center justify-center text-4xl ${cellClass}" data-x="${x}" data-y="${y}">${icon}</div>`;
            }
        }
        
        let gridContainer = gameArea.querySelector('#tunnel-grid');
        if (!gridContainer) {
            gridContainer = document.createElement('div');
            gridContainer.id = 'tunnel-grid';
            gridContainer.className = 'grid gap-1 w-full max-w-lg';
            gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
            gameArea.appendChild(gridContainer);
        }
        gridContainer.innerHTML = gridHTML;
        updateGameScore(movesLeft);
    }
    
    function handleCellClick(e) {
        const cell = e.target.closest('.cell');
        if(!cell) return;
        const x = parseInt(cell.dataset.x), y = parseInt(cell.dataset.y);
        if (grid[y][x] === 1 || (x === startNode.x && y === startNode.y) || (x === endNode.x && y === endNode.y)) return;

        if(grid[y][x] === 0) {
            if (movesLeft > 0) {
                grid[y][x] = 2;
                movesLeft--;
            } else {
                UI.showNotification("No te quedan movimientos.", "error");
            }
        } else if (grid[y][x] === 2) {
            grid[y][x] = 0;
            movesLeft++;
        }
        drawGrid();
    }
    
    function checkPath() {
        let queue = [startNode], visited = new Set([`${startNode.x},${startNode.y}`]), pathFound = false;
        while(queue.length > 0) {
            const {x, y} = queue.shift();
            if(x === endNode.x && y === endNode.y) {
                pathFound = true;
                break;
            }
            const neighbors = [[x, y-1], [x, y+1], [x-1, y], [x+1, y]];
            for(const [nx, ny] of neighbors) {
                if(nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !visited.has(`${nx},${ny}`)) {
                     if((grid[ny][nx] === 2) || (nx === endNode.x && ny === endNode.y)) {
                         visited.add(`${nx},${ny}`);
                         queue.push({x: nx, y: ny});
                     }
                }
            }
        }
        if(pathFound) {
            updateSessionCoins(100);
            handleWin(100, (MAX_MOVES - movesLeft) * 10);
        } else {
            handleLoss("El camino no conecta la casa con el museo.");
        }
    }

    generateGrid();
    drawGrid();
    
    const checkBtn = document.createElement('button');
    checkBtn.id = 'check-path-btn';
    checkBtn.className = 'btn-3d bg-green-500 border-green-700 mt-4';
    checkBtn.textContent = 'Comprobar Conexión';
    gameArea.appendChild(checkBtn);
    
    const gridEl = gameArea.querySelector('#tunnel-grid');
    const gridClickHandler = e => handleCellClick(e);
    const checkClickHandler = () => checkPath();
    gridEl.addEventListener('click', gridClickHandler);
    checkBtn.addEventListener('click', checkClickHandler);
    activeGame.listeners.push({ event: 'click', element: gridEl, handler: gridClickHandler }, { event: 'click', element: checkBtn, handler: checkClickHandler });
}

// 13. Festival del Globo
async function initBalloonFestival(container) {
    await showInstructions("Festival del Globo", `<p>¡Vuela alto! Usa las <strong>flechas Arriba/Abajo</strong> para mover tu globo 🎈. Recoge monedas 🪙 y esquiva los peligros: pájaros 🐦, aviones ✈️ y nubes de tormenta ⛈️.</p>`);

    container.innerHTML = `<div class="game-area"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    gameArea.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let balloon = { x: 50, y: 0, width: 60, height: 60 };
    let coins = [], dangers = [], score = 0, gameOver = false;

    function resizeCanvas() {
        const containerSize = gameArea.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height - 60);
        balloon.y = canvas.height / 2;
    }

    function spawnObjects() {
        if (Math.random() < 0.05) coins.push({ x: canvas.width, y: Math.random() * canvas.height, size: 30, icon: '🪙', speed: 3 });
        if (Math.random() < 0.03) {
            const dangerType = Math.random();
            if (dangerType < 0.5) dangers.push({ x: canvas.width, y: Math.random() * canvas.height, size: 40, icon: '🐦', speed: 5 });
            else if (dangerType < 0.8) dangers.push({ x: canvas.width, y: Math.random() * canvas.height, size: 50, icon: '✈️', speed: 7 });
            else dangers.push({ x: canvas.width, y: Math.random() * canvas.height, size: 50, icon: '⛈️', speed: 2 });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${balloon.width}px sans-serif`;
        ctx.fillText('🎈', balloon.x, balloon.y);
        [...coins, ...dangers].forEach(item => {
            item.x -= item.speed;
            ctx.font = `${item.size}px sans-serif`;
            ctx.fillText(item.icon, item.x, item.y);
        });
    }

    const moveHandler = (e) => {
        if (e.key === "ArrowUp") balloon.y -= 20;
        if (e.key === "ArrowDown") balloon.y += 20;
        balloon.y = Math.max(0, Math.min(balloon.y, canvas.height - balloon.height));
    };

    const gameLoop = () => {
        if(gameOver) return;
        spawnObjects();
        
        coins = coins.filter(c => c.x > -c.size);
        dangers = dangers.filter(d => d.x > -d.size);

        for (let i = coins.length - 1; i >= 0; i--) {
            const c = coins[i];
            if (balloon.x < c.x + c.size && balloon.x + balloon.width > c.x && balloon.y < c.y + c.size && balloon.y + balloon.height > c.y) {
                coins.splice(i, 1);
                score += 10;
                updateSessionCoins(10);
            }
        }
        for (const d of dangers) {
            if (balloon.x < d.x + d.size && balloon.x + balloon.width > d.x && balloon.y < d.y + d.size && balloon.y + balloon.height > d.y) {
                gameOver = true;
                cancelAnimationFrame(activeGame.animationFrame);
                handleLoss(`¡Chocaste con un ${d.icon}!`);
                return;
            }
        }
        
        draw();
        updateGameScore(score);
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    };

    resizeCanvas();
    document.addEventListener('keydown', moveHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: moveHandler });
    gameLoop();
}

// 14. Cosecha de Dolores
async function initWineTasting(container) {
    await showInstructions("Cosecha de Dolores", `
        <p>Tienes <strong>15 intentos</strong> para cosechar las mejores parcelas. Haz clic para revelar lo que hay debajo.</p>
        <ul class="text-left list-disc pl-6 mt-2">
            <li>🍇: Uvas de primera! <strong>+50 Puntos</strong></li>
            <li>🍀: Trébol de la suerte! <strong>+200 Puntos</strong></li>
            <li>🌿: Vides normales. <strong>+10 Puntos</strong></li>
            <li>🐛: ¡Una plaga! <strong>-100 Puntos</strong></li>
        </ul>`);

    container.innerHTML = `<div class="game-area text-white text-center"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);

    const GRID_SIZE = 6;
    const HARVEST_LIMIT = 15;
    let harvestsLeft = HARVEST_LIMIT;
    let score = 0;
    let grid = [];
    let gameOver = false;

    function generateGrid() {
        const items = [];
        for(let i=0; i<5; i++) items.push({ icon: '🍇', points: 50, type: 'grape'});
        for(let i=0; i<3; i++) items.push({ icon: '🐛', points: -100, type: 'worm'});
        for(let i=0; i<2; i++) items.push({ icon: '🍀', points: 200, type: 'clover'});
        while(items.length < GRID_SIZE * GRID_SIZE) items.push({ icon: '🌿', points: 10, type: 'vine'});
        items.sort(() => Math.random() - 0.5);
        grid = items.map(item => ({...item, revealed: false}));
    }
    
    function draw() {
        let gridHTML = '';
        grid.forEach((item, index) => {
             let content = '';
             let cardClass = 'bg-purple-800 hover:bg-purple-700';
             if(item.revealed) {
                 content = item.icon;
                 cardClass = item.type === 'worm' ? 'bg-red-500' : (item.type === 'clover' ? 'bg-yellow-500' : 'bg-green-600');
             }
             gridHTML += `<div class="cell aspect-square flex items-center justify-center text-4xl rounded-lg cursor-pointer transition-all duration-300 ${cardClass}" data-index="${index}">${content}</div>`;
        });

        let gridContainer = gameArea.querySelector('#vineyard-grid');
        if (!gridContainer) {
            gridContainer = document.createElement('div');
            gridContainer.id = 'vineyard-grid';
            gridContainer.className = 'grid gap-2 w-full max-w-lg';
            gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
            gameArea.appendChild(gridContainer);
        }
        gridContainer.innerHTML = gridHTML;
        updateGameScore(score);
        document.getElementById('session-coins').previousSibling.textContent = "Intentos: ";
        document.getElementById('session-coins').textContent = `${harvestsLeft}`;
    }

    function handleCellClick(e) {
        if(gameOver) return;
        const cell = e.target.closest('.cell');
        if(!cell || harvestsLeft <= 0) return;
        
        const index = parseInt(cell.dataset.index);
        const item = grid[index];
        
        if (item.revealed) return;

        item.revealed = true;
        score += item.points;
        harvestsLeft--;
        
        if (item.points > 0) updateSessionCoins(Math.floor(item.points / 10));
        else updateSessionCoins(item.points);
        
        draw(); 
        
        if (harvestsLeft <= 0) {
            gameOver = true;
            setTimeout(() => {
                if (score > 0) handleWin(activeGame.sessionCoins, score);
                else handleLoss(`Cosecha terminada con ${score} puntos.`);
            }, 1000);
        }
    }

    generateGrid();
    draw();
    
    const vineyardGrid = gameArea.querySelector('#vineyard-grid');
    const clickHandler = (e) => handleCellClick(e);
    vineyardGrid.addEventListener('click', clickHandler);
    activeGame.listeners.push({ event: 'click', element: vineyardGrid, handler: clickHandler });
}

// 15. Acertijo del Pípila
async function initRiddleGame(container) {
    await showInstructions("Acertijo del Pípila", `<p>La inteligencia artificial de El Pípila tiene una adivinanza para ti sobre Guanajuato. ¡Lee con atención y escribe tu respuesta!</p>`);
    
    container.innerHTML = `<div class="game-area text-white text-center"></div>`;
    const gameArea = container.querySelector('.game-area');
    createGameUI(gameArea);
    updateGameScore('N/A');

    const loadingEl = document.createElement('div');
    loadingEl.innerHTML = `<div class="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>`;
    gameArea.appendChild(loadingEl);
    
    const prompt = `Eres El Pípila. Crea una adivinanza corta y fácil para un niño sobre un lugar, comida o personaje de Guanajuato (ej. las momias, una guacamaya, Diego Rivera). Responde ÚNICAMENTE con un objeto JSON con dos claves: "riddle" (string con la adivinanza) y "answers" (un array de strings con las posibles respuestas correctas en minúsculas, ej. ["momias", "las momias de guanajuato"]).`;

    try {
        const response = await puter.ai.chat(prompt, { model: 'gemini-1.5-flash' });
        const jsonString = response.message.content.match(/{[\s\S]*}/)[0];
        const data = JSON.parse(jsonString);
        loadingEl.remove();

        const riddleContainer = document.createElement('div');
        riddleContainer.className = 'riddle-container';
        riddleContainer.innerHTML = `
            <p class="riddle-text text-xl">"${data.riddle}"</p>
            <input id="riddle-answer-input" type="text" class="riddle-input mt-4 bg-slate-700 text-white p-2 rounded" placeholder="Escribe tu respuesta aquí">
            <button id="check-riddle-btn" class="mt-6 btn-3d bg-amber-500 text-white border-amber-700">Adivinar</button>
        `;
        gameArea.appendChild(riddleContainer);

        const checkBtn = document.getElementById('check-riddle-btn');
        const clickHandler = () => {
            const input = document.getElementById('riddle-answer-input');
            const userAnswer = input.value.trim().toLowerCase();
            if (data.answers.includes(userAnswer)) {
                updateSessionCoins(75);
                handleWin(75, 150);
            } else {
                UI.showNotification('¡Inténtalo de nuevo!', 'error');
                input.value = '';
                input.focus();
            }
        };
        checkBtn.addEventListener('click', clickHandler);
        activeGame.listeners.push({ event: 'click', element: checkBtn, handler: clickHandler });

    } catch (error) {
        gameArea.innerHTML = `<p class="text-red-400">La IA no pudo crear una adivinanza. ¡Inténtalo de nuevo!</p>`;
    }
}

// --- INICIALIZACIÓN ---
function init() {
    if (!DOMElements.mainView) {
        console.warn("La página actual no es la galería de juegos. Se omite la inicialización de juegos.");
        return;
    }
    
    const playerData = Player.getPlayerData();
    if (!playerData) {
        DOMElements.noProfileView?.classList.remove('hidden');
        DOMElements.mainView.classList.add('hidden');
        return;
    }
    DOMElements.noProfileView?.classList.add('hidden');
    DOMElements.mainView.classList.remove('hidden');
    
    updateHeaderUI();
    renderGameCards();

    DOMElements.gameGrid.addEventListener('click', (e) => {
        const button = e.target.closest('[data-game-id]');
        if (button) {
            openGameModal(button.dataset.gameId);
        }
    });

    DOMElements.backToGalleryBtn.addEventListener('click', closeGameModal);
}

// Al final del archivo, añade esto:
export {
    init,
    openGameModal,
    closeGameModal,
    showGameResult,
    handleWin,
    handleLoss,
    // Exporta las funciones de los juegos si se necesitan externamente:
    initSnakesAndLadders,
    initMinesweeper,
    // ... otros juegos que necesites exportar
};

document.addEventListener('DOMContentLoaded', init);
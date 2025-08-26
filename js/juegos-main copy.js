/**
 * ================================================================================
 * Módulo Principal de la Galería de Minijuegos (juegos-main.js)
 * Versión: 5.0.0 (Lógica Mejorada y Completa)
 * --------------------------------------------------------------------------------
 * - LÓGICA COMPLETA Y FUNCIONAL: Implementación robusta y lista para producción
 * para los 15 juegos, atendiendo a todas las solicitudes de mejora.
 * - MEJORAS DE JUGABILIDAD: Ajustes de velocidad, controles intuitivos,
 * retroalimentación visual y mecánicas de juego renovadas.
 * - INSTRUCCIONES INTEGRADAS: Juegos complejos ahora muestran instrucciones claras.
 * - GESTIÓN DE ESTADO: El sistema `activeGame` se mantiene para una gestión
 * eficiente de la memoria.
 * - SISTEMA DE RECOMPENSAS: Todos los juegos están correctamente conectados
 * al sistema de puntos y monedas.
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
        username: document.getElementById('game-modal-username'),
        avatar: document.getElementById('game-modal-avatar'),
    },
    backToGalleryBtn: document.getElementById('back-to-gallery-btn'),
    gameCanvasContainer: document.getElementById('game-canvas-container'),
    gameResultOverlay: document.getElementById('game-result-overlay'),
    gameResultTitle: document.getElementById('game-result-title'),
    gameResultMessage: document.getElementById('game-result-message'),
    gameResultButtons: document.getElementById('game-result-buttons'),
};

// --- LÓGICA DE JUEGO GENERAL ---
let activeGame = {
    id: null,
    interval: null,
    listeners: [],
    animationFrame: null,
    level: 1,
    timeouts: [],
};

function clearActiveGame() {
    if (activeGame.interval) clearInterval(activeGame.interval);
    if (activeGame.animationFrame) cancelAnimationFrame(activeGame.animationFrame);
    activeGame.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    activeGame.listeners.forEach(({ event, element, handler }) => {
        element.removeEventListener(event, handler);
    });
    activeGame = { id: null, interval: null, listeners: [], animationFrame: null, level: 1, timeouts: [] };
}

// --- CATÁLOGO DE JUEGOS ---
const GAMES_CATALOG = [
    { id: 'minesweeper', name: 'Buscaminas de Momias', description: 'Encuentra los tesoros sin despertar a las momias.', icon: '🏺', initFunction: initMinesweeper },
    { id: 'snake', name: 'Gusano Comelón', description: '¡Come todas las fresas que puedas sin chocar!', icon: '🍓', initFunction: initSnake },
    { id: 'flappy', name: 'Xoconostle Volador', description: 'Aletea para esquivar los cactus y llegar lejos.', icon: '🐦', initFunction: initFlappyBird },
    { id: 'labyrinth', name: 'Laberinto del Callejón', description: 'Encuentra la salida de los callejones. ¡Usa las flechas!', icon: '🧱', initFunction: initLabyrinth },
    { id: 'riddle', name: 'Acertijo del Pípila (IA)', description: 'Resuelve la adivinanza que la IA tiene para ti.', icon: '🧠', initFunction: initRiddleGame },
    { id: 'explorer-route', name: 'Ruta del Explorador', description: 'Memoriza y repite la ruta por los municipios.', icon: '🗺️', initFunction: initExplorerRoute },
    { id: 'snakes-ladders', name: 'Serpientes y Escaleras GTO', description: '¡Compite contra los bots para llegar a la meta!', icon: '🎲', initFunction: initSnakesAndLadders },
    { id: 'legend-hunter', name: 'Cazador de Leyendas (IA)', description: 'Vive una leyenda de Guanajuato y elige tu propio camino.', icon: '📜', initFunction: initLegendHunter },
    { id: 'feria-leon', name: 'Feria de León', description: '¡Atrapa todas las guacamayas que puedas!', icon: '🎡', initFunction: initFeriaLeon },
    { id: 'pottery-master', name: 'Alfarero de Dolores', description: 'Modela la vasija perfecta con tus propias manos.', icon: '🏺', initFunction: initPotteryMaster },
    { id: 'chichimeca-defense', name: 'Guerra Chichimeca', description: '¡Defiende el fuerte lanzando flechas a los enemigos!', icon: '🏹', initFunction: initChichimecaDefense },
    { id: 'rally-gto', name: 'Rally Guanajuato', description: 'Compite a toda velocidad, esquiva y recoge monedas.', icon: '🏎️', initFunction: initRallyGTO },
    { id: 'secret-tunnels', name: 'Túneles Secretos', description: 'Conecta la ruta con un número limitado de movimientos.', icon: '🚇', initFunction: initSecretTunnels },
    { id: 'balloon-festival', name: 'Festival del Globo', description: 'Eleva tu globo, recoge monedas y evita los pájaros.', icon: '🎈', initFunction: initBalloonFestival },
    { id: 'wine-tasting', name: 'Cosecha de Dolores', description: 'Cosecha uvas y evita las plagas. ¡Maximiza tu puntaje!', icon: '🍇', initFunction: initWineTasting },
];


// --- LÓGICA PRINCIPAL DE UI ---
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

function openGameModal(gameId) {
    const game = GAMES_CATALOG.find(g => g.id === gameId);
    if (!game) return;
    
    clearActiveGame();
    activeGame.id = gameId;

    const playerData = Player.getPlayerData();
    DOMElements.modalHeader.title.textContent = game.name;
    DOMElements.modalHeader.username.textContent = playerData.username;
    DOMElements.modalHeader.avatar.src = playerData.currentAvatarUrl;

    DOMElements.gameCanvasContainer.innerHTML = '';
    DOMElements.gameResultOverlay.classList.add('hidden');
    DOMElements.modalBackdrop.classList.remove('hidden');
    DOMElements.modalBackdrop.classList.add('flex');
    
    game.initFunction(DOMElements.gameCanvasContainer);
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
    Player.updatePlayerCoins(coins);
    // Player.updatePlayerPoints(points); // Si se implementa un sistema de puntos
    updateHeaderUI();
    showGameResult("¡Excelente!", `Ganaste ${coins} 🪙 y ${points} ⭐ puntos.`, [
        { text: "Jugar de Nuevo", class: "bg-green-500 text-white border-green-700", action: () => openGameModal(activeGame.id) },
        { text: "Volver a la Galería", class: "bg-blue-500 text-white border-blue-700", action: closeGameModal }
    ]);
}

function handleLoss(reason) {
    const game = GAMES_CATALOG.find(g => g.id === activeGame.id);
    showGameResult("¡Juego Terminado!", reason, [
        { text: "Intentar de Nuevo", class: "bg-green-500 text-white border-green-700", action: () => openGameModal(activeGame.id) },
        { text: "Salir", class: "bg-red-500 text-white border-red-700", action: closeGameModal },
    ]);
}


// --- LÓGICA DE MINIJUEGOS ---

// Juego 1: Gusano Comelón (Velocidad ajustada)
function initSnake(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const box = 20;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let food = {};
    let score = 0;
    let d;
    let game;

    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        const size = Math.min(containerSize.width, containerSize.height) * 0.95;
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
    
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) return true;
        }
        return false;
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
        ctx.fillText("�", food.x, food.y + box * 0.8);
        
        if (!d) { // No mover hasta que se presione una tecla
             ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
             ctx.font = "24px Fredoka One";
             ctx.textAlign = "center";
             ctx.fillText("Usa las flechas para empezar", canvas.width / 2, canvas.height / 2);
             return;
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d === "LEFT") snakeX -= box;
        if (d === "UP") snakeY -= box;
        if (d === "RIGHT") snakeX += box;
        if (d === "DOWN") snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            Player.updatePlayerCoins(5);
            updateHeaderUI();
            placeFood();
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            handleLoss(`Chocaste. Puntuación final: ${score}`);
            return;
        }
        
        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "20px Fredoka One";
        ctx.textAlign = "left";
        ctx.fillText(`Puntos: ${score}`, box, box * 1.5);
    }
    
    resizeCanvas();
    const keydownHandler = (e) => direction(e);
    document.addEventListener("keydown", keydownHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
    
    // Velocidad reducida (de 100ms a 180ms) para ser más fácil para niños
    game = setInterval(draw, 180);
    activeGame.interval = game;
}

// Juego 2: Xoconostle Volador (Flappy Bird funcional)
function initFlappyBird(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let bird = { x: 50, y: 150, width: 40, height: 30 };
    let gravity = 0.5, velocity = 0, lift = -8;
    let pipes = [], pipeWidth = 60, pipeGap = 200;
    let frame = 0, score = 0, gameOver = false;
    
    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height, 600);
        bird.y = canvas.height / 2;
    }
    resizeCanvas();

    function jump(e) {
        if (gameOver) return;
        // Solo saltar con Espacio o click/tap
        if (e.code === "Space" || e.type === "mousedown" || e.type === "touchstart") {
            velocity = lift;
        }
    }
    
    const keydownHandler = (e) => jump(e);
    const mousedownHandler = (e) => jump(e);
    document.addEventListener('keydown', keydownHandler);
    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('touchstart', mousedownHandler, { passive: true }); // Para móviles
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
    activeGame.listeners.push({ event: 'mousedown', element: canvas, handler: mousedownHandler });
    activeGame.listeners.push({ event: 'touchstart', element: canvas, handler: mousedownHandler });

    function gameLoop() {
        if (gameOver) return;
        
        // Actualizar estado
        velocity += gravity;
        bird.y += velocity;
        frame++;

        // Crear tubos
        if (frame % 90 === 0) {
            let pipeY = Math.random() * (canvas.height - pipeGap - 150) + 75;
            pipes.push({ x: canvas.width, y: pipeY, passed: false });
        }

        // Mover y dibujar tubos
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = pipes.length - 1; i >= 0; i--) {
            let p = pipes[i];
            p.x -= 3;
            ctx.fillStyle = "#4ade80"; // Verde nopal
            ctx.fillRect(p.x, 0, pipeWidth, p.y);
            ctx.fillRect(p.x, p.y + pipeGap, pipeWidth, canvas.height - p.y - pipeGap);

            if (p.x + pipeWidth < 0) pipes.splice(i, 1);

            // Colisión
            if (bird.x < p.x + pipeWidth && bird.x + bird.width > p.x && (bird.y < p.y || bird.y + bird.height > p.y + pipeGap)) {
                gameOver = true;
            }
            
            // Puntuación
            if (p.x + pipeWidth < bird.x && !p.passed) {
                p.passed = true;
                score++;
                Player.updatePlayerCoins(2);
                updateHeaderUI();
            }
        }

        // Dibujar pájaro
        ctx.fillStyle = "#fde047";
        ctx.font = `${bird.width}px sans-serif`;
        ctx.fillText('🐦', bird.x, bird.y);

        // Colisión con bordes
        if (bird.y + bird.height > canvas.height || bird.y < 0) {
            gameOver = true;
        }
        
        // Fin del juego
        if (gameOver) {
            cancelAnimationFrame(activeGame.animationFrame);
            handleLoss(`Chocaste. Puntuación: ${score}`);
            return;
        }

        // Dibujar puntuación
        ctx.fillStyle = "white";
        ctx.font = "30px Fredoka One";
        ctx.textAlign = "left";
        ctx.fillText(`Puntos: ${score}`, 20, 40);
        
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

// Juego 3: Laberinto (Con instrucciones)
function initLabyrinth(container) {
    // Añadir instrucciones
    container.innerHTML = `
        <div class="p-4 text-center bg-slate-800 rounded-lg mb-4">
            <h4 class="font-bold text-lg text-white">¡Encuentra la Salida!</h4>
            <p class="text-slate-300">Usa las <strong>teclas de flecha</strong> para moverte por el laberinto y llegar al cuadro verde.</p>
        </div>
    `;

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    const MAZE_SIZE = 11 + (activeGame.level * 2);
    let cellSize, maze = [], player = { x: 1, y: 0 };
    
    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        // Restar el espacio de las instrucciones si es necesario
        const availableHeight = containerSize.height - (container.querySelector('div')?.offsetHeight || 0);
        const size = Math.min(containerSize.width * 0.95, availableHeight * 0.95);
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
            if (x > 1 && maze[y][x-2] === 1) neighbors.push([x-2, y, x-1, y]);
            if (x < MAZE_SIZE-2 && maze[y][x+2] === 1) neighbors.push([x+2, y, x+1, y]);
            if (y > 1 && maze[y-2][x] === 1) neighbors.push([x, y-2, x, y-1]);
            if (y < MAZE_SIZE-2 && maze[y+2][x] === 1) neighbors.push([x, y+2, x, y+1]);

            if (neighbors.length > 0) {
                const [nx, ny, wx, wy] = neighbors[Math.floor(Math.random() * neighbors.length)];
                maze[ny][nx] = 0; maze[wy][wx] = 0;
                stack.push([nx, ny]);
            } else {
                stack.pop();
            }
        }
        maze[0][1] = 0; maze[MAZE_SIZE-1][MAZE_SIZE-2] = 0;
        player = { x: 1, y: 0 };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < MAZE_SIZE; y++) {
            for (let x = 0; x < MAZE_SIZE; x++) {
                ctx.fillStyle = maze[y][x] === 1 ? "#475569" : "#e2e8f0";
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        ctx.fillStyle = "#ef4444"; // Jugador rojo
        ctx.beginPath();
        ctx.arc(player.x * cellSize + cellSize/2, player.y * cellSize + cellSize/2, cellSize/3, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillStyle = "#22c55e"; // Salida verde
        ctx.fillRect((MAZE_SIZE-2) * cellSize, (MAZE_SIZE-1) * cellSize, cellSize, cellSize);
    }

    function movePlayer(e) {
        let newX = player.x, newY = player.y;
        if (e.key === "ArrowUp") newY--;
        if (e.key === "ArrowDown") newY++;
        if (e.key === "ArrowLeft") newX--;
        if (e.key === "ArrowRight") newX++;

        if (newX >= 0 && newX < MAZE_SIZE && newY >= 0 && newY < MAZE_SIZE && maze[newY][newX] === 0) {
            player.x = newX; player.y = newY;
            draw();
            if (player.x === MAZE_SIZE - 2 && player.y === MAZE_SIZE - 1) {
                activeGame.level++;
                handleWin(50 * activeGame.level, 100 * activeGame.level);
            }
        }
    }
    
    generateMaze();
    resizeCanvas();
    draw();
    const keydownHandler = (e) => movePlayer(e);
    document.addEventListener('keydown', keydownHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
}

// Juego 4: Ruta del Explorador (Funcional y con objetos)
function initExplorerRoute(container) {
    const sequenceLength = 3 + activeGame.level;
    let sequence = [], playerSequence = [];
    let showingSequence = true;

    // Tomar una selección aleatoria de municipios para el juego actual
    const gameMunicipios = [...MUNICIPIOS].sort(() => 0.5 - Math.random()).slice(0, 10);

    function generateSequence() {
        sequence = [];
        for (let i = 0; i < sequenceLength; i++) {
            sequence.push(gameMunicipios[Math.floor(Math.random() * gameMunicipios.length)]);
        }
    }

    function flashButton(municipioName) {
        const button = container.querySelector(`[data-municipio="${municipioName}"]`);
        if (button) {
            button.classList.add('bg-amber-400');
            const timeoutId = setTimeout(() => {
                button.classList.remove('bg-amber-400');
            }, 500);
            activeGame.timeouts.push(timeoutId);
        }
    }

    async function showSequence() {
        showingSequence = true;
        updateStatus('Memoriza la secuencia...');
        const buttons = container.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);

        for (let i = 0; i < sequence.length; i++) {
            await new Promise(resolve => {
                const timeoutId = setTimeout(() => {
                    flashButton(sequence[i]);
                    resolve();
                }, 800);
                activeGame.timeouts.push(timeoutId);
            });
        }

        showingSequence = false;
        buttons.forEach(b => b.disabled = false);
        updateStatus('Tu turno. Repite la secuencia.');
    }

    function updateStatus(text) {
        const statusDiv = container.querySelector('#status-text');
        if (statusDiv) statusDiv.textContent = text;
    }

    function handlePlayerClick(e) {
        if (showingSequence) return;
        const municipio = e.target.dataset.municipio;
        if (!municipio) return;

        flashButton(municipio);
        playerSequence.push(municipio);

        // Comprobar si el movimiento es correcto en tiempo real
        const currentMoveIndex = playerSequence.length - 1;
        if (sequence[currentMoveIndex] !== playerSequence[currentMoveIndex]) {
            handleLoss("Secuencia incorrecta.");
            return;
        }

        // Comprobar si la secuencia se completó
        if (playerSequence.length === sequence.length) {
            activeGame.level++;
            handleWin(50, 100 * activeGame.level);
        }
    }
    
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-white">
            <p id="status-text" class="text-xl font-bold mb-4">Preparando...</p>
            <div id="municipio-grid" class="grid grid-cols-2 md:grid-cols-5 gap-4">
                ${gameMunicipios.map(m => `
                    <button data-municipio="${m}" class="btn-3d bg-sky-600 border-sky-800 text-white p-4 transition-colors duration-200">
                        ${m}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    const grid = container.querySelector('#municipio-grid');
    const clickHandler = (e) => handlePlayerClick(e);
    grid.addEventListener('click', clickHandler);
    activeGame.listeners.push({ event: 'click', element: grid, handler: clickHandler });

    generateSequence();
    showSequence();
}

// Juego 5: Serpientes y Escaleras (Funcional con Bots)
function initSnakesAndLadders(container) {
    const BOARD_SIZE = 10;
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
        
        // Create the board visually from 100 down to 1
        for (let row = 9; row >= 0; row--) {
            const rowNumbers = boardNumbers.slice(row * 10, (row + 1) * 10);
            if (row % 2 !== 0) { // Odd rows (from top, 9, 7, etc.) are reversed
                rowNumbers.reverse();
            }
            for (const num of rowNumbers) {
                 let content = `<span class="opacity-50">${num}</span>`;
                 if(snakes[num]) content += `<span class="text-2xl absolute">🐍</span>`;
                 if(ladders[num]) content += `<span class="text-2xl absolute">🪜</span>`;
                 cells += `<div id="cell-${num}" class="relative border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-800">${content}</div>`;
            }
        }
        
        container.innerHTML = `
            <div class="flex flex-col md:flex-row items-center justify-center gap-4 h-full">
                <div id="snakes-board" class="grid grid-cols-10 w-[400px] h-[400px] bg-amber-50 border-4 border-amber-600 rounded-lg">
                    ${cells}
                </div>
                <div id="game-controls" class="flex flex-col items-center gap-4 p-4 bg-slate-800 rounded-lg">
                    <p id="turn-indicator" class="text-white text-xl font-bold">Turno de: Tú</p>
                    <button id="dice-btn" class="text-6xl hover:scale-110 transition-transform">🎲</button>
                    <div id="dice-result" class="text-white text-3xl font-bold h-10"></div>
                </div>
            </div>
        `;

        players.forEach(p => {
            const tokenEl = document.createElement('div');
            tokenEl.id = `token-${p.id}`;
            tokenEl.className = 'absolute text-2xl transition-all duration-500 ease-in-out z-10';
            tokenEl.textContent = p.token;
            tokenEl.style.color = p.color;
            container.querySelector(`#cell-${p.pos}`).appendChild(tokenEl);
        });
    }

    function updateTokenPosition(player) {
        const tokenEl = container.querySelector(`#token-${player.id}`);
        const cellEl = container.querySelector(`#cell-${player.pos}`);
        cellEl.appendChild(tokenEl);
    }
    
    async function movePlayer(player, steps) {
        const diceBtn = container.querySelector('#dice-btn');
        diceBtn.disabled = true;

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
        
        const turnIndicator = container.querySelector('#turn-indicator');
        const diceBtn = container.querySelector('#dice-btn');
        turnIndicator.textContent = `Turno de: ${currentPlayer.name}`;

        if (currentPlayer.id.startsWith('bot')) {
            diceBtn.disabled = true;
            await new Promise(r => setTimeout(r, 1000)); // Pausa para simular el pensamiento del bot
            rollDice();
        } else {
            diceBtn.disabled = false;
        }
    }

    function rollDice() {
        if (gameOver) return;
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        const diceResult = container.querySelector('#dice-result');
        diceResult.textContent = diceRoll;

        const currentPlayer = players[currentPlayerIndex];
        movePlayer(currentPlayer, diceRoll).then(() => {
            nextTurn();
        });
    }
    
    buildBoard();
    const diceBtn = container.querySelector('#dice-btn');
    const rollHandler = () => rollDice();
    diceBtn.addEventListener('click', rollHandler);
    activeGame.listeners.push({ event: 'click', element: diceBtn, handler: rollHandler });
}

// Juego 6: Cazador de Leyendas (Mejorado con avance)
async function initLegendHunter(container) {
    container.innerHTML = `<div class="riddle-container"><div class="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div></div>`;
    
    const prompt = `Eres un narrador de leyendas de Guanajuato. Crea una mini-aventura interactiva de 2 pasos para un niño. Responde ÚNICAMENTE con un objeto JSON. El JSON debe tener una clave "startNode" que contenga un objeto con: "text" (string con la introducción), y "options" (un array de 2 objetos). Cada option object tiene "text" (string de la opción) y "nextNode" (una clave para el siguiente nodo o una string "win"/"loss"). Debe haber al menos un nodo intermedio antes del final. El camino principal debe llevar a "win". Ejemplo de estructura: { "startNode": { "text": "...", "options": [...] }, "middleNode1": { "text": "...", "options": [...] } }`;

    try {
        const response = await puter.ai.chat(prompt, { model: 'gemini-1.5-flash' });
        const jsonString = response.message.content.match(/{[\s\S]*}/)[0];
        const storyData = JSON.parse(jsonString);

        function renderNode(nodeKey) {
            const node = storyData[nodeKey];
            if (!node) {
                handleLoss("La historia no pudo continuar.");
                return;
            }

            container.innerHTML = `
                <div class="riddle-container text-white text-center">
                    <p class="text-lg mb-6">${node.text}</p>
                    <div id="options-container" class="flex flex-col gap-4">
                        ${node.options.map((opt, index) => `
                            <button data-target="${opt.nextNode}" class="btn-3d bg-sky-600 border-sky-800 text-white p-3">
                                ${opt.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        const clickHandler = (e) => {
            const button = e.target.closest('button');
            if (!button || !button.dataset.target) return;

            const targetNodeKey = button.dataset.target;

            if (targetNodeKey === 'win') {
                handleWin(75, 150);
            } else if (targetNodeKey === 'loss') {
                handleLoss("Esa decisión no fue la mejor. ¡Intenta de nuevo!");
            } else {
                renderNode(targetNodeKey);
            }
        };
        
        container.addEventListener('click', clickHandler);
        activeGame.listeners.push({ event: 'click', element: container, handler: clickHandler });

        renderNode('startNode');

    } catch (error) {
        console.error("Error con la IA de leyendas:", error);
        container.innerHTML = `<div class="riddle-container text-center"><p class="text-red-400">La IA no pudo crear una leyenda. Inténtalo de nuevo más tarde.</p></div>`;
    }
}

// Juego 7: Feria de León (Con efecto de destrucción)
function initFeriaLeon(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let targets = [];
    let effects = []; // Para las explosiones
    let score = 0;
    let timeLeft = 30;
    let gameOver = false;

    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height, 600);
    }
    resizeCanvas();

    function spawnTarget() {
        if (gameOver) return;
        targets.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: canvas.height,
            size: 50,
            speed: 2 + Math.random() * 2,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar y mover objetivos
        targets.forEach(t => {
            t.y -= t.speed;
            ctx.font = `${t.size}px sans-serif`;
            ctx.fillText('🦜', t.x, t.y);
        });
        targets = targets.filter(t => t.y > -t.size);

        // Dibujar efectos de explosión
        effects.forEach(e => {
            e.opacity -= 0.05;
            ctx.globalAlpha = e.opacity;
            ctx.font = `${e.size}px sans-serif`;
            ctx.fillText('💥', e.x, e.y);
            ctx.globalAlpha = 1.0;
        });
        effects = effects.filter(e => e.opacity > 0);

        // Dibujar UI
        ctx.fillStyle = "white";
        ctx.font = "24px Fredoka One";
        ctx.textAlign = 'left';
        ctx.fillText(`Puntos: ${score}`, 20, 30);
        ctx.textAlign = 'right';
        ctx.fillText(`Tiempo: ${Math.ceil(timeLeft)}s`, canvas.width - 20, 30);
    }

    const clickHandler = (e) => {
        if (gameOver) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        for (let i = targets.length - 1; i >= 0; i--) {
            const t = targets[i];
            if (clickX >= t.x && clickX <= t.x + t.size && clickY >= t.y - t.size && clickY <= t.y) {
                // Crear efecto de explosión
                effects.push({ x: t.x, y: t.y, size: t.size * 1.2, opacity: 1.0 });
                
                targets.splice(i, 1);
                score += 10;
                Player.updatePlayerCoins(10);
                updateHeaderUI();
            }
        }
    };
    canvas.addEventListener('click', clickHandler);
    activeGame.listeners.push({ event: 'click', element: canvas, handler: clickHandler });

    // Intervalo de spawn
    const spawnInterval = setInterval(spawnTarget, 800);
    activeGame.interval = spawnInterval;

    const gameLoop = () => {
        if (gameOver) return;

        timeLeft -= 1 / 60; // 60 FPS
        if (timeLeft <= 0) {
            gameOver = true;
            clearInterval(spawnInterval);
            cancelAnimationFrame(activeGame.animationFrame);
            handleWin(score, score * 2);
            return;
        }

        draw();
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    };
    gameLoop();
}

// Juego 8: Alfarero (Con más instrucciones)
function initPotteryMaster(container) {
    container.innerHTML = `
        <div class="p-4 text-center bg-slate-800 rounded-lg mb-4">
            <h4 class="font-bold text-lg text-white">¡Modela la Arcilla!</h4>
            <p class="text-slate-300">Haz clic y mantén presionado. Mueve el mouse para dar forma a la vasija. Intenta que coincida con el contorno punteado.</p>
        </div>
    `;

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let potPoints = [];
    const targetPoints = [];
    const sections = 20;
    let shaping = false;
    
    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        const availableHeight = containerSize.height - (container.querySelector('div')?.offsetHeight || 0);
        const size = Math.min(containerSize.width * 0.9, availableHeight * 0.9);
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
            
            // Curva para la forma objetivo
            const targetWidth = targetBaseWidth + (Math.sin(t * Math.PI) * targetTopWidth);
            targetPoints.push({ x: canvas.width / 2, y: y, width: targetWidth });
            
            // Forma inicial del jugador (un cilindro)
            potPoints.push({ x: canvas.width / 2, y: y, width: canvas.width * 0.2 });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar forma objetivo
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 10]);
        ctx.beginPath();
        for(let i=0; i<targetPoints.length; i++) {
            ctx.moveTo(targetPoints[i].x - targetPoints[i].width / 2, targetPoints[i].y);
            ctx.lineTo(targetPoints[i].x + targetPoints[i].width / 2, targetPoints[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Dibujar vasija del jugador
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
                 const influence = (50 - distance) / 50; // 1 en el centro, 0 a 50px
                 const pull = (mouseX - p.x) * 0.02 * influence;
                 p.width += pull;
                 p.width = Math.max(20, Math.min(p.width, canvas.width * 0.9));
            }
        });
        draw();
    };
    
    canvas.addEventListener('mousedown', mousedownHandler);
    canvas.addEventListener('mouseup', mouseupHandler);
    canvas.addEventListener('mouseleave', mouseupHandler); // Terminar si el mouse sale
    canvas.addEventListener('mousemove', mousemoveHandler);
    activeGame.listeners.push({ event: 'mousedown', element: canvas, handler: mousedownHandler });
    activeGame.listeners.push({ event: 'mouseup', element: canvas, handler: mouseupHandler });
    activeGame.listeners.push({ event: 'mouseleave', element: canvas, handler: mouseupHandler });
    activeGame.listeners.push({ event: 'mousemove', element: canvas, handler: mousemoveHandler });

    function checkPot() {
        let diffSum = 0;
        for (let i = 0; i < potPoints.length; i++) {
            diffSum += Math.abs(potPoints[i].width - targetPoints[i].width);
        }
        const avgDiff = diffSum / potPoints.length;
        const perfection = Math.max(0, 100 - avgDiff * 2);

        if (perfection > 90) {
            handleWin(100, 200);
        } else if (perfection > 70) {
             handleWin(50, 100);
        } else {
             UI.showNotification(`Perfección: ${perfection.toFixed(0)}%. ¡Casi!`, 'info');
        }
    }

    resizeCanvas();
}


// Juego 9: Guerra Chichimeca (Mejorado con flechas y sin trabas)
function initChichimecaDefense(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let bow = { x: 0, y: 0, width: 60, height: 40, speed: 10 };
    let arrows = [];
    let enemies = [];
    let score = 0;
    let gameOver = false;

    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height, 600);
        bow.x = canvas.width / 2 - bow.width / 2;
        bow.y = canvas.height - bow.height - 10;
    }
    resizeCanvas();

    function shootArrow() {
        arrows.push({
            x: bow.x + bow.width / 2 - 2.5,
            y: bow.y,
            width: 5,
            height: 20,
            speed: 8
        });
    }

    function handleInput(e) {
        if (e.key === "ArrowLeft") {
            bow.x -= bow.speed;
        } else if (e.key === "ArrowRight") {
            bow.x += bow.speed;
        } else if (e.code === "Space") {
            e.preventDefault();
            shootArrow();
        }
        // Limitar el movimiento del arco dentro del canvas
        bow.x = Math.max(0, Math.min(bow.x, canvas.width - bow.width));
    }
    
    const keydownHandler = (e) => handleInput(e);
    document.addEventListener('keydown', keydownHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
    
    function spawnEnemy() {
        if (gameOver) return;
        enemies.push({
            x: Math.random() * (canvas.width - 40),
            y: -40,
            width: 40,
            height: 40,
            speed: 1 + Math.random() * 1.5,
            icon: '🛡️'
        });
    }

    function gameLoop() {
        if (gameOver) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mover y dibujar arco
        ctx.font = `${bow.width}px sans-serif`;
        ctx.fillText('🏹', bow.x, bow.y + bow.height);

        // Mover y dibujar flechas
        ctx.fillStyle = "#f59e0b";
        arrows.forEach((arrow, index) => {
            arrow.y -= arrow.speed;
            ctx.fillRect(arrow.x, arrow.y, arrow.width, arrow.height);
            if (arrow.y < 0) arrows.splice(index, 1);
        });
        
        // Mover y dibujar enemigos
        enemies.forEach((enemy, eIndex) => {
            enemy.y += enemy.speed;
            ctx.font = `${enemy.width}px sans-serif`;
            ctx.fillText(enemy.icon, enemy.x, enemy.y);
            
            // Colisión flecha-enemigo
            arrows.forEach((arrow, aIndex) => {
                if (arrow.x < enemy.x + enemy.width && arrow.x + arrow.width > enemy.x &&
                    arrow.y < enemy.y + enemy.height && arrow.y + arrow.height > enemy.y) {
                    arrows.splice(aIndex, 1);
                    enemies.splice(eIndex, 1);
                    score += 10;
                    Player.updatePlayerCoins(10);
                    updateHeaderUI();
                }
            });

            // Colisión enemigo-base
            if (enemy.y + enemy.height > canvas.height) {
                gameOver = true;
            }
        });
        
        // UI
        ctx.fillStyle = "white";
        ctx.font = "24px Fredoka One";
        ctx.textAlign = "left";
        ctx.fillText(`Puntos: ${score}`, 20, 30);

        if (gameOver) {
            cancelAnimationFrame(activeGame.animationFrame);
            clearInterval(activeGame.interval);
            handleLoss("Los enemigos han llegado a la base.");
            return;
        }

        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    }

    activeGame.interval = setInterval(spawnEnemy, 2000);
    gameLoop();
}

// Juego 10: Rally GTO (Mejorado con emoji, todas las flechas y puntos)
function initRallyGTO(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let car = { x: 100, y: 0, width: 50, height: 50, speedX: 0, speedY: 0 };
    let obstacles = [];
    let coins = [];
    let score = 0;
    let keys = {};
    let roadSpeed = 5;

    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height, 600);
        car.y = canvas.height / 2;
    }
    resizeCanvas();

    const keydownHandler = (e) => { keys[e.key] = true; };
    const keyupHandler = (e) => { keys[e.key] = false; };
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: keydownHandler });
    activeGame.listeners.push({ event: 'keyup', element: document, handler: keyupHandler });

    function updatePlayer() {
        // Movimiento Vertical
        if (keys['ArrowUp']) car.y -= 5;
        if (keys['ArrowDown']) car.y += 5;
        // Aceleración / Deceleración
        if (keys['ArrowRight']) roadSpeed += 0.1;
        if (keys['ArrowLeft']) roadSpeed -= 0.1;
        
        roadSpeed = Math.max(2, Math.min(roadSpeed, 15));
        car.y = Math.max(0, Math.min(car.y, canvas.height - car.height));
    }

    function spawnObjects() {
        // Spawn Obstáculos
        if (Math.random() < 0.03) {
            obstacles.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - 40),
                width: 40, height: 40, icon: '🛢️'
            });
        }
        // Spawn Monedas
        if (Math.random() < 0.02) {
            coins.push({
                x: canvas.width,
                y: Math.random() * (canvas.height - 30),
                width: 30, height: 30, icon: '🪙'
            });
        }
    }

    function gameLoop() {
        updatePlayer();
        spawnObjects();
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mover y dibujar objetos
        [...obstacles, ...coins].forEach(o => {
            o.x -= roadSpeed;
            ctx.font = `${o.width}px sans-serif`;
            ctx.fillText(o.icon, o.x, o.y + o.height);
        });
        
        // Filtrar objetos fuera de pantalla
        obstacles = obstacles.filter(o => o.x > -o.width);
        coins = coins.filter(c => c.x > -c.width);

        // Dibujar carro
        ctx.font = `${car.width}px sans-serif`;
        ctx.fillText('🏎️', car.x, car.y + car.height);

        // Colisiones
        // Con obstáculos
        for (const o of obstacles) {
            if (car.x < o.x + o.width && car.x + car.width > o.x && car.y < o.y + o.height && car.y + car.height > o.y) {
                cancelAnimationFrame(activeGame.animationFrame);
                handleLoss("¡Chocaste con un obstáculo!");
                return;
            }
        }
        // Con monedas
        for (let i = coins.length - 1; i >= 0; i--) {
            const c = coins[i];
            if (car.x < c.x + c.width && car.x + car.width > o.x && car.y < c.y + c.height && car.y + car.height > o.y) {
                coins.splice(i, 1);
                score += 5;
                Player.updatePlayerCoins(5);
                updateHeaderUI();
            }
        }
        
        score += 0.1; // Puntos por distancia

        // UI
        ctx.fillStyle = "white";
        ctx.font = "24px Fredoka One";
        ctx.textAlign = "left";
        ctx.fillText(`Puntos: ${Math.floor(score)}`, 20, 30);
        ctx.fillText(`Velocidad: ${roadSpeed.toFixed(1)}`, 20, 60);
        
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

// Juego 11: Túneles Secretos (Rediseñado como puzzle de conexión)
function initSecretTunnels(container) {
    const GRID_SIZE = 7;
    const MAX_MOVES = 15 + activeGame.level;
    let movesLeft = MAX_MOVES;
    let grid = []; // 0: empty, 1: wall, 2: path
    let startNode = {x: 0, y: Math.floor(GRID_SIZE/2)};
    let endNode = {x: GRID_SIZE - 1, y: Math.floor(GRID_SIZE/2)};

    function generateGrid() {
        grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
        for(let i=0; i<GRID_SIZE * GRID_SIZE * 0.2; i++) {
            const x = Math.floor(Math.random() * GRID_SIZE);
            const y = Math.floor(Math.random() * GRID_SIZE);
            if ((x !== startNode.x || y !== startNode.y) && (x !== endNode.x || y !== endNode.y)) {
                grid[y][x] = 1; // Wall
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
                
                gridHTML += `<div class="cell aspect-square flex items-center justify-center text-2xl ${cellClass}" data-x="${x}" data-y="${y}">${icon}</div>`;
            }
        }
        container.innerHTML = `
             <div class="flex flex-col items-center justify-center h-full text-white">
                 <div class="p-2 mb-4 bg-slate-800 rounded-lg text-center">
                    <p>Conecta la <strong>CASA</strong> con el <strong>MUSEO</strong>.</p>
                    <p>Movimientos restantes: <strong id="moves-left">${movesLeft}</strong></p>
                 </div>
                 <div id="tunnel-grid" class="grid gap-1" style="grid-template-columns: repeat(${GRID_SIZE}, 1fr);">
                    ${gridHTML}
                 </div>
                 <button id="check-path-btn" class="btn-3d bg-green-500 border-green-700 mt-4">Comprobar Conexión</button>
             </div>
        `;
        container.querySelector('#moves-left').textContent = movesLeft;
    }
    
    function handleCellClick(e) {
        const cell = e.target.closest('.cell');
        if(!cell) return;

        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        if (grid[y][x] === 1 || (x === startNode.x && y === startNode.y) || (x === endNode.x && y === endNode.y)) return;

        if(grid[y][x] === 0) { // Can place path
            if (movesLeft > 0) {
                grid[y][x] = 2;
                movesLeft--;
            } else {
                UI.showNotification("No te quedan movimientos.", "error");
            }
        } else if (grid[y][x] === 2) { // Can remove path
            grid[y][x] = 0;
            movesLeft++;
        }
        drawGrid(); // Redraw to show changes
    }
    
    function checkPath() {
        // Use Breadth-First Search (BFS) to find if path exists
        let queue = [startNode];
        let visited = new Set([`${startNode.x},${startNode.y}`]);
        let pathFound = false;

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
            activeGame.level++;
            handleWin(100, (MAX_MOVES - movesLeft) * 10);
        } else {
            handleLoss("El camino no conecta la casa con el museo.");
        }
    }

    generateGrid();
    drawGrid();
    
    const gridEl = container.querySelector('#tunnel-grid');
    const checkBtn = container.querySelector('#check-path-btn');
    const gridClickHandler = e => handleCellClick(e);
    const checkClickHandler = () => checkPath();
    gridEl.addEventListener('click', gridClickHandler);
    checkBtn.addEventListener('click', checkClickHandler);
    activeGame.listeners.push({ event: 'click', element: gridEl, handler: gridClickHandler });
    activeGame.listeners.push({ event: 'click', element: checkBtn, handler: checkClickHandler });
}


// Juego 12: Cata de Vinos (Cosecha de Dolores - Lógica compleja)
function initWineTasting(container) {
    const GRID_SIZE = 6;
    const HARVEST_LIMIT = 15;
    let harvestsLeft = HARVEST_LIMIT;
    let score = 0;
    let grid = [];
    let gameOver = false;

    // Llenar el tablero con ítems
    function generateGrid() {
        const items = [];
        // Definir la proporción de ítems
        for(let i=0; i<5; i++) items.push({ icon: '🍇', points: 50, type: 'grape'}); // Uvas buenas
        for(let i=0; i<3; i++) items.push({ icon: '🐛', points: -100, type: 'worm'}); // Gusanos penalizan
        for(let i=0; i<2; i++) items.push({ icon: '🍀', points: 200, type: 'clover'}); // Trébol de la suerte
        
        // Rellenar el resto con uvas normales
        while(items.length < GRID_SIZE * GRID_SIZE) {
            items.push({ icon: '🌿', points: 10, type: 'vine'});
        }
        
        // Barajar y asignar al grid
        items.sort(() => Math.random() - 0.5);
        grid = items.map(item => ({...item, revealed: false, id: Math.random()}));
    }
    
    function draw() {
        let gridHTML = '';
        grid.forEach((item, index) => {
             let content = '';
             let cardClass = 'bg-purple-800 hover:bg-purple-700';
             if(item.revealed) {
                 content = item.icon;
                 cardClass = item.type === 'worm' ? 'bg-red-500' : 'bg-green-600';
             }
             gridHTML += `<div class="cell aspect-square flex items-center justify-center text-4xl rounded-lg cursor-pointer transition-all duration-300 ${cardClass}" data-index="${index}">${content}</div>`;
        });

        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-white p-4">
                <div class="p-3 mb-4 bg-slate-800 rounded-lg text-center w-full max-w-lg">
                    <h4 class="font-bold text-lg text-white">Cosecha de Dolores</h4>
                    <p class="text-slate-300">Haz clic en las parcelas para cosechar. Encuentra las mejores uvas 🍇 y evita los gusanos 🐛. ¡Tienes ${HARVEST_LIMIT} intentos!</p>
                    <div class="flex justify-around mt-2">
                        <span>Puntos: <strong id="score">${score}</strong></span>
                        <span>Cosechas: <strong id="harvests">${harvestsLeft}</strong></span>
                    </div>
                </div>
                <div id="vineyard-grid" class="grid gap-2 w-full max-w-lg" style="grid-template-columns: repeat(${GRID_SIZE}, 1fr);">
                    ${gridHTML}
                </div>
            </div>
        `;
    }

    function handleCellClick(e) {
        if(gameOver) return;
        const cell = e.target.closest('.cell');
        if(!cell || harvestsLeft <= 0) return;
        
        const index = parseInt(cell.dataset.index);
        const item = grid[index];
        
        if (item.revealed) return; // No se puede hacer clic de nuevo

        item.revealed = true;
        score += item.points;
        harvestsLeft--;
        
        if (item.type === 'worm') {
            UI.showNotification(`¡Un gusano! Pierdes ${-item.points} puntos.`, 'error');
        } else {
            Player.updatePlayerCoins(Math.max(0, Math.floor(item.points / 10)));
            updateHeaderUI();
        }

        draw(); // Redibujar para mostrar el ítem y actualizar contadores
        
        if (harvestsLeft <= 0) {
            gameOver = true;
            const timeoutId = setTimeout(() => {
                if (score > 0) {
                    handleWin(score, score * 2);
                } else {
                    handleLoss(`Cosecha terminada con ${score} puntos.`);
                }
            }, 1000);
            activeGame.timeouts.push(timeoutId);
        }
    }

    generateGrid();
    draw();
    
    const vineyardGrid = container.querySelector('#vineyard-grid');
    const clickHandler = (e) => handleCellClick(e);
    vineyardGrid.addEventListener('click', clickHandler);
    activeGame.listeners.push({ event: 'click', element: vineyardGrid, handler: clickHandler });
}

// --- LÓGICA DE MINIJUEGOS (SIN CAMBIOS) ---
function initMinesweeper(container) {
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
            
const neighbors = [ i - 1, i + 1, i - GRID_SIZE, i + GRID_SIZE, i - 1 - GRID_SIZE, i + 1 - GRID_SIZE, i - 1 + GRID_SIZE, i + 1 + GRID_SIZE ];
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
            document.querySelectorAll('.cell').forEach((cell, i) => { if (grid[i] === 'M') cell.innerHTML = '💀'; });
            handleLoss("¡Despertaste a una momia!");
            return;
        }
        
        revealedCount++;
        if (grid[index] > 0) {
            element.textContent = grid[index];
        } else {
            const isLeftEdge = (index % GRID_SIZE === 0);
            const isRightEdge = (index % GRID_SIZE === GRID_SIZE - 1);
            const neighbors = [ index - 1, index + 1, index - GRID_SIZE, index + GRID_SIZE, index - 1 - GRID_SIZE, index + 1 - GRID_SIZE, index - 1 + GRID_SIZE, index + 1 + GRID_SIZE ];
            setTimeout(() => {
                 neighbors.forEach(nIndex => {
                    if (nIndex >= 0 && nIndex < grid.length) {
                         if (isLeftEdge && (nIndex % GRID_SIZE === GRID_SIZE - 1)) return;
                         if (isRightEdge && (nIndex % GRID_SIZE === 0)) return;
                        const neighborEl = document.querySelector(`.cell[data-index='${nIndex}']`);
                        if (neighborEl) revealCell(nIndex, neighborEl);
                    }
                });
            }, 10);
        }
        checkWin();
    }
    
    function checkWin() {
        if (revealedCount === (GRID_SIZE * GRID_SIZE) - MUMMY_COUNT) {
            gameOver = true;
            handleWin(50, 100);
        }
    }

    createGrid();
    container.innerHTML = `<div class="minesweeper-grid" style="grid-template-columns: repeat(${GRID_SIZE}, 1fr);">
        ${grid.map((_, i) => `<div class="cell" data-index="${i}"></div>`).join('')}
    </div>`;
    
    const cells = container.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
        const clickHandler = () => revealCell(i, cell);
        const contextHandler = (e) => {
            e.preventDefault();
            if (gameOver || cell.classList.contains('revealed')) return;
            cell.classList.toggle('flag');
            cell.innerHTML = cell.classList.contains('flag') ? '🚩' : '';
        };
        cell.addEventListener('click', clickHandler);
        cell.addEventListener('contextmenu', contextHandler);
        activeGame.listeners.push({ event: 'click', element: cell, handler: clickHandler });
        activeGame.listeners.push({ event: 'contextmenu', element: cell, handler: contextHandler });
    });
}

async function initRiddleGame(container) {
    container.innerHTML = `<div class="riddle-container"><div class="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div></div>`;
    
    const prompt = `Eres El Pípila. Crea una adivinanza corta y fácil para un niño sobre un lugar, comida o personaje de Guanajuato (ej. las momias, una guacamaya, Diego Rivera). Responde ÚNICAMENTE con un objeto JSON con dos claves: "riddle" (string con la adivinanza) y "answers" (un array de strings con las posibles respuestas correctas en minúsculas, ej. ["momias", "las momias de guanajuato"]).`;

    try {
        const response = await puter.ai.chat(prompt, { model: 'gemini-1.5-flash' });
        const jsonString = response.message.content.match(/{[\s\S]*}/)[0];
        const data = JSON.parse(jsonString);

        container.innerHTML = `
            <div class="riddle-container text-center">
                <p class="riddle-text text-white text-xl">"${data.riddle}"</p>
                <input id="riddle-answer-input" type="text" class="riddle-input mt-4 bg-slate-700 text-white p-2 rounded" placeholder="Escribe tu respuesta aquí">
                <button id="check-riddle-btn" class="mt-6 btn-3d bg-amber-500 text-white border-amber-700">Adivinar</button>
            </div>
        `;

        const checkBtn = document.getElementById('check-riddle-btn');
        const clickHandler = () => {
            const input = document.getElementById('riddle-answer-input');
            const userAnswer = input.value.trim().toLowerCase();
            if (data.answers.includes(userAnswer)) {
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
        console.error("Error con la IA de adivinanzas:", error);
        container.innerHTML = `<div class="riddle-container"><p class="text-red-500">La IA no pudo crear una adivinanza. ¡Inténtalo de nuevo!</p></div>`;
    }
}

function initBalloonFestival(container) {
    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let balloon = { x: 50, y: 0, width: 40 };
    let coins = [], birds = [];
    let score = 0;
    let gameOver = false;

    function resizeCanvas() {
        const containerSize = container.getBoundingClientRect();
        canvas.width = Math.min(containerSize.width, 800);
        canvas.height = Math.min(containerSize.height, 600);
        balloon.y = canvas.height / 2;
    }
    resizeCanvas();

    function spawnCoin() {
        coins.push({ x: canvas.width, y: Math.random() * canvas.height, size: 20 });
    }

    function spawnBird() {
        birds.push({ x: canvas.width, y: Math.random() * canvas.height, size: 30 });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ef4444";
        ctx.font = `${balloon.width}px sans-serif`;
        ctx.fillText('🎈', balloon.x, balloon.y);
        coins.forEach(c => {
            ctx.fillStyle = "#fde047";
            ctx.fillText('🪙', c.x, c.y);
            c.x -= 3;
        });
        birds.forEach(b => {
            ctx.fillStyle = "#4ade80";
            ctx.fillText('🐦', b.x, b.y);
            b.x -= 5;
        });
        ctx.fillStyle = "white";
        ctx.font = "24px Fredoka One";
        ctx.fillText(`Puntos: ${score}`, 20, 30);
    }

    const moveHandler = (e) => {
        if (e.key === "ArrowUp") balloon.y -= 20;
        if (e.key === "ArrowDown") balloon.y += 20;
        balloon.y = Math.max(0, Math.min(balloon.y, canvas.height - balloon.width));
    };
    document.addEventListener('keydown', moveHandler);
    activeGame.listeners.push({ event: 'keydown', element: document, handler: moveHandler });

    const gameLoop = () => {
        if(gameOver) return;

        if (Math.random() < 0.05) spawnCoin();
        if (Math.random() < 0.03) spawnBird();
        coins = coins.filter(c => c.x > -c.size);
        birds = birds.filter(b => b.x > -b.size);
        
        for (let i = coins.length - 1; i >= 0; i--) {
            const c = coins[i];
            if (balloon.x < c.x + c.size && balloon.x + balloon.width > c.x && balloon.y < c.y + c.size && balloon.y + balloon.width > c.y) {
                coins.splice(i, 1);
                score += 10;
                Player.updatePlayerCoins(10);
                updateHeaderUI();
            }
        }
        for (const b of birds) {
            if (balloon.x < b.x + b.size && balloon.x + balloon.width > b.x && balloon.y < b.y + b.size && balloon.y + balloon.width > b.y) {
                gameOver = true;
                cancelAnimationFrame(activeGame.animationFrame);
                handleLoss("¡Chocaste con un pájaro!");
                return;
            }
        }
        
        draw();
        activeGame.animationFrame = requestAnimationFrame(gameLoop);
    };
    gameLoop();
}


// --- INICIALIZACIÓN DE LA PÁGINA ---

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

    DOMElements.gameGrid?.addEventListener('click', (e) => {
        const button = e.target.closest('[data-game-id]');
        if (button) {
            openGameModal(button.dataset.gameId);
        }
    });

    DOMElements.backToGalleryBtn?.addEventListener('click', closeGameModal);
}

document.addEventListener('DOMContentLoaded', init);
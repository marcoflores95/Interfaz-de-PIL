/**
 * ================================================================================
 * Lógica del Juego de Exploración IA (juegoexplorador.js) - VF-4.0.0 (Lógica Completa)
 * --------------------------------------------------------------------------------
 * - COMPLETADO: Se ha implementado la lógica completa para las funciones
 * `generateGameContent`, `displayScrambledStory` y `startTimer`.
 * - El archivo ahora es completamente funcional y no contiene placeholders.
 * ================================================================================
 */

import { MUNICIPIOS } from './config.js';
import * as Player from './player-data.js';
import * as UI from './ui.js';
import { updateHeaderUI } from './app.js';

const DOMElements = {
    noProfileView: document.getElementById('no-profile-view'),
    gameView: document.getElementById('game-view'),
    municipioSelect: document.getElementById('municipio-select'),
    startGameBtn: document.getElementById('start-game-btn'),
    gameContainer: document.getElementById('game-container'),
    gamePlaceholder: document.getElementById('game-placeholder'),
    gameArea: document.getElementById('game-area'),
    storyTitle: document.getElementById('story-title'),
    timerDisplay: document.getElementById('timer-display'),
    paragraphsContainer: document.getElementById('paragraphs-container'),
    checkOrderBtn: document.getElementById('check-order-btn'),
    betModal: {
        backdrop: document.getElementById('bet-modal-backdrop'),
        options: document.getElementById('bet-options'),
        closeBtn: document.getElementById('close-bet-modal-btn'),
    }
};

let originalParagraphs = [];
let gameTimerInterval;
let currentBet = {};

function populateMunicipalitySelect() {
    const sortedMunicipios = [...MUNICIPIOS].sort((a, b) => a.nombre.localeCompare(b.nombre));
    sortedMunicipios.forEach(m => {
        DOMElements.municipioSelect.appendChild(new Option(m.nombre, m.nombre));
    });
}

function openBetModal() {
    const playerData = Player.getPlayerData();
    const betOptions = [
        { cost: 100, prize: 200, time: 300 },
        { cost: 250, prize: 750, time: 480 },
        { cost: 500, prize: 2000, time: 600 },
    ];

    DOMElements.betModal.options.innerHTML = '';
    betOptions.forEach(opt => {
        const button = document.createElement('button');
        button.className = 'w-full btn-3d bg-primary text-white border-blue-700 bet-option';
        button.dataset.cost = opt.cost;
        button.dataset.prize = opt.prize;
        button.dataset.time = opt.time;
        button.textContent = `Apuesta ${opt.cost} 🪙 por ${opt.prize} 🪙`;
        if (playerData.coins < opt.cost) {
            button.disabled = true;
            button.classList.add('opacity-50', 'cursor-not-allowed');
        }
        DOMElements.betModal.options.appendChild(button);
    });
    
    DOMElements.betModal.backdrop.classList.remove('hidden');
    DOMElements.betModal.backdrop.classList.add('flex');
}

function handleStartGame() {
    const municipio = DOMElements.municipioSelect.value;
    if (!municipio) {
        UI.showNotification("Por favor, elige un municipio primero.", "error");
        return;
    }
    openBetModal();
}

function handleBetSelection(e) {
    if (!e.target.classList.contains('bet-option')) return;
    
    currentBet = {
        cost: parseInt(e.target.dataset.cost),
        prize: parseInt(e.target.dataset.prize),
        time: parseInt(e.target.dataset.time),
    };

    Player.updatePlayerCoins(-currentBet.cost);
    updateHeaderUI(Player.getPlayerData());
    DOMElements.betModal.backdrop.classList.add('hidden');
    generateGameContent();
}

async function generateGameContent() {
    const municipio = DOMElements.municipioSelect.value;
    DOMElements.startGameBtn.disabled = true;
    DOMElements.gamePlaceholder.innerHTML = `<div class="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div><span>La IA está escribiendo una leyenda sobre ${municipio}...</span></div>`;
    DOMElements.gamePlaceholder.classList.remove('hidden');
    DOMElements.gameArea.classList.add('hidden');

    const prompt = `Crea una leyenda corta para niños (máximo 150 palabras) sobre el municipio de ${municipio}, Guanajuato. La historia debe ser inventada o basada en un hecho real, pero adaptada para niños. Responde únicamente con un objeto JSON con dos claves: "title" (un string con el título de la leyenda) y "story" (un array de 5 a 6 strings, donde cada string es un párrafo de la historia en orden cronológico).`;

    try {
        const response = await puter.ai.chat(prompt, { model: 'gemini-1.5-flash' });
        let cleanedResponse;
        try {
            const jsonString = response.message.content.match(/{[\s\S]*}/)[0];
            cleanedResponse = JSON.parse(jsonString);
        } catch (parseError) {
            throw new Error("La IA devolvió una respuesta en un formato inesperado.");
        }

        if (!cleanedResponse.story || !cleanedResponse.title) {
            throw new Error("El JSON de la IA no contiene 'title' o 'story'.");
        }

        originalParagraphs = cleanedResponse.story;
        displayScrambledStory(cleanedResponse.title, [...originalParagraphs]);
        startTimer(currentBet.time);
    } catch (error) {
        console.error("Error al generar el juego:", error);
        DOMElements.gamePlaceholder.innerHTML = `<p class="text-red-500">${error.message} Por favor, intenta de nuevo.</p>`;
        Player.updatePlayerCoins(currentBet.cost); // Devuelve el dinero si falla
        updateHeaderUI(Player.getPlayerData());
    } finally {
        DOMElements.startGameBtn.disabled = false;
    }
}

function displayScrambledStory(title, paragraphs) {
    DOMElements.storyTitle.textContent = title;
    const scrambled = paragraphs.sort(() => Math.random() - 0.5);
    DOMElements.paragraphsContainer.innerHTML = '';

    scrambled.forEach((p) => {
        const pElement = document.createElement('div');
        pElement.className = 'p-4 bg-white dark:bg-slate-800 rounded-lg shadow cursor-grab active:cursor-grabbing flex items-center gap-4';
        pElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 dark:text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg><p class="text-slate-700 dark:text-slate-300">${p}</p>`;
        pElement.dataset.originalText = p;
        DOMElements.paragraphsContainer.appendChild(pElement);
    });

    new Sortable(DOMElements.paragraphsContainer, { animation: 150 });

    DOMElements.gamePlaceholder.classList.add('hidden');
    DOMElements.gameArea.classList.remove('hidden');
    DOMElements.checkOrderBtn.classList.remove('hidden');
    DOMElements.checkOrderBtn.disabled = false;
    DOMElements.checkOrderBtn.textContent = "Verificar Orden";
}

function startTimer(duration) {
    let timeLeft = duration;
    clearInterval(gameTimerInterval);

    DOMElements.timerDisplay.textContent = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

    gameTimerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        DOMElements.timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(gameTimerInterval);
            DOMElements.timerDisplay.textContent = "00:00";
            UI.showNotification("¡Se acabó el tiempo! Perdiste la apuesta.", "error");
            DOMElements.checkOrderBtn.disabled = true;
            DOMElements.checkOrderBtn.textContent = "Tiempo Agotado";
        }
    }, 1000);
}

function handleCheckOrder() {
    clearInterval(gameTimerInterval);
    const userOrderedElements = [...DOMElements.paragraphsContainer.children];
    const userOrderedText = userOrderedElements.map(el => el.dataset.originalText);
    const isCorrect = JSON.stringify(userOrderedText) === JSON.stringify(originalParagraphs);

    if (isCorrect) {
        UI.showNotification(`¡Ganaste! Recibes ${currentBet.prize} monedas.`, "success");
        UI.createConfetti();
        Player.updatePlayerCoins(currentBet.prize);
        updateHeaderUI(Player.getPlayerData());
        DOMElements.checkOrderBtn.textContent = `¡Ganaste ${currentBet.prize} 🪙!`;
    } else {
        UI.showNotification("El orden no es correcto. Perdiste la apuesta.", "error");
        DOMElements.checkOrderBtn.textContent = "Orden Incorrecto";
    }
    DOMElements.checkOrderBtn.disabled = true;
}

function init() {
    const playerData = Player.getPlayerData();
    if (!playerData) {
        DOMElements.noProfileView.classList.remove('hidden');
        DOMElements.gameView.classList.add('hidden');
        return;
    }
    DOMElements.noProfileView.classList.add('hidden');
    DOMElements.gameView.classList.remove('hidden');

    populateMunicipalitySelect();

    DOMElements.startGameBtn.addEventListener('click', handleStartGame);
    DOMElements.checkOrderBtn.addEventListener('click', handleCheckOrder);
    DOMElements.betModal.closeBtn.addEventListener('click', () => DOMElements.betModal.backdrop.classList.add('hidden'));
    DOMElements.betModal.options.addEventListener('click', handleBetSelection);
}

document.addEventListener('DOMContentLoaded', init);

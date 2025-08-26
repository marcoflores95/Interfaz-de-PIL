/**
 * ================================================================================
 * Módulo Principal de Municipios (municipios-main.js) - v7 (Corregido y Mejorado)
 * --------------------------------------------------------------------------------
 * - CORREGIDO: El script ahora funciona con la estructura HTML original del usuario.
 * - AÑADIDO: Lógica para el menú de perfil y el botón de tema oscuro/claro.
 * - MANTENIDO: Integración del botón "Trivia de IA" en la selección de juegos.
 * ================================================================================
 */

import { MUNICIPIOS, JUEGOS } from './config.js';
import * as Player from './player-data.js';
import * as UI from './ui.js';
import * as Game from './game-logic.js';

const DOMElements = {
    noProfileView: document.getElementById('no-profile-view'),
    municipiosView: document.getElementById('municipios-view'),
    header: {
        coinsDisplay: document.getElementById('coins-display'),
        pointsDisplay: document.getElementById('points-display'),
        playerAvatar: document.getElementById('player-avatar'),
        profileMenuBtn: document.getElementById('profile-menu-button'),
        profileDropdown: document.getElementById('profile-dropdown'),
        //themeToggleBtn: document.getElementById('theme-toggle-btn'),
    },
    municipalitySelect: document.getElementById('municipality-select'),
    infoPanel: {
        container: document.getElementById('info-panel'),
        placeholder: document.getElementById('info-placeholder'),
        content: document.getElementById('info-content'),
        image: document.getElementById('municipio-image'),
        name: document.getElementById('municipio-name'),
        description: document.getElementById('municipio-description'),
        factsCarousel: document.getElementById('facts-carousel'),
        verMasBtn: document.getElementById('ver-mas-btn'),
    },
    gamePanel: {
        container: document.getElementById('game-panel'),
        placeholder: document.getElementById('game-placeholder'),
        content: document.getElementById('game-content'),
    },
    modal: {
        backdrop: document.getElementById('modal-backdrop'),
        infoCompleta: document.getElementById('modal-info-completa'),
        fullInfoTitle: document.getElementById('full-info-title'),
        fullInfoContent: document.getElementById('full-info-content'),
    }
};

let currentMunicipioId = null;
let factCarouselInterval = null;

function updatePlayerStats(playerData) {
    if (!playerData) return;
    DOMElements.header.coinsDisplay.textContent = playerData.coins;
    DOMElements.header.pointsDisplay.textContent = playerData.points;
    DOMElements.header.playerAvatar.src = playerData.currentAvatarUrl;
    document.getElementById('player-stats')?.classList.remove('hidden');
    document.getElementById('profile-menu-container')?.classList.remove('hidden');
}

function applyTheme(theme) {
    const sun = document.getElementById('theme-icon-sun');
    const moon = document.getElementById('theme-icon-moon');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        sun?.classList.add('hidden');
        moon?.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sun?.classList.remove('hidden');
        moon?.classList.add('hidden');
    }
}

function populateMunicipalitySelect() {
    const select = DOMElements.municipalitySelect;
    if (!select) return;
    const sortedMunicipios = [...MUNICIPIOS].sort((a, b) => a.nombre.localeCompare(b.nombre));
    sortedMunicipios.forEach(m => {
        select.appendChild(new Option(m.nombre, m.id));
    });
}

function displayMunicipioInfo(municipio) {
    if (!municipio) return;
    currentMunicipioId = municipio.id;
    
    const panel = DOMElements.infoPanel;
    panel.placeholder.classList.add('hidden');
    panel.content.classList.remove('hidden');
    panel.container.classList.remove('opacity-0');

    panel.image.src = municipio.imagen;
    panel.name.textContent = municipio.nombre;
    panel.description.textContent = municipio.descripcion;
    
    setupFactCarousel(municipio.datos);
}

function setupFactCarousel(facts) {
    if (factCarouselInterval) clearInterval(factCarouselInterval);
    const carousel = DOMElements.infoPanel.factsCarousel;
    if (!carousel) return;
    carousel.innerHTML = '';
    
    if (!facts || facts.length === 0) return;

    facts.forEach((fact, index) => {
        const slide = document.createElement('div');
        slide.className = 'absolute w-full h-full p-2 text-center flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-lg transition-opacity duration-500 ease-in-out';
        slide.style.opacity = index === 0 ? '1' : '0';
        slide.textContent = fact.replace(/::/g, ': ');
        carousel.appendChild(slide);
    });

    let currentFact = 0;
    const slides = carousel.children;
    if (slides.length > 1) {
        factCarouselInterval = setInterval(() => {
            slides[currentFact].style.opacity = '0';
            currentFact = (currentFact + 1) % slides.length;
            slides[currentFact].style.opacity = '1';
        }, 4000);
    }
}

function displayMunicipioGames(municipioId) {
    const panel = DOMElements.gamePanel;
    if (!panel.container || !panel.content) return;
    
    panel.placeholder.classList.add('hidden');
    panel.container.classList.remove('opacity-0');
    panel.content.classList.remove('hidden');
    panel.content.innerHTML = '';

    const gamesForMunicipio = JUEGOS[municipioId] || [];
    const allGameTypes = ['trivia', 'rellenar', 'memorama', 'adivina', 'sopa', 'puzzle', 'gato'];
    
    const gameButtonsContainer = document.createElement('div');
    gameButtonsContainer.className = 'text-center';
    gameButtonsContainer.innerHTML = `<h3 class="font-title text-2xl text-slate-700 dark:text-slate-200 mb-4">Juegos Disponibles</h3>`;
    
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'flex flex-wrap justify-center gap-4';

    allGameTypes.forEach((type, index) => {
        const gameData = gamesForMunicipio.find(g => g.type === type);
        if (!gameData && type !== 'gato') return;

        const gameId = `${municipioId}_${type}_${index}`;
        const button = document.createElement('button');
        button.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        button.className = 'btn-3d interactive-cursor bg-amber-500 text-white border-amber-700 px-6 py-3';
        button.onclick = () => launchGame({ type, ...gameData }, gameId);
        buttonsWrapper.appendChild(button);
    });
    
    const aiTriviaButton = document.createElement('button');
    aiTriviaButton.textContent = 'Trivia de IA';
    aiTriviaButton.className = 'btn-3d interactive-cursor bg-teal-500 text-white border-teal-700 px-6 py-3';
    
    aiTriviaButton.onclick = () => {
        const municipio = MUNICIPIOS.find(m => m.id == municipioId);
        if (!municipio) return;

        const gameArea = prepareGameArea(`Desafío IA: ${municipio.nombre}`, municipioId);

        const onWin = () => {
            const rewards = Player.completeGame(`ia_trivia_${municipioId}_${Date.now()}`);
            UI.showNotification(`¡Ganaste! +${rewards.points} pts, +${rewards.coins} monedas`, 'success');
            updatePlayerStats(Player.getPlayerData());
            setTimeout(() => displayMunicipioGames(municipioId), 2000);
        };

        Game.launchAITriviaGame(municipio.nombre, gameArea, onWin);
    };

    buttonsWrapper.appendChild(aiTriviaButton);
    
    gameButtonsContainer.appendChild(buttonsWrapper);
    panel.content.appendChild(gameButtonsContainer);
}

function prepareGameArea(title, municipioId) {
    DOMElements.gamePanel.content.innerHTML = '';
    const gameContainer = document.createElement('div');
    gameContainer.className = 'h-full w-full flex flex-col';
    
    const gameHeader = document.createElement('div');
    gameHeader.className = 'flex justify-between items-center mb-2';
    gameHeader.innerHTML = `<h3 class="font-title text-xl text-slate-700 dark:text-slate-200">${title}</h3><button id="quit-game-btn" class="btn-3d interactive-cursor bg-red-500 text-white border-red-700 px-4 py-1 text-xs">Salir</button>`;
    
    const gameArea = document.createElement('div');
    gameArea.className = 'flex-grow relative bg-slate-100 dark:bg-slate-800 p-4 rounded-lg';

    gameContainer.appendChild(gameHeader);
    gameContainer.appendChild(gameArea);
    DOMElements.gamePanel.content.appendChild(gameContainer);

    gameHeader.querySelector('#quit-game-btn').addEventListener('click', () => {
        displayMunicipioGames(municipioId);
    });
    
    return gameArea;
}

function launchGame(game, gameId) {
    const [municipioId] = gameId.split('_');
    const gameArea = prepareGameArea(`Juego: ${game.type}`, municipioId);

    const onGameWin = () => {
        const rewards = Player.completeGame(gameId);
        UI.showNotification(`¡Ganaste! +${rewards.points} pts, +${rewards.coins} monedas`, 'success');
        UI.createConfetti();
        updatePlayerStats(Player.getPlayerData());
        setTimeout(() => displayMunicipioGames(municipioId), 2000);
    };

    switch (game.type) {
        case 'trivia': Game.renderTrivia(game.data, gameArea, onGameWin); break;
        case 'rellenar': Game.renderRellenar(game.data, game.answers, gameArea, onGameWin); break;
        case 'memorama': Game.renderMemorama(game.data, gameArea, onGameWin); break;
        case 'adivina': Game.renderAdivina(game.data, game.answers, gameArea, onGameWin); break;
        case 'sopa': Game.renderSopa(game.data, gameArea, onGameWin); break;
        case 'puzzle': Game.renderPuzzle(game.data, gameArea, onGameWin); break;
        case 'gato': Game.renderGato(gameArea, onGameWin); break;
    }
}

function showFullInfoModal() {
    if (!currentMunicipioId) return;
    const municipio = MUNICIPIOS.find(m => m.id == currentMunicipioId);
    if (!municipio || !municipio.fullInfo) return;

    DOMElements.modal.fullInfoTitle.textContent = municipio.nombre;
    DOMElements.modal.fullInfoContent.innerHTML = `
        <p class="text-lg text-slate-600 dark:text-slate-300 mb-6">${municipio.fullInfo.text}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${municipio.fullInfo.images.map(img => `<img src="${img}" class="w-full h-auto rounded-lg shadow-md">`).join('')}
        </div>
    `;
    UI.openModal(DOMElements.modal.infoCompleta);
}

function main() {
    const playerData = Player.getPlayerData();
    if (!playerData) {
        DOMElements.noProfileView?.classList.remove('hidden');
        DOMElements.municipiosView?.classList.add('hidden');
        return;
    }

    DOMElements.noProfileView?.classList.add('hidden');
    DOMElements.municipiosView?.classList.remove('hidden');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    updatePlayerStats(playerData);
    populateMunicipalitySelect();

    DOMElements.municipalitySelect?.addEventListener('change', (e) => {
        const municipioId = e.target.value;
        if (municipioId) {
            const municipio = MUNICIPIOS.find(m => m.id == municipioId);
            displayMunicipioInfo(municipio);
            displayMunicipioGames(municipioId);
        }
    });
    
    DOMElements.header.themeToggleBtn?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        applyTheme(isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    DOMElements.header.profileMenuBtn?.addEventListener('click', () => {
        DOMElements.header.profileDropdown?.classList.toggle('hidden');
    });

    DOMElements.infoPanel.verMasBtn.addEventListener('click', showFullInfoModal);
    
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal-btn')) {
            UI.closeModal();
        }
    });
    
    DOMElements.modal.backdrop?.addEventListener('click', (e) => {
        if (e.target === DOMElements.modal.backdrop) {
            UI.closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', main);

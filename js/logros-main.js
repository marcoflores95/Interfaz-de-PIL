/**
 * ================================================================================
 * Módulo Principal de Logros (logros-main.js) - v3.0.0 (Producción)
 * --------------------------------------------------------------------------------
 * - CORREGIDO: El error `TypeError` al acceder a `municipioProgress` en perfiles
 * nuevos ha sido solucionado validando la existencia del progreso.
 * - COMPLETO: Lógica final y robusta para renderizar la tarjeta de perfil y la
 * cuadrícula de medallas.
 * ================================================================================
 */

import { MUNICIPIOS, AVATARS } from './config.js';
import * as Player from './player-data.js';
import './app.js'; // Importar para que gestione el header y el tema

const DOMElements = {
    noProfileView: document.getElementById('no-profile-view'),
    achievementsView: document.getElementById('achievements-view'),
    playerAvatar: document.getElementById('player-avatar'),
    playerName: document.getElementById('player-name'),
    playerInfo: document.getElementById('player-info'),
    playerCoins: document.getElementById('player-coins'),
    playerPoints: document.getElementById('player-points'),
    medalsGrid: document.getElementById('medals-grid'),
};

function renderProfileCard(playerData) {
    DOMElements.playerAvatar.src = playerData.currentAvatarUrl || 'https://placehold.co/128x128/cccccc/ffffff?text=?';
    DOMElements.playerAvatar.alt = `Avatar de ${playerData.username}`;
    DOMElements.playerName.textContent = playerData.username;
    DOMElements.playerInfo.textContent = `Rol: ${playerData.role} · Edad: ${playerData.age} · De: ${playerData.municipality}`;
    DOMElements.playerCoins.textContent = playerData.coins;

    // Calcular el total de puntos sumando los scores de cada municipio
    const totalPoints = Object.values(playerData.municipioProgress || {}).reduce((sum, progress) => sum + (progress.score || 0), 0);
    DOMElements.playerPoints.textContent = totalPoints;
}

function getMedalInfo(score) {
    if (score >= 10000) return { tier: 'Diamante', color: 'bg-cyan-400', textColor: 'text-cyan-800', emoji: '💎' };
    if (score >= 1000) return { tier: 'Oro', color: 'bg-amber-400', textColor: 'text-amber-800', emoji: '🏆' };
    if (score >= 500) return { tier: 'Plata', color: 'bg-slate-400', textColor: 'text-slate-800', emoji: '🥈' };
    if (score >= 100) return { tier: 'Bronce', color: 'bg-orange-400', textColor: 'text-orange-800', emoji: '🥉' };
    return { tier: 'Sin Medalla', color: 'bg-slate-200 dark:bg-slate-700', textColor: 'text-slate-500 dark:text-slate-400', emoji: '❔' };
}

function renderMedalsGrid(playerData) {
    DOMElements.medalsGrid.innerHTML = '';

    MUNICIPIOS.forEach(municipio => {
        // [CORRECCIÓN] Se comprueba de forma segura si existe el progreso y el score.
        const score = playerData.municipioProgress?.[municipio.id]?.score || 0;
        const medalInfo = getMedalInfo(score);

        const medalCard = document.createElement('div');
        medalCard.className = `p-2 rounded-lg flex flex-col items-center text-center transition-all duration-300 bg-white dark:bg-slate-800 shadow-md`;
        
        const medalIcon = `
            <div class="w-16 h-16 rounded-full flex items-center justify-center ${medalInfo.color}">
                <span class="text-4xl transform transition-transform">${medalInfo.emoji}</span>
            </div>
        `;
        
        const scoreDisplay = `<span class="font-bold text-xs ${medalInfo.textColor}">⭐ ${score} pts</span>`;

        medalCard.innerHTML = `
            ${medalIcon}
            <span class="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">${municipio.nombre}</span>
            ${scoreDisplay}
        `;
        
        DOMElements.medalsGrid.appendChild(medalCard);
    });
}

function main() {
    const playerData = Player.getPlayerData();
    if (!playerData) {
        DOMElements.noProfileView?.classList.remove('hidden');
        DOMElements.achievementsView?.classList.add('hidden');
        return;
    }

    DOMElements.noProfileView?.classList.add('hidden');
    DOMElements.achievementsView?.classList.remove('hidden');

    renderProfileCard(playerData);
    renderMedalsGrid(playerData);
}

document.addEventListener('DOMContentLoaded', main);

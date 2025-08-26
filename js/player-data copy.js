/**
 * ================================================================================
 * Módulo de Datos del Jugador (player-data.js) - v7.0.0 (Lógica de Monedas Restaurada)
 * --------------------------------------------------------------------------------
 * - CORREGIDO: Se reintrodujo la función `updatePlayerCoins` para manejar
 * transacciones relativas (sumar/restar monedas), solucionando el error crítico
 * en el juego de exploración.
 * - MEJORADO: Se creó la función `unlockAvatar` que centraliza la lógica de
 * compra de un avatar, incluyendo la verificación de fondos y la transacción.
 * - MANTENIDO: El límite de 100 avatares generados y la función `assignCoinsToProfile`.
 * ================================================================================
 */

import { AVATARS } from './config.js';

const PROFILES_KEY = 'guanajuatoKidsProfiles_v6'; // Versión actualizada
const ACTIVE_PROFILE_KEY = 'guanajuatoKidsActiveProfile';

// --- Funciones Base de Perfiles (sin cambios) ---

export function getAllProfiles() {
    const data = localStorage.getItem(PROFILES_KEY);
    return data ? JSON.parse(data) : {};
}

function saveAllProfiles(profiles) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function getActiveProfileId() {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function setActiveProfile(profileId) {
    localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
}

export function getPlayerData() {
    const activeId = getActiveProfileId();
    if (!activeId) return null;
    const allProfiles = getAllProfiles();
    return allProfiles[activeId] || null;
}

export function savePlayerData(playerData) {
    const activeId = getActiveProfileId();
    if (!activeId || !playerData) return;
    let allProfiles = getAllProfiles();
    allProfiles[activeId] = playerData;
    saveAllProfiles(allProfiles);
}

// --- Gestión de Jugadores (sin cambios) ---

export function createNewPlayer(username, role, options = {}) {
    const allProfiles = getAllProfiles();
    const profileId = `user_${Date.now()}`;
    const initialAvatar = AVATARS[options.gender === 'girl' ? 1 : 0];
    const newProfile = {
        id: profileId,
        username,
        role,
        coins: 100,
        currentAvatarId: initialAvatar.id,
        currentAvatarUrl: initialAvatar.url,
        unlockedAvatars: [AVATARS[0].id, AVATARS[1].id],
        generatedAvatars: [],
        createdAt: new Date().toISOString()
    };
    allProfiles[profileId] = newProfile;
    saveAllProfiles(allProfiles);
    setActiveProfile(profileId);
    return newProfile;
}

export function deletePlayerProfile(profileId) {
    const idToDelete = profileId || getActiveProfileId();
    if (!idToDelete) return;
    let allProfiles = getAllProfiles();
    delete allProfiles[idToDelete];
    saveAllProfiles(allProfiles);
    if (idToDelete === getActiveProfileId()) {
        localStorage.removeItem(ACTIVE_PROFILE_KEY);
    }
}

// --- Funciones de Monedas y Avatares (CORREGIDAS Y MEJORADAS) ---

/**
 * [RESTAURADA] Actualiza las monedas del jugador actual sumando o restando una cantidad.
 * @param {number} amount - La cantidad a añadir (puede ser negativa para restar).
 * @returns {number|null} - La nueva cantidad de monedas o null si no hay jugador.
 */
export function updatePlayerCoins(amount) {
    const player = getPlayerData();
    if (player) {
        player.coins = (player.coins || 0) + amount;
        savePlayerData(player);
        return player.coins;
    }
    return null;
}

/**
 * [NUEVA] Desbloquea un avatar para el jugador si tiene suficientes monedas.
 * @param {string} avatarId - El ID del avatar a comprar.
 * @returns {boolean} - True si la compra fue exitosa, false en caso contrario.
 */
export function unlockAvatar(avatarId) {
    const player = getPlayerData();
    const avatarData = AVATARS.find(a => a.id === avatarId);

    if (!player || !avatarData) return false;
    if (player.unlockedAvatars.includes(avatarId)) return true; // Ya lo tiene
    
    if (player.coins >= avatarData.cost) {
        updatePlayerCoins(-avatarData.cost); // Resta las monedas
        player.unlockedAvatars.push(avatarId);
        savePlayerData(player); // Guarda los cambios en la lista de avatares
        return true;
    }
    
    return false; // No tiene suficientes monedas
}


export function assignCoinsToProfile(profileId, amount) {
    if (!profileId || typeof amount !== 'number' || amount < 0) {
        console.error("Argumentos inválidos para assignCoinsToProfile");
        return false;
    }
    const allProfiles = getAllProfiles();
    if (allProfiles[profileId]) {
        allProfiles[profileId].coins = amount;
        saveAllProfiles(allProfiles);
        return true;
    }
    return false;
}

export function setCurrentAvatar(avatarId, avatarUrl = null) {
    const player = getPlayerData();
    if (player) {
        player.currentAvatarId = avatarId;
        player.currentAvatarUrl = avatarUrl || AVATARS.find(a => a.id === avatarId)?.url;
        savePlayerData(player);
    }
}

export function addGeneratedAvatar(url, prompt) {
    const player = getPlayerData();
    if (!player) return;
    if (!player.generatedAvatars) {
        player.generatedAvatars = [];
    }
    player.generatedAvatars.push({ url, prompt });
    if (player.generatedAvatars.length > 100) {
        player.generatedAvatars.shift();
    }
    savePlayerData(player);
}

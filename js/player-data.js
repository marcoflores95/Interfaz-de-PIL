/**
 * ================================================================================
 * Módulo de Datos del Jugador (player-data.js) - v13.0.0 (Lógica Completa)
 * --------------------------------------------------------------------------------
 * - [NUEVO] Se añade la función `addGeneratedAvatar` requerida por `tienda-main.js`
 * para guardar los avatares creados con IA.
 * - [NUEVO] Se añade la función `updateChatCredits` requerida por `asistente-logic.js`.
 * - [ACLARADO] La función `deletePlayerProfile` ha sido revisada y comentada para
 * dejar claro que SOLO elimina el perfil del `localStorage` y no interactúa
 * con SharePoint, solucionando la preocupación del punto 1.
 * - [COMPLETO] El módulo ahora contiene toda la lógica necesaria para los demás
 * componentes de la aplicación.
 * ================================================================================
 */

import { AVATARS } from './config.js';
import * as UI from './ui.js';

const PROFILES_KEY = 'guanajuatoKidsProfiles_v10';
const ACTIVE_PROFILE_KEY = 'guanajuatoKidsActiveProfile';
const MAX_PROFILES = 10;

// --- Funciones Principales de Perfiles ---

export function getAllProfiles() {
    const data = localStorage.getItem(PROFILES_KEY);
    return data ? JSON.parse(data) : {};
}

function saveAllProfiles(profiles) {
    try {
        localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch (error) {
        console.error("Error al guardar perfiles:", error);
        UI.showNotification("Error: El almacenamiento está lleno.", "error");
    }
}

export function getActiveProfileId() { return localStorage.getItem(ACTIVE_PROFILE_KEY); }
export function setActiveProfile(profileId) { localStorage.setItem(ACTIVE_PROFILE_KEY, profileId); }

export function getPlayerData() {
    const activeId = getActiveProfileId();
    if (!activeId) return null;
    const profiles = getAllProfiles();
    return profiles[activeId] || null;
}

export function savePlayerData(playerData) {
    const activeId = getActiveProfileId();
    if (!activeId || !playerData) return;
    let allProfiles = getAllProfiles();
    allProfiles[activeId] = playerData;
    saveAllProfiles(allProfiles);
}

export function createNewPlayer(username, role, options = {}) {
    const allProfiles = getAllProfiles();
    if (Object.keys(allProfiles).length >= MAX_PROFILES) {
        UI.showNotification(`Límite de ${MAX_PROFILES} perfiles alcanzado.`, "error");
        return null;
    }
    const profileId = `user_${Date.now()}`;
    const initialAvatar = AVATARS.find(a => a.id === (options.gender === 'girl' ? 'avatar_02' : 'avatar_01')) || AVATARS[0];
    
    const newProfile = {
        id: profileId,
        username,
        role,
        coins: 100,
        chatCredits: 0, // Inicia con 0 créditos de chat
        currentAvatarId: initialAvatar.id,
        currentAvatarUrl: initialAvatar.url,
        unlockedAvatars: [AVATARS[0].id, AVATARS[1].id],
        generatedAvatars: [],
        municipioProgress: {},
        sharepointSynced: options.synced || false, 
        registrationData: {
            gender: options.gender,
            age: options.age,
            municipality: options.municipality,
        },
        createdAt: new Date().toISOString()
    };
    allProfiles[profileId] = newProfile;
    saveAllProfiles(allProfiles);
    setActiveProfile(profileId);
    return newProfile;
}

/**
 * [ACLARACIÓN] Borra un perfil de jugador ÚNICAMENTE del almacenamiento local (localStorage).
 * Esta función NO realiza ninguna llamada a SharePoint.
 * @param {string|null} profileId - El ID del perfil a borrar. Si es null, borra el perfil activo.
 */
export function deletePlayerProfile(profileId = null) {
    const idToDelete = profileId || getActiveProfileId();
    if (!idToDelete) {
        console.warn("Intento de borrado de perfil sin un ID activo o especificado.");
        return;
    }

    let allProfiles = getAllProfiles();
    if (allProfiles[idToDelete]) {
        console.log(`Borrando perfil local: ${idToDelete}`);
        delete allProfiles[idToDelete];
        saveAllProfiles(allProfiles);
        
        // Si el perfil borrado era el activo, se limpia la sesión activa.
        if (idToDelete === getActiveProfileId()) {
            localStorage.removeItem(ACTIVE_PROFILE_KEY);
            console.log("Perfil activo borrado. El usuario deberá seleccionar un nuevo perfil.");
        }
    } else {
        console.warn(`Se intentó borrar el perfil ${idToDelete}, pero no fue encontrado en localStorage.`);
    }
}


// --- Funciones de Modificación de Datos ---

export function updatePlayerCoins(amount) {
    const player = getPlayerData();
    if (player) {
        player.coins = (player.coins || 0) + amount;
        savePlayerData(player);
        return player.coins;
    }
    return null;
}

export function updatePlayerProfile(newUsername) {
    const player = getPlayerData();
    if (player) {
        player.username = newUsername;
        savePlayerData(player);
    }
}

export function updatePlayerSyncStatus(profileId, status) {
    const allProfiles = getAllProfiles();
    if (allProfiles[profileId]) {
        allProfiles[profileId].sharepointSynced = status;
        saveAllProfiles(allProfiles);
        return true;
    }
    return false;
}

export function unlockAvatar(avatarId) {
    const player = getPlayerData();
    const avatarData = AVATARS.find(a => a.id === avatarId);
    if (!player || !avatarData || player.unlockedAvatars.includes(avatarId)) return false;
    if (player.coins >= avatarData.cost) {
        updatePlayerCoins(-avatarData.cost);
        player.unlockedAvatars.push(avatarId);
        savePlayerData(player);
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

/**
 * [NUEVO] Añade un avatar generado por IA al perfil del jugador.
 * @param {string} base64Url - La URL en base64 de la imagen generada.
 * @param {string} prompt - El prompt usado para generar la imagen.
 */
export function addGeneratedAvatar(base64Url, prompt) {
    const player = getPlayerData();
    if (player) {
        if (!player.generatedAvatars) {
            player.generatedAvatars = [];
        }
        // Limita a un solo avatar de IA para evitar sobrecargar localStorage
        player.generatedAvatars = [{ url: base64Url, prompt: prompt }];
        savePlayerData(player);
    }
}

/**
 * [NUEVO] Actualiza los créditos de chat del jugador.
 * @param {number} amount - La cantidad de segundos a añadir (puede ser negativa).
 */
export function updateChatCredits(amount) {
    const player = getPlayerData();
    if (player) {
        player.chatCredits = (player.chatCredits || 0) + amount;
        if (player.chatCredits < 0) player.chatCredits = 0;
        savePlayerData(player);
        return player.chatCredits;
    }
    return null;
}

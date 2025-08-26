/**
 * ================================================================================
 * Módulo de Lógica de la Tienda (tienda-main.js) - v7.0.0 (Producción Final)
 * --------------------------------------------------------------------------------
 * - [CRÍTICO] `handleGenerateAvatar` ahora pasa la URL base64 a `player-data.js`
 * para evitar el error de cuota.
 * - [COMPLETO] Se implementó un prompt base para un estilo de arte consistente.
 * - [ROBUSTO] Lógica final y completa para la tienda y el generador de IA.
 * ================================================================================
 */

import { AVATARS } from './config.js';
import * as Player from './player-data.js';
import * as UI from './ui.js';
import { updateHeaderUI } from './app.js';

const DOMElements = {
    noProfileView: document.getElementById('no-profile-view'),
    tiendaView: document.getElementById('tienda-view'),
    goToProfilesBtn: document.getElementById('go-to-profiles-btn'),
    iaGeneratorModal: {
        backdrop: document.getElementById('ia-generator-modal'),
        prompt: document.getElementById('avatar-prompt'),
        preview: document.getElementById('generated-avatar-preview'),
        actions: document.getElementById('generator-actions'),
        closeBtn: document.getElementById('close-modal-btn'),
    }
};

const IA_BASE_PROMPT = "Estilo de caricatura 3D para niños, colores vibrantes, contornos audaces, personajes expresivos y amigables, renderizado de alta calidad, fondo simple y colorido. ";

function renderStore() {
    const playerData = Player.getPlayerData();
    if (!playerData) return;

    DOMElements.tiendaView.innerHTML = `
        <div class="text-center mb-10"><h1 class="font-title text-4xl md:text-5xl text-title-mustard">Tienda y Avatares</h1></div>
        <section id="ia-section" class="mb-12">
             <div class="flex justify-center items-center gap-4 mb-6"><h2 class="font-title text-3xl text-center text-teal-500">Creación con IA</h2><button id="open-ia-generator-btn" class="btn-3d bg-teal-500 text-white border-teal-700 text-sm px-4 py-2">Crear Nuevo</button></div>
            <div id="ia-avatars-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"></div>
            <p id="no-ia-avatars" class="text-center text-slate-500 dark:text-slate-400 hidden">No has creado avatares con IA.</p>
        </section>
        <section id="store-avatars">
            <h2 class="font-title text-3xl text-center mb-6 text-primary">Avatares de la Tienda</h2>
            <div id="avatar-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"></div>
        </section>
    `;

    const avatarGrid = document.getElementById('avatar-grid');
    const iaAvatarsGrid = document.getElementById('ia-avatars-grid');
    const noIaAvatarsMsg = document.getElementById('no-ia-avatars');

    AVATARS.forEach(avatar => {
        const isUnlocked = playerData.unlockedAvatars.includes(avatar.id);
        const canAfford = playerData.coins >= avatar.cost;
        const isEquipped = playerData.currentAvatarId === avatar.id;
        const card = document.createElement('div');
        card.className = `p-3 rounded-lg flex flex-col items-center text-center transition-all duration-300 ${isEquipped ? 'bg-blue-200 dark:bg-blue-900 ring-4 ring-primary' : 'bg-white dark:bg-slate-800 shadow-md'}`;
        let buttonHtml = isEquipped ? `<button class="w-full mt-2 py-1 bg-blue-500 text-white rounded-md text-sm font-bold" disabled>Equipado</button>` : isUnlocked ? `<button data-avatar-id="${avatar.id}" class="equip-btn w-full mt-2 py-1 bg-green-500 text-white rounded-md text-sm font-bold hover:bg-green-600">Equipar</button>` : `<button data-avatar-id="${avatar.id}" class="buy-btn w-full mt-2 py-1 ${canAfford ? 'bg-secondary text-white hover:bg-amber-600' : 'bg-slate-400 text-slate-700 cursor-not-allowed'}" ${!canAfford ? 'disabled' : ''}><span class="font-bold">${avatar.cost}</span> 🪙</button>`;
        card.innerHTML = `<img src="${avatar.url}" alt="${avatar.name}" class="w-24 h-24 rounded-full border-4 ${isUnlocked ? 'border-green-400' : 'border-slate-300'}"><span class="mt-2 text-sm font-semibold">${avatar.name}</span>${buttonHtml}`;
        avatarGrid.appendChild(card);
    });

    const iaAvatars = playerData.generatedAvatars || [];
    noIaAvatarsMsg.classList.toggle('hidden', iaAvatars.length > 0);
    iaAvatarsGrid.innerHTML = '';
    iaAvatars.forEach((avatarData, index) => {
        const avatarId = `ia_${index}`;
        const isEquipped = playerData.currentAvatarId === avatarId;
        const card = document.createElement('div');
        card.className = `p-3 rounded-lg flex flex-col items-center text-center transition-all duration-300 ${isEquipped ? 'bg-teal-200 dark:bg-teal-900 ring-4 ring-teal-500' : 'bg-white dark:bg-slate-800 shadow-md'}`;
        const iconSVG = `<div class="w-24 h-24 rounded-full border-4 border-teal-400 bg-teal-50 dark:bg-teal-900 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-teal-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" /></svg></div>`;
        card.innerHTML = `${iconSVG}<span class="mt-2 text-xs font-semibold truncate w-full" title="${avatarData.prompt}">${avatarData.prompt}</span><button data-avatar-id="${avatarId}" data-avatar-url="${avatarData.url}" class="equip-ia-btn w-full mt-2 py-1 ${isEquipped ? 'bg-teal-500' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md text-sm font-bold" ${isEquipped ? 'disabled' : ''}>${isEquipped ? 'Equipado' : 'Equipar'}</button><button data-avatar-url="${avatarData.url}" data-prompt="${avatarData.prompt}" class="download-ia-btn w-full mt-1 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-sm font-bold">Descargar</button>`;
        iaAvatarsGrid.appendChild(card);
    });
    
    document.getElementById('open-ia-generator-btn').addEventListener('click', openIaGenerator);
}

function handleStoreActions(e) {
    const target = e.target;
    if (target.classList.contains('buy-btn')) {
        if (Player.unlockAvatar(target.dataset.avatarId)) {
            UI.showNotification("¡Avatar desbloqueado!", "success");
            renderStore();
            updateHeaderUI();
        } else {
            UI.showNotification("No tienes suficientes monedas.", "error");
        }
    }
    if (target.classList.contains('equip-btn')) {
        Player.setCurrentAvatar(target.dataset.avatarId);
        renderStore();
        updateHeaderUI();
    }
    if (target.classList.contains('equip-ia-btn')) {
        Player.setCurrentAvatar(target.dataset.avatarId, target.dataset.avatarUrl);
        renderStore();
        updateHeaderUI();
    }
    if (target.classList.contains('download-ia-btn')) {
        const link = document.createElement('a');
        link.href = target.dataset.avatarUrl;
        const filename = target.dataset.prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `${filename.substring(0, 30) || 'avatar_ia'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function resetGeneratorModal() {
    const { preview, actions, prompt } = DOMElements.iaGeneratorModal;
    preview.innerHTML = `<span class="text-slate-400">La previsualización de tu avatar aparecerá aquí</span>`;
    prompt.value = '';
    actions.innerHTML = `<button id="generate-avatar-btn" class="w-full btn-3d bg-teal-500 text-white border-teal-700">Generar Imagen</button>`;
    actions.querySelector('#generate-avatar-btn').addEventListener('click', handleGenerateAvatar);
}

function openIaGenerator() {
    resetGeneratorModal();
    DOMElements.iaGeneratorModal.backdrop.classList.remove('hidden');
    DOMElements.iaGeneratorModal.backdrop.classList.add('flex');
}

async function handleGenerateAvatar() {
    const { prompt, preview, actions } = DOMElements.iaGeneratorModal;
    const promptText = prompt.value.trim();
    const cost = 1500;
    if (!promptText) { UI.showNotification("Describe tu avatar.", "error"); return; }
    if (Player.getPlayerData().coins < cost) { UI.showNotification("No tienes suficientes monedas.", "error"); return; }

    actions.innerHTML = `<div class="w-full flex justify-center items-center gap-2"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div><span>Generando...</span></div>`;
    preview.innerHTML = '';

    try {
        const finalPrompt = IA_BASE_PROMPT + promptText;
        const imageElement = await puter.ai.txt2img(finalPrompt);
        if (!(imageElement instanceof HTMLImageElement) || !imageElement.src) throw new Error("La respuesta de la IA no fue una imagen válida.");
        
        imageElement.className = "w-48 h-48 rounded-lg object-cover mx-auto";
        preview.appendChild(imageElement);

        actions.innerHTML = `<button id="save-avatar-btn" class="w-1/2 btn-3d bg-green-500 text-white border-green-700">Guardar (Cuesta ${cost} 🪙)</button><button id="discard-avatar-btn" class="w-1/2 btn-3d bg-red-500 text-white border-red-700">Descartar</button>`;
        actions.querySelector('#save-avatar-btn').onclick = () => {
            Player.updatePlayerCoins(-cost);
            Player.addGeneratedAvatar(imageElement.src, promptText);
            UI.showNotification("Avatar guardado. Reemplazará al anterior si ya tenías uno.", "success");
            DOMElements.iaGeneratorModal.backdrop.classList.add('hidden');
            renderStore();
            updateHeaderUI();
        };
        actions.querySelector('#discard-avatar-btn').onclick = resetGeneratorModal;
    } catch (error) {
        console.error("Error al generar imagen:", error);
        UI.showNotification("La IA no pudo crear la imagen.", "error");
        resetGeneratorModal();
    }
}

function init() {
    if (!Player.getPlayerData()) {
        DOMElements.noProfileView.classList.remove('hidden');
        DOMElements.tiendaView.classList.add('hidden');
        // El botón para abrir el selector de perfiles ahora es visible
        DOMElements.goToProfilesBtn.onclick = () => {
             document.getElementById('profile-switcher-modal').classList.remove('hidden');
             document.getElementById('profile-switcher-modal').classList.add('flex');
        }
        return;
    }
    DOMElements.noProfileView.classList.add('hidden');
    DOMElements.tiendaView.classList.remove('hidden');
    renderStore();
    DOMElements.tiendaView.addEventListener('click', handleStoreActions);
    DOMElements.iaGeneratorModal.closeBtn.addEventListener('click', () => DOMElements.iaGeneratorModal.backdrop.classList.add('hidden'));
}

document.addEventListener('DOMContentLoaded', init);

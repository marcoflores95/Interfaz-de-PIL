/**
 * ================================================================================
 * Módulo Principal (main.js) - VF_4.0.0 (Sincronización y Privacidad)
 * --------------------------------------------------------------------------------
 * - [NUEVO] Lógica para el modal de Aviso de Privacidad. Se bloquea la interacción
 * hasta que el usuario acepte. El estado se guarda en localStorage.
 * - [MEJORADO] El flujo de registro ahora guarda el estado de sincronización
 * en el perfil del jugador (`sharepointSynced: true/false`).
 * - [NUEVO] El panel de jugador ahora muestra un aviso y un botón si el perfil
 * no está sincronizado.
 * - [NUEVO] Se implementa la función `handleManualSync` para reintentar el
 * registro en SharePoint si falló la primera vez.
 * ================================================================================
 */

import { MUNICIPIOS, AVATARS } from './config.js';
import * as Player from './player-data.js';
import * as UI from './ui.js';
import { registerStudentVisit } from './registro.js';

// --- Registro del Service Worker ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registrado con éxito:', registration.scope);
        }).catch(error => {
            console.log('Fallo en el registro del ServiceWorker:', error);
        });
    });
}

const DOMElements = {
    // Vistas principales
    roleSelectionView: document.getElementById('role-selection'),
    playerDashboardView: document.getElementById('player-dashboard'),
    // Botones de rol
    studentRoleBtn: document.getElementById('role-student'),
    otherRoleBtns: document.querySelectorAll('button[data-role]'),
    // Tema
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    // Modales
    modalBackdrop: document.getElementById('modal-backdrop'),
    registrationModal: document.getElementById('modal-registro-estudiante'),
    modifyProfileModal: document.getElementById('modal-modificar-perfil'),
    confirmDeleteModal: document.getElementById('modal-confirmar-borrado'),
    closeModalBtns: document.querySelectorAll('.close-modal-btn'),
    // Formularios
    registrationForm: document.getElementById('student-registration-form'),
    registrationLoader: document.getElementById('registration-loader'),
    modifyProfileForm: document.getElementById('modify-profile-form'),
    // Controles de formulario
    ageSlider: document.getElementById('age'),
    ageDisplay: document.getElementById('age-display'),
    municipalitySelect: document.getElementById('municipality'),
    modifyUsernameInput: document.getElementById('modify-username'),
    // UI del Jugador
    playerGreeting: document.getElementById('player-greeting'),
    playerAvatar: document.getElementById('player-avatar'),
    profileMenuContainer: document.getElementById('profile-menu-container'),
    profileMenuBtn: document.getElementById('profile-menu-button'),
    profileMenuName: document.getElementById('profile-menu-name'),
    profileMenuAvatar: document.getElementById('profile-menu-avatar'),
    profileDropdown: document.getElementById('profile-dropdown'),
    modifyProfileBtn: document.getElementById('modify-profile-btn'),
    deleteProfileBtn: document.getElementById('delete-profile-btn'),
    confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
    navProfileBtns: document.querySelectorAll('.nav-profile-btn'),
    // NUEVO: UI de Sincronización
    syncStatusContainer: document.getElementById('sync-status-container'),
    syncProfileBtn: document.getElementById('sync-profile-btn'),
    syncLoader: document.getElementById('sync-loader'),
    // NUEVO: UI de Aviso de Privacidad
    privacyModal: document.getElementById('privacy-modal'),
    acceptPrivacyBtn: document.getElementById('accept-privacy-btn'),
    privacyFooter: document.getElementById('privacy-footer'),
    openPrivacyModalFromFooter: document.getElementById('open-privacy-modal-from-footer'),
};

function populateMunicipalityDropdowns() {
    const sortedMunicipios = [...MUNICIPIOS].sort((a, b) => a.nombre.localeCompare(b.nombre));
    const select = DOMElements.municipalitySelect;
    if (!select) return;
    while (select.options.length > 1) select.remove(1);
    sortedMunicipios.forEach(m => {
        const option = document.createElement('option');
        option.value = m.nombre;
        option.textContent = m.nombre;
        select.appendChild(option);
    });
}

function updateDashboard(playerData) {
    if (DOMElements.playerGreeting) DOMElements.playerGreeting.textContent = `¡Hola, ${playerData.username}!`;
    if (DOMElements.playerAvatar) {
        DOMElements.playerAvatar.src = playerData.currentAvatarUrl || AVATARS.find(a => a.id === playerData.currentAvatarId)?.url;
        DOMElements.playerAvatar.alt = playerData.username;
    }

    // NUEVO: Lógica para mostrar el estado de sincronización
    if (playerData.sharepointSynced) {
        DOMElements.syncStatusContainer?.classList.add('hidden');
    } else {
        DOMElements.syncStatusContainer?.classList.remove('hidden');
    }
}

function updateProfileMenu(playerData) {
    if (DOMElements.profileMenuName) DOMElements.profileMenuName.textContent = playerData.username;
    if (DOMElements.profileMenuAvatar) {
        DOMElements.profileMenuAvatar.src = playerData.currentAvatarUrl || AVATARS.find(a => a.id === playerData.currentAvatarId)?.url;
    }
}

function toggleNavAndDashboard(playerData) {
    const isLoggedIn = !!playerData;
    DOMElements.navProfileBtns.forEach(btn => btn.classList.toggle('hidden', !isLoggedIn));
    DOMElements.profileMenuContainer?.classList.toggle('hidden', !isLoggedIn);
    DOMElements.roleSelectionView?.classList.toggle('hidden', isLoggedIn);
    DOMElements.playerDashboardView?.classList.toggle('hidden', !isLoggedIn);

    if (isLoggedIn) {
        updateDashboard(playerData);
        updateProfileMenu(playerData);
    }
}

// --- LÓGICA DE AVISO DE PRIVACIDAD ---
function handlePrivacy() {
    const privacyAccepted = localStorage.getItem('privacyAccepted') === 'true';

    if (privacyAccepted) {
        DOMElements.privacyModal?.classList.add('hidden');
        DOMElements.modalBackdrop?.classList.add('hidden');
        DOMElements.privacyFooter?.classList.add('hidden');
        return;
    }

    // Si no ha aceptado, mostramos el modal
    UI.openModal(DOMElements.privacyModal);
    DOMElements.privacyFooter?.classList.remove('hidden');

    DOMElements.acceptPrivacyBtn?.addEventListener('click', () => {
        localStorage.setItem('privacyAccepted', 'true');
        UI.closeModal();
        DOMElements.privacyFooter?.classList.add('hidden');
    });

    DOMElements.openPrivacyModalFromFooter?.addEventListener('click', (e) => {
        e.preventDefault();
        UI.openModal(DOMElements.privacyModal);
    });
}

// --- LÓGICA DE SINCRONIZACIÓN MANUAL ---
async function handleManualSync() {
    const playerData = Player.getPlayerData();
    if (!playerData || playerData.sharepointSynced) return;

    DOMElements.syncLoader?.classList.remove('hidden');
    DOMElements.syncLoader?.classList.add('flex');
    DOMElements.syncProfileBtn.disabled = true;

    console.log('[Main.js] Iniciando sincronización manual...');
    
    // Recreamos los datos para el registro
    const studentData = {
        username: playerData.username,
        ...playerData.registrationData // Usamos los datos originales
    };

    const isSynced = await registerStudentVisit(studentData);

    if (isSynced) {
        Player.updatePlayerSyncStatus(playerData.id, true);
        DOMElements.syncStatusContainer?.classList.add('hidden');
        UI.showNotification('¡Perfil sincronizado con la nube con éxito!', 'success');
    } else {
        UI.showNotification('Error de conexión. No se pudo sincronizar, por favor intenta de nuevo más tarde.', 'error');
    }

    DOMElements.syncLoader?.classList.add('hidden');
    DOMElements.syncProfileBtn.disabled = false;
}

function main() {
    // 1. Lógica de Tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(savedTheme);

    // 2. Lógica de Aviso de Privacidad (se ejecuta primero)
    handlePrivacy();
    
    // 3. Carga de datos del jugador y UI
    const playerData = Player.getPlayerData();
    toggleNavAndDashboard(playerData);
    populateMunicipalityDropdowns();

    // --- EVENT LISTENERS ---

    // Registro de Estudiante (con nueva lógica de sync)
    DOMElements.registrationForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        DOMElements.registrationLoader?.classList.remove('hidden');
        DOMElements.registrationLoader?.classList.add('flex');

        const formData = new FormData(e.target);
        const registrationData = {
            username: formData.get('username'),
            gender: formData.get('gender'),
            age: formData.get('age'),
            municipality: formData.get('municipality'),
        };

        try {
            console.log('[Main.js] Intentando registrar en SharePoint...');
            const isRegistered = await registerStudentVisit(registrationData);

            // Creamos el perfil local sin importar el resultado, pero guardando el estado
            console.log(`[Main.js] Creando perfil local. Estado de Sync: ${isRegistered}`);
            Player.createNewPlayer(registrationData.username, 'student', {
                ...registrationData,
                synced: isRegistered,
            });
            
            if (!isRegistered) {
                 console.error("[Main.js] Falló el registro en SharePoint. El perfil se creó localmente pero no está sincronizado.");
                 // No es necesario mostrar notificación aquí, el dashboard lo indicará.
            }
            
            console.log('[Main.js] Proceso de registro finalizado. Recargando página...');
            window.location.reload();

        } catch (err) {
            console.error("[Main.js] Ocurrió un error inesperado durante el registro:", err);
            DOMElements.registrationLoader?.classList.add('hidden');
            UI.showNotification('Ocurrió un error inesperado. Revisa la consola.', 'error');
        }
    });
    
    // Sincronización Manual
    DOMElements.syncProfileBtn?.addEventListener('click', handleManualSync);

    // Modificar Perfil
    DOMElements.modifyProfileForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = DOMElements.modifyUsernameInput.value;
        Player.updatePlayerProfile(newUsername);
        UI.closeModal();
        UI.showNotification('¡Perfil actualizado con éxito!', 'success');
        setTimeout(() => window.location.reload(), 1000);
    });

    // Borrar Perfil
    DOMElements.confirmDeleteBtn?.addEventListener('click', () => {
        Player.deletePlayerProfile();
        window.location.reload();
    });

    // Listeners de UI general (modales, menús, etc.)
    DOMElements.studentRoleBtn?.addEventListener('click', () => UI.openModal(DOMElements.registrationModal));
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('close-modal-btn')) UI.closeModal();
    });
    DOMElements.modalBackdrop?.addEventListener('click', (e) => {
        if (e.target === DOMElements.modalBackdrop) UI.closeModal();
    });
    DOMElements.ageSlider?.addEventListener('input', (e) => {
        if(DOMElements.ageDisplay) DOMElements.ageDisplay.textContent = e.target.value;
    });
    DOMElements.profileMenuBtn?.addEventListener('click', () => {
        DOMElements.profileDropdown?.classList.toggle('hidden');
    });
    DOMElements.modifyProfileBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        DOMElements.profileDropdown?.classList.add('hidden');
        UI.openModal(DOMElements.modifyProfileModal);
    });
    DOMElements.deleteProfileBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        DOMElements.profileDropdown?.classList.add('hidden');
        UI.openModal(DOMElements.confirmDeleteModal);
    });
}

document.addEventListener('DOMContentLoaded', main);

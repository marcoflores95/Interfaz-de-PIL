/**
 * ================================================================================
 * Módulo Principal (main.js) - VF_5.0.0 (Flujo de Inicio Corregido)
 * --------------------------------------------------------------------------------
 * - [CORREGIDO] Se reestructura el flujo de inicio para que la aplicación
 * espere la aceptación del Aviso de Privacidad antes de cargar la interfaz
 * principal, solucionando el problema de la "pantalla oscura".
 * - Se mantiene toda la lógica de perfiles, sincronización y modales.
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
    // UI de Sincronización
    syncStatusContainer: document.getElementById('sync-status-container'),
    syncProfileBtn: document.getElementById('sync-profile-btn'),
    syncLoader: document.getElementById('sync-loader'),
    // UI de Aviso de Privacidad
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

// --- LÓGICA DE SINCRONIZACIÓN MANUAL ---
async function handleManualSync() {
    const playerData = Player.getPlayerData();
    if (!playerData || playerData.sharepointSynced) return;

    DOMElements.syncLoader?.classList.remove('hidden');
    DOMElements.syncLoader?.classList.add('flex');
    DOMElements.syncProfileBtn.disabled = true;

    const studentData = {
        username: playerData.username,
        ...playerData.registrationData
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

/**
 * [NUEVO] Inicia la lógica principal de la aplicación.
 * Esta función se llama DESPUÉS de que se haya gestionado el aviso de privacidad.
 */
function startApp() {
    const playerData = Player.getPlayerData();
    toggleNavAndDashboard(playerData);
    populateMunicipalityDropdowns();

    // --- EVENT LISTENERS DE LA APP ---

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
            const isRegistered = await registerStudentVisit(registrationData);
            Player.createNewPlayer(registrationData.username, 'student', {
                ...registrationData,
                synced: isRegistered,
            });
            window.location.reload();
        } catch (err) {
            DOMElements.registrationLoader?.classList.add('hidden');
            UI.showNotification('Ocurrió un error inesperado.', 'error');
        }
    });
    
    DOMElements.syncProfileBtn?.addEventListener('click', handleManualSync);

    DOMElements.modifyProfileForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = DOMElements.modifyUsernameInput.value;
        Player.updatePlayerProfile(newUsername);
        UI.closeModal();
        UI.showNotification('¡Perfil actualizado con éxito!', 'success');
        setTimeout(() => window.location.reload(), 1000);
    });

    DOMElements.confirmDeleteBtn?.addEventListener('click', () => {
        Player.deletePlayerProfile();
        window.location.reload();
    });

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

/**
 * [MODIFICADO] Verifica el estado del aviso de privacidad y decide el flujo.
 */
function checkPrivacy() {
    if (localStorage.getItem('privacyAccepted') === 'true') {
        startApp(); // Si ya aceptó, inicia la app directamente.
    } else {
        // Si no, muestra el modal y el footer. La app no iniciará hasta que se acepte.
        UI.openModal(DOMElements.privacyModal);
        DOMElements.privacyFooter?.classList.remove('hidden');
    }
}

/**
 * [MODIFICADO] Función de inicialización principal.
 */
function init() {
    // 1. Lógica de Tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(savedTheme);

    // 2. Configurar listener para la aceptación de privacidad
    DOMElements.acceptPrivacyBtn?.addEventListener('click', () => {
        localStorage.setItem('privacyAccepted', 'true');
        UI.closeModal();
        DOMElements.privacyFooter?.classList.add('hidden');
        startApp(); // Inicia la app DESPUÉS de aceptar.
    });
    
    DOMElements.openPrivacyModalFromFooter?.addEventListener('click', (e) => {
        e.preventDefault();
        UI.openModal(DOMElements.privacyModal);
    });

    // 3. Iniciar la verificación de privacidad
    checkPrivacy();
}

document.addEventListener('DOMContentLoaded', init);

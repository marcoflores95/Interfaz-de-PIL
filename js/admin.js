/**
 * ================================================================================
 * Lógica del Panel de Administración (Rediseñado)
 * Archivo: admin-logic.js
 * Versión: 2.0
 * --------------------------------------------------------------------------------
 * Autor: Gemini
 * Colaborador: iDiegoSalazar
 * --------------------------------------------------------------------------------
 * Funcionalidades:
 * - Interfaz de login segura.
 * - Dashboard con estadísticas clave (usuarios, monedas, puntos).
 * - Renderizado de perfiles en tarjetas interactivas.
 * - Búsqueda de perfiles en tiempo real.
 * - Modales personalizados para crear, editar y confirmar acciones.
 * - Flujo de borrado seguro con confirmación por texto.
 * - Edición detallada de perfiles, incluyendo progreso por municipio.
 * ================================================================================
 */

// --- Mocks y Configuración para desarrollo ---
const MUNICIPIOS = [{ id: 'leon', nombre: 'León' }, { id: 'guanajuato', nombre: 'Guanajuato' }, { id: 'irapuato', nombre: 'Irapuato' }];
const Player = {
    getAllProfiles: () => JSON.parse(localStorage.getItem('profiles')) || {},
    saveAllProfiles: (profiles) => localStorage.setItem('profiles', JSON.stringify(profiles)),
    deleteProfile: (id) => {
        let profiles = Player.getAllProfiles();
        delete profiles[id];
        Player.saveAllProfiles(profiles);
    },
    createNewPlayer: (username, role, data) => {
        let profiles = Player.getAllProfiles();
        const newId = `player_${Date.now()}`;
        profiles[newId] = {
            id: newId,
            username,
            role,
            coins: 0,
            points: 0,
            chatCredits: 0,
            municipioProgress: {},
            ownedAvatars: ['avatar01'],
            currentAvatarId: 'avatar01',
            ...data
        };
        Player.saveAllProfiles(profiles);
    }
};
// --- Fin de Mocks ---

const ADMIN_PASS_KEY = btoa('gto_kids_admin_pass_v2');
const DEFAULT_PASS = btoa('adminGTO2025'); // Contraseña más segura

const DOMElements = {
    loginScreen: document.getElementById('login-screen'),
    loginForm: document.getElementById('login-form'),
    loginError: document.getElementById('login-error'),
    adminPanel: document.getElementById('admin-panel'),
    
    // Dashboard Stats
    stats: {
        totalUsers: document.getElementById('stats-total-users'),
        totalCoins: document.getElementById('stats-total-coins'),
        totalPoints: document.getElementById('stats-total-points'),
    },

    // Controles
    searchInput: document.getElementById('search-input'),
    addNewProfileBtn: document.getElementById('add-new-profile-btn'),
    deleteAllProfilesBtn: document.getElementById('delete-all-profiles-btn'),
    
    // Grid
    profilesGrid: document.getElementById('profiles-grid'),
    noResultsMessage: document.getElementById('no-results-message'),

    // Modal Universal
    modalBackdrop: document.getElementById('modal-backdrop'),
    
    // Modal de Edición
    editModalContainer: document.getElementById('edit-modal-container'),
    modalTitle: document.getElementById('modal-title'),
    editProfileForm: document.getElementById('edit-profile-form'),

    // Modal de Confirmación
    confirmModalContainer: document.getElementById('confirm-modal-container'),
    confirmModalTitle: document.getElementById('confirm-modal-title'),
    confirmModalText: document.getElementById('confirm-modal-text'),
    confirmActionBtn: document.getElementById('confirm-action-btn'),
};

/**
 * Inicializa el script del panel de admin.
 */
function init() {
    if (!localStorage.getItem(ADMIN_PASS_KEY)) {
        localStorage.setItem(ADMIN_PASS_KEY, DEFAULT_PASS);
    }
    DOMElements.loginForm.addEventListener('submit', handleLogin);
}

/**
 * Maneja el intento de login.
 * @param {Event} e 
 */
function handleLogin(e) {
    e.preventDefault();
    const passwordInput = document.getElementById('admin-password').value;
    const storedPass = localStorage.getItem(ADMIN_PASS_KEY);

    if (btoa(passwordInput) === storedPass) {
        DOMElements.loginScreen.classList.add('hidden');
        DOMElements.adminPanel.classList.remove('hidden');
        loadAdminPanel();
    } else {
        DOMElements.loginError.textContent = 'Contraseña incorrecta.';
        setTimeout(() => DOMElements.loginError.textContent = '', 2000);
    }
}

/**
 * Carga los datos y configura los listeners del panel principal.
 */
function loadAdminPanel() {
    renderDashboard();
    addPanelListeners();
}

/**
 * Añade los listeners para los elementos del panel.
 */
function addPanelListeners() {
    DOMElements.searchInput.addEventListener('input', (e) => renderDashboard(e.target.value));
    DOMElements.addNewProfileBtn.addEventListener('click', () => openEditModal(null));
    DOMElements.deleteAllProfilesBtn.addEventListener('click', handleDeleteAllProfiles);

    DOMElements.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === DOMElements.modalBackdrop || e.target.closest('.close-modal-btn')) {
            closeAllModals();
        }
    });

    DOMElements.editProfileForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Renderiza todo el dashboard: estadísticas y tarjetas de perfil.
 * @param {string} filter - Texto para filtrar los perfiles por nombre.
 */
function renderDashboard(filter = '') {
    const profiles = Player.getAllProfiles();
    const profileIds = Object.keys(profiles);
    const filterText = filter.toLowerCase();

    // 1. Renderizar Estadísticas
    let totalCoins = 0;
    let totalPoints = 0;
    profileIds.forEach(id => {
        totalCoins += profiles[id].coins || 0;
        totalPoints += profiles[id].points || 0;
    });
    DOMElements.stats.totalUsers.textContent = profileIds.length;
    DOMElements.stats.totalCoins.textContent = totalCoins;
    DOMElements.stats.totalPoints.textContent = totalPoints;

    // 2. Renderizar Grid de Perfiles
    DOMElements.profilesGrid.innerHTML = '';
    let visibleProfiles = 0;
    profileIds.forEach(id => {
        const profile = profiles[id];
        if (profile.username.toLowerCase().includes(filterText)) {
            visibleProfiles++;
            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg flex flex-col';
            card.innerHTML = `
                <div class="flex items-start justify-between">
                    <div>
                        <p class="font-bold text-lg text-slate-800 dark:text-white">${profile.username}</p>
                        <p class="text-sm text-slate-500">${profile.role || 'student'}</p>
                    </div>
                    <div class="text-xs text-slate-400">ID: ${id.substring(0, 15)}...</div>
                </div>
                <div class="my-4 grid grid-cols-3 gap-2 text-center">
                    <div><p class="font-bold text-primary">${profile.coins || 0}</p><p class="text-xs text-slate-500">Monedas</p></div>
                    <div><p class="font-bold text-primary">${profile.points || 0}</p><p class="text-xs text-slate-500">Puntos</p></div>
                    <div><p class="font-bold text-primary">${profile.chatCredits || 0}</p><p class="text-xs text-slate-500">Créditos</p></div>
                </div>
                <div class="mt-auto flex gap-2">
                    <button data-id="${id}" class="edit-btn w-full btn-3d bg-blue-500 text-white border-blue-700 text-sm py-2">Editar</button>
                    <button data-id="${id}" class="delete-btn w-full btn-3d bg-red-500 text-white border-red-700 text-sm py-2">Borrar</button>
                </div>
            `;
            DOMElements.profilesGrid.appendChild(card);
        }
    });
    
    DOMElements.noResultsMessage.classList.toggle('hidden', visibleProfiles > 0);
    
    // Añadir listeners a los nuevos botones
    document.querySelectorAll('.edit-btn').forEach(b => b.addEventListener('click', (e) => openEditModal(e.currentTarget.dataset.id)));
    document.querySelectorAll('.delete-btn').forEach(b => b.addEventListener('click', (e) => handleDeleteProfile(e.currentTarget.dataset.id)));
}

/**
 * Abre el modal para editar o crear un perfil.
 * @param {string|null} profileId - El ID del perfil a editar, o null para crear uno nuevo.
 */
function openEditModal(profileId) {
    const form = DOMElements.editProfileForm;
    let profile = {};
    
    if (profileId) {
        profile = Player.getAllProfiles()[profileId] || {};
        DOMElements.modalTitle.textContent = 'Editar Perfil';
    } else {
        DOMElements.modalTitle.textContent = 'Crear Nuevo Perfil';
    }

    form.dataset.profileId = profileId || '';
    form.innerHTML = `
        <input type="hidden" id="edit-profile-id" value="${profileId || ''}">
        <div>
            <label for="edit-username" class="block text-sm font-bold mb-1">Nombre de Usuario</label>
            <input type="text" id="edit-username" value="${profile.username || ''}" class="w-full input-field" required>
        </div>
        <div>
            <label for="edit-role" class="block text-sm font-bold mb-1">Rol</label>
            <select id="edit-role" class="w-full input-field"></select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label for="edit-coins" class="block text-sm font-bold mb-1">Monedas 🪙</label><input type="number" id="edit-coins" value="${profile.coins || 0}" class="w-full input-field" required></div>
            <div><label for="edit-chatCredits" class="block text-sm font-bold mb-1">Créditos Chat ⏳</label><input type="number" id="edit-chatCredits" value="${profile.chatCredits || 0}" class="w-full input-field" required></div>
            <div><label for="edit-points" class="block text-sm font-bold mb-1">Puntos ⭐</label><input type="number" id="edit-points" value="${profile.points || 0}" class="w-full input-field" required></div>
        </div>
        <div class="mt-4 border-t dark:border-slate-700 pt-4">
            <h4 class="font-bold mb-2">Progreso por Municipio</h4>
            <div id="municipio-progress-editor" class="max-h-48 overflow-y-auto space-y-2 pr-2"></div>
        </div>
        <div class="pt-4"><button type="submit" class="w-full btn-3d bg-success text-white border-green-700">Guardar Cambios</button></div>
    `;

    // Poblar roles y progreso
    const roleSelect = form.querySelector('#edit-role');
    ['student', 'parent', 'teacher', 'external'].forEach(r => {
        const opt = new Option(r.charAt(0).toUpperCase() + r.slice(1), r);
        if (r === profile.role) opt.selected = true;
        roleSelect.appendChild(opt);
    });

    const progressEditor = form.querySelector('#municipio-progress-editor');
    MUNICIPIOS.forEach(m => {
        const score = profile.municipioProgress?.[m.id]?.score || 0;
        progressEditor.innerHTML += `
            <div class="flex justify-between items-center">
                <label for="progress-${m.id}" class="text-sm">${m.nombre}</label>
                <input type="number" id="progress-${m.id}" data-municipio-id="${m.id}" value="${score}" class="w-24 input-field text-right progress-input">
            </div>`;
    });

    DOMElements.editModalContainer.classList.remove('hidden');
    DOMElements.modalBackdrop.classList.remove('hidden');
    DOMElements.modalBackdrop.classList.add('flex');
}

/**
 * Maneja el envío del formulario de edición/creación.
 * @param {Event} e 
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const profileId = e.currentTarget.dataset.profileId;
    const allProfiles = Player.getAllProfiles();

    const updatedData = {
        username: document.getElementById('edit-username').value,
        role: document.getElementById('edit-role').value,
        coins: parseInt(document.getElementById('edit-coins').value, 10),
        chatCredits: parseInt(document.getElementById('edit-chatCredits').value, 10),
        points: parseInt(document.getElementById('edit-points').value, 10),
        municipioProgress: {},
    };
    
    document.querySelectorAll('.progress-input').forEach(input => {
        const municipioId = input.dataset.municipioId;
        const score = parseInt(input.value, 10);
        if (score > 0) {
            updatedData.municipioProgress[municipioId] = { score, completedGames: [] };
        }
    });

    if (profileId) {
        const existingProfile = allProfiles[profileId];
        allProfiles[profileId] = { ...existingProfile, ...updatedData };
        Player.saveAllProfiles(allProfiles);
    } else {
        Player.createNewPlayer(updatedData.username, updatedData.role, updatedData);
    }
    
    closeAllModals();
    renderDashboard();
}

/**
 * Abre el modal de confirmación para borrar un perfil específico.
 * @param {string} profileId 
 */
function handleDeleteProfile(profileId) {
    const profile = Player.getAllProfiles()[profileId];
    if (!profile) return;
    
    openConfirmModal({
        title: "Borrar Perfil",
        text: `¿Estás seguro de que quieres borrar el perfil de <strong>${profile.username}</strong>? Esta acción es irreversible.`,
        onConfirm: () => {
            Player.deleteProfile(profileId);
            renderDashboard();
            closeAllModals();
        }
    });
}

/**
 * Abre el modal de confirmación para borrar TODOS los perfiles.
 */
function handleDeleteAllProfiles() {
    openConfirmModal({
        title: "¡ACCIÓN IRREVERSIBLE!",
        text: "Vas a borrar TODOS los perfiles de la aplicación. Para confirmar, escribe <strong>BORRAR TODO</strong> en el campo de abajo.",
        requireInput: "BORRAR TODO",
        onConfirm: () => {
            Player.saveAllProfiles({});
            renderDashboard();
            closeAllModals();
        }
    });
}

/**
 * Función genérica para abrir el modal de confirmación.
 * @param {object} options - Opciones de configuración del modal.
 */
function openConfirmModal(options) {
    DOMElements.confirmModalTitle.textContent = options.title;
    DOMElements.confirmModalText.innerHTML = options.text;

    // Limpiar listeners anteriores
    const oldBtn = DOMElements.confirmActionBtn;
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
    DOMElements.confirmActionBtn = newBtn;
    
    DOMElements.confirmActionBtn.onclick = options.onConfirm;

    // Manejar campo de texto de confirmación si es necesario
    const existingInput = DOMElements.confirmModalContainer.querySelector('#confirm-input');
    if (existingInput) existingInput.remove();

    if (options.requireInput) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'confirm-input';
        input.placeholder = options.requireInput;
        input.className = 'w-full input-field text-center my-4';
        DOMElements.confirmModalText.after(input);
        
        DOMElements.confirmActionBtn.disabled = true;
        input.oninput = () => {
            DOMElements.confirmActionBtn.disabled = input.value !== options.requireInput;
        };
    } else {
        DOMElements.confirmActionBtn.disabled = false;
    }

    DOMElements.confirmModalContainer.classList.remove('hidden');
    DOMElements.modalBackdrop.classList.remove('hidden');
    DOMElements.modalBackdrop.classList.add('flex');
}

/**
 * Cierra todos los modales abiertos.
 */
function closeAllModals() {
    DOMElements.modalBackdrop.classList.add('hidden');
    DOMElements.modalBackdrop.classList.remove('flex');
    DOMElements.editModalContainer.classList.add('hidden');
    DOMElements.confirmModalContainer.classList.add('hidden');
}

// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', init);

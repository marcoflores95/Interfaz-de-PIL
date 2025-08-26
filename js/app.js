/**
 * ================================================================================
 * Módulo de Aplicación Principal (app.js) - v7.0.0 (Funcionalidad de Roles Completa)
 * --------------------------------------------------------------------------------
 * - [NUEVO] Añadida la lógica para los botones de rol (Padre, Docente, Visitante).
 * - Abren un modal que carga un iframe con un formulario de Microsoft Forms.
 * - Se mantienen las funciones de UI del header y tema.
 * ================================================================================
 */

import * as Player from './player-data.js';
import * as UI from './ui.js';

const DOMElements = {
    header: {
        playerCoins: document.getElementById('player-coins'),
        playerAvatar: document.getElementById('player-avatar'),
        themeToggleBtn: document.getElementById('theme-toggle-btn'),
        themeIconSun: document.getElementById('theme-icon-sun'),
        themeIconMoon: document.getElementById('theme-icon-moon'),
    },
    roleButtons: document.querySelectorAll('[data-role]'),
    iframeModal: {
        modal: document.getElementById('iframe-modal'),
        title: document.getElementById('iframe-modal-title'),
        content: document.getElementById('iframe-modal-content'),
        closeBtns: document.querySelectorAll('#iframe-modal .close-modal-btn'),
    }
};

// URLs de los formularios de Microsoft Forms
const FORMS_URLS = {
    Padres: "https://forms.office.com/Pages/ResponsePage.aspx?id=xrKoF562H0-Dd6Z5865LR8KfmJrp3oFPsTortgfCnclURU8wUFpUNERPTERNUVE2SzBEVDhDVFpRNi4u", // REEMPLAZAR CON TU ENLACE REAL
    Docente: "https://forms.office.com/Pages/ResponsePage.aspx?id=xrKoF562H0-Dd6Z5865LR8KfmJrp3oFPsTortgfCnclUQ0VNTlpJM0hSWE5RQTdPODIzRUNXRkpIMC4u", // REEMPLAZAR CON TU ENLACE REAL
    Visitante: "https://forms.office.com/Pages/ResponsePage.aspx?id=xrKoF562H0-Dd6Z5865LR8KfmJrp3oFPsTortgfCnclUODZTQjRDRkpXWDdVN1ZXQjg3VlpWUVJIMC4u" // REEMPLAZAR CON TU ENLACE REAL
};

export function updateHeaderUI() {
    try {
        const playerData = Player.getPlayerData();
        if (playerData && DOMElements.header.playerCoins) {
            DOMElements.header.playerCoins.textContent = playerData.coins;
        }
    } catch (error) {
        console.error("Error en updateHeaderUI:", error);
    }
}

function applyTheme(theme) {
    try {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            DOMElements.header.themeIconSun?.classList.add('hidden');
            DOMElements.header.themeIconMoon?.classList.remove('hidden');
            document.getElementById("LogoAzul").style.display = "none";
            document.getElementById("LogoBlanco").style.display = "block";

        } else {
            document.documentElement.classList.remove('dark');
            DOMElements.header.themeIconSun?.classList.remove('hidden');
            DOMElements.header.themeIconMoon?.classList.add('hidden');
            document.getElementById("LogoAzul").style.display = "block";
            document.getElementById("LogoBlanco").style.display = "none";
        }
    } catch (error) {
        console.error("Error en applyTheme:", error);
    }
}

/**
 * Abre el modal del iframe y carga la URL correspondiente.
 * @param {string} role - El rol ('Padres', 'Docente', 'Visitante').
 */
function openFormsModal(role) {
    const url = FORMS_URLS[role];
    /*const title = `Formulario para Marco ${role.charAt(0).toUpperCase() + role.slice(1)}`;*/
    const title = `Formulario ${role.charAt(0).toUpperCase() + role.slice(1)}`;

    if (DOMElements.iframeModal.modal && DOMElements.iframeModal.content && url) {
        DOMElements.iframeModal.title.textContent = title;
        DOMElements.iframeModal.content.src = url;
        UI.openModal(DOMElements.iframeModal.modal);
    } else {
        console.error("No se pudo abrir el modal del formulario para el rol:", role);
    }
}

function initializeCommon() {
    console.log("[app.js] Inicializando componentes comunes...");
    try {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);
        updateHeaderUI();

        DOMElements.header.themeToggleBtn?.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            const newTheme = isDark ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Añadir listeners para los botones de rol
        DOMElements.roleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const role = button.dataset.role;
                if (role) {
                    openFormsModal(role);
                }
            });
        });

        // Añadir listener para cerrar el modal del iframe
        DOMElements.iframeModal.closeBtns.forEach(btn => {
            btn.addEventListener('click', () => UI.closeModal());
        });
        
        console.log("[app.js] Componentes comunes inicializados con éxito.");
    } catch (error) {
        console.error("Fallo crítico durante la inicialización de app.js:", error);
    }
}

document.addEventListener('DOMContentLoaded', initializeCommon);

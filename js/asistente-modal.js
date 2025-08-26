/**
 * ================================================================================
 * Módulo del Modal del Asistente (asistente-modal.js) - v10.0.0 (Modular)
 * --------------------------------------------------------------------------------
 * Autor: Gemini
 * Colaborador: iDiegoSalazar
 * --------------------------------------------------------------------------------
 * - Importa la lógica central desde `asistente-logic.js`.
 * - Construye el HTML del asistente y lo inyecta en el modal al abrirse.
 * - Gestiona la apertura/cierre del modal.
 * ================================================================================
 */

// Importa la función de inicialización desde el archivo de lógica central.
import { initAsistente } from './asistente-logic.js';

const DOMElements = {
    openBtn: document.getElementById('open-asistente-btn'),
    closeBtn: document.getElementById('close-asistente-btn'),
    backdrop: document.getElementById('asistente-modal-backdrop'),
    contentArea: document.getElementById('asistente-main-content'),
};

let isAsistenteLoaded = false;

function createAsistenteHTML() {
    return `
        <div class="flex flex-col md:flex-row gap-4 sm:gap-8 w-full h-full" id="asistente-container">
            <!-- Columna Izquierda: Selección e Información -->
            <aside class="w-full md:w-2/5 lg:w-1/3 flex flex-col gap-4 sm:gap-8 flex-shrink-0 overflow-y-auto">
                <div class="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-xl h-fit">
                    <h3 class="font-title text-lg sm:text-xl text-title-mustard mb-4">Elige un Municipio</h3>
                    <div class="relative">
                        <select id="municipio-select" class="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-white">
                            <option value="">Selecciona uno...</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300"><svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
                    </div>
                </div>
                <div id="info-panel" class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 sm:p-6 flex-col transition-opacity duration-500 opacity-0 hidden">
                    <div id="info-content" class="hidden flex-grow flex-col">
                        <img id="municipio-image" src="" alt="Imagen del municipio" class="w-full h-40 object-cover rounded-xl mb-4">
                        <h2 id="municipio-name" class="font-title text-2xl text-blue-600 mb-2"></h2>
                        <p id="municipio-description" class="text-slate-600 dark:text-slate-300 mb-4 text-sm"></p>
                        <div class="border-t border-slate-200 dark:border-slate-700 pt-4 mt-auto"><h3 class="font-bold text-slate-700 dark:text-slate-200 mb-2">Datos Curiosos</h3><div id="facts-carousel" class="relative h-24 overflow-hidden bg-slate-100 dark:bg-slate-700 rounded-lg"></div></div>
                    </div>
                </div>
            </aside>
            <!-- Columna Derecha: Chat -->
            <section class="w-full md:w-3/5 lg:w-2/3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex flex-col h-full">
                <div id="chat-window" class="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto min-h-0">
                    <div class="flex justify-start"><div class="bg-slate-200 dark:bg-slate-700 p-3 rounded-lg max-w-lg"><p class="text-sm text-slate-800 dark:text-slate-200">¡Hola! Soy tu Guía Virtual.</p></div></div>
                </div>
                <div id="loading-indicator" class="hidden px-6 pb-2"><div class="flex justify-start"><div class="bg-slate-200 dark:bg-slate-700 p-3 rounded-lg max-w-lg"><p class="text-sm text-slate-500 italic">Escribiendo...</p></div></div></div>
                <div class="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <form id="chat-form" class="flex gap-4">
                        <input type="text" id="chat-input" placeholder="Escribe tu pregunta..." class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" required>
                        <button type="submit" class="btn-3d bg-blue-500 text-white border-blue-700 px-6 py-2">Enviar</button>
                    </form>
                </div>
            </section>
        </div>
    `;
}

function loadAndInitAsistente() {
    if (isAsistenteLoaded) return;
    DOMElements.contentArea.innerHTML = createAsistenteHTML();
    
    // Llama a la lógica del asistente, pasándole el contenedor que acabamos de crear.
    const asistenteContainer = DOMElements.contentArea.querySelector('#asistente-container');
    initAsistente(asistenteContainer);
    
    isAsistenteLoaded = true;
}

function openModal() {
    DOMElements.backdrop.classList.remove('hidden');
    DOMElements.backdrop.classList.add('flex');
    loadAndInitAsistente();
}

function closeModal() {
    DOMElements.backdrop.classList.add('hidden');
    DOMElements.backdrop.classList.remove('flex');
}

DOMElements.openBtn?.addEventListener('click', openModal);
DOMElements.closeBtn?.addEventListener('click', closeModal);
DOMElements.backdrop?.addEventListener('click', (e) => {
    if (e.target === DOMElements.backdrop) {
        closeModal();
    }
});

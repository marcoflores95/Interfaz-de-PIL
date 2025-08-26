/**
 * ================================================================================
 * Módulo de Interfaz de Usuario (ui.js)
 * --------------------------------------------------------------------------------
 * Contiene funciones reutilizables para manipular el DOM, como abrir/cerrar modales,
 * mostrar notificaciones y generar efectos visuales como el confeti.
 * ================================================================================
 */


//const instruccionesModal = document.getElementById('instructions-modal-backdrop');
const modalBackdrop = document.getElementById('modal-backdrop');
const allModals = document.querySelectorAll('.modal');
const effectsContainer = document.getElementById('effects-container');

/**
 * Abre un modal específico.
 * @param {HTMLElement} modal - El elemento del modal a mostrar.
 */
export function openModal(modal) {
    if (modalBackdrop && modal) {
        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('flex');
        modal.classList.remove('hidden');
    }
}

/**
 * Cierra todos los modales abiertos.
 */

export function closeModal() {
    if (modalBackdrop) {
        modalBackdrop.classList.add('hidden');
        modalBackdrop.classList.remove('flex');
        allModals.forEach(m => m.classList.add('hidden'));
    }
}

        //instruccionesModal.classList.add('hidden');
        //modalBackdrop.classList.remove('instruccionesModal');


/*
export function closeModal() {
    if (modalBackdrop || instruccionesModal) {
        modalBackdrop.classList.add('hidden');
        modalBackdrop.classList.remove('flex');
        allModals.forEach(m => m.classList.add('hidden'));
        instruccionesModal.classList.remove('hidden');
    }
} */


/**
 * Muestra una notificación flotante.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} type - 'success' (verde) o 'error' (rojo).
 */
export function showNotification(message, type = 'success') {
    if (!effectsContainer) return;
    
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const notification = document.createElement('div');
    notification.className = `fixed bottom-5 right-5 ${bgColor} text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 translate-y-20 opacity-0`;
    notification.textContent = message;
    
    effectsContainer.appendChild(notification);

    // Animación de entrada
    setTimeout(() => {
        notification.classList.remove('translate-y-20', 'opacity-0');
    }, 10);

    // Animación de salida
    setTimeout(() => {
        notification.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Crea una explosión de confeti para celebrar.
 */
export function createConfetti() {
    if (!effectsContainer) return;

    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    
    const colors = ['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#ec4899'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        confettiContainer.appendChild(confetti);
    }
    
    effectsContainer.appendChild(confettiContainer);
    setTimeout(() => confettiContainer.remove(), 4000);
}

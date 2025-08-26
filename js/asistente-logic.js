/**
 * ================================================================================
 * Módulo de Lógica del Asistente (asistente-logic-new.js) - v3.0 FINAL
 * --------------------------------------------------------------------------------
 * - CORREGIDO: Error 'ReferenceError: response is not defined' al verificar la variable antes de usarla.
 * - AÑADIDO: Flujo de confirmación para iniciar la trivia ("¿Desea jugar?").
 * - AÑADIDO: El chat se inicia automáticamente al seleccionar un municipio.
 * - AÑADIDO: Menú de perfil y botón de tema día/noche en el header.
 * - MANTENIDO: Sistema de créditos y modal de compra funcional.
 * ================================================================================
 */

import { MUNICIPIOS, AVATARS } from './config.js';
import * as Player from './player-data.js';
import * as UI from './ui.js';

const DOMElements = {
    // Vistas principales
    noProfileView: document.getElementById('no-profile-view'),
    mainView: document.getElementById('asistente-main-view'),
    
    // Header y Perfil
    header: {
        playerCoins: document.getElementById('player-coins'),
        playerAvatar: document.getElementById('player-avatar'),
        creditsTimerText: document.getElementById('credits-timer-text'),
        themeToggleBtn: document.getElementById('theme-toggle-btn'),
        themeIconSun: document.getElementById('theme-icon-sun'),
        themeIconMoon: document.getElementById('theme-icon-moon'),
        profileMenuBtn: document.getElementById('profile-menu-button'),
        profileMenuDropdown: document.getElementById('profile-dropdown'),
        profileMenuName: document.getElementById('profile-menu-name'),
        modifyProfileBtn: document.getElementById('modify-profile-btn'),
    },

    // Chat
    chat: {
        window: document.getElementById('chat-window'),
        form: document.getElementById('chat-form'),
        input: document.getElementById('chat-input'),
        loadingIndicator: document.getElementById('loading-indicator'),
        submitBtn: document.querySelector('#chat-form button[type="submit"]'),
    },

    // Trivia
    trivia: {
        container: document.getElementById('trivia-game-container'),
        municipioSelect: document.getElementById('trivia-municipio-select'),
    },

    // Modal de Compra
    buyCreditsModal: {
        backdrop: document.getElementById('buy-credits-backdrop'),
        options: document.getElementById('buy-credits-options'),
        closeBtn: document.getElementById('close-buy-credits-btn'),
        noCoinsMessage: document.getElementById('no-coins-message'),
        goToGamesBtn: document.getElementById('go-to-games-btn'),
    },
    
    // Modal de Modificar Perfil (si se añade)
    modifyProfileModal: {
        backdrop: document.getElementById('modal-modificar-perfil'),
        form: document.getElementById('modify-profile-form'),
        usernameInput: document.getElementById('modify-username'),
        closeBtn: document.querySelector('#modal-modificar-perfil .close-modal-btn'),
    }
};

let chatTimerInterval;
let conversationHistory = [];

// --- LÓGICA DEL HEADER Y PERFIL ---

function updateHeaderUI(playerData) {
    if (!playerData) return;
    DOMElements.header.playerCoins.textContent = playerData.coins;
    const avatarUrl = playerData.currentAvatarUrl || AVATARS[0].url;
    DOMElements.header.playerAvatar.src = avatarUrl;
    DOMElements.header.playerAvatar.alt = playerData.username;
    if(DOMElements.header.profileMenuName) DOMElements.header.profileMenuName.textContent = playerData.username;
    updateTimerUI(playerData.chatCredits || 0);
}

function handleThemeToggle() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme(isDark ? 'dark' : 'light');
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        DOMElements.header.themeIconSun?.classList.add('hidden');
        DOMElements.header.themeIconMoon?.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        DOMElements.header.themeIconSun?.classList.remove('hidden');
        DOMElements.header.themeIconMoon?.classList.add('hidden');
    }
}


// --- LÓGICA DEL CHAT ---

function addMessageToChat(text, sender) {
    const messageWrapper = document.createElement('div');
    const messageBubble = document.createElement('div');
    messageBubble.className = 'p-3 rounded-lg max-w-lg text-sm sm:text-base';
    
    if (sender === 'user') {
        messageWrapper.className = 'flex justify-end';
        messageBubble.classList.add('bg-primary', 'text-white');
        messageBubble.textContent = text;
    } else {
        messageWrapper.className = 'flex justify-start';
        messageBubble.classList.add('bg-slate-200', 'dark:bg-slate-700');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        messageBubble.innerHTML = text;
    }
    
    messageWrapper.appendChild(messageBubble);
    DOMElements.chat.window.appendChild(messageWrapper);
    DOMElements.chat.window.scrollTop = DOMElements.chat.window.scrollHeight;
}

async function startConversation(prompt) {
     if (Player.getPlayerData().chatCredits <= 0) {
        showBuyCreditsModal(true);
        return;
    }
    
    addMessageToChat(prompt, 'user');
    DOMElements.chat.loadingIndicator.classList.remove('hidden');
    if (!chatTimerInterval) startChatTimer();
    
    conversationHistory.push({ role: 'user', content: prompt });
    try {
        const response = await puter.ai.chat(conversationHistory, { model: 'gemini-1.5-flash' });
        const aiText = response?.message?.content || "No pude encontrar una respuesta.";
        addMessageToChat(aiText, 'ai');
        conversationHistory.push({ role: 'assistant', content: aiText });
    } catch (error) {
        console.error("Error en la API de Puter.js:", error);
        addMessageToChat("Tuve un problema para conectar con mi cerebro de IA.", "ai");
    } finally {
        DOMElements.chat.loadingIndicator.classList.add('hidden');
    }
}


async function handleSendMessage(e) {
    e.preventDefault();
    const userInput = DOMElements.chat.input.value.trim();
    if (!userInput) return;
    DOMElements.chat.input.value = '';
    await startConversation(userInput);
}

// --- LÓGICA DE CRÉDITOS Y TEMPORIZADOR ---

function updateTimerUI(credits) {
    const minutes = Math.floor(credits / 60);
    const seconds = credits % 60;
    DOMElements.header.creditsTimerText.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startChatTimer() {
    DOMElements.chat.input.disabled = false;
    DOMElements.chat.submitBtn.disabled = false;
    DOMElements.chat.input.placeholder = "Escribe tu pregunta...";
    
    chatTimerInterval = setInterval(() => {
        const player = Player.getPlayerData();
        if (player.chatCredits <= 0) {
            clearInterval(chatTimerInterval);
            chatTimerInterval = null;
            DOMElements.chat.input.disabled = true;
            DOMElements.chat.submitBtn.disabled = true;
            DOMElements.chat.input.placeholder = "Compra tiempo para chatear...";
            addMessageToChat("¡Tu tiempo ha terminado! Compra más créditos para seguir charlando.", 'ai');
            showBuyCreditsModal(true);
            return;
        }
        Player.updateChatCredits(-1);
        updateTimerUI(player.chatCredits - 1);
    }, 1000);
}

function showBuyCreditsModal(isBlocked = false) {
    const player = Player.getPlayerData();
    const purchaseOptions = [
        { seconds: 180, cost: 150, label: "3 Minutos" },
        { seconds: 360, cost: 280, label: "6 Minutos" },
        { seconds: 600, cost: 450, label: "10 Minutos" },
    ];

    DOMElements.buyCreditsModal.options.innerHTML = '';
    purchaseOptions.forEach(opt => {
        const button = document.createElement('button');
        button.className = 'buy-option w-full btn-3d bg-primary text-white border-blue-700';
        button.dataset.seconds = opt.seconds;
        button.dataset.cost = opt.cost;
        button.textContent = `Comprar ${opt.label} (${opt.cost} 🪙)`;
        if (player.coins < opt.cost) {
            button.disabled = true;
            button.classList.add('opacity-50', 'cursor-not-allowed');
        }
        DOMElements.buyCreditsModal.options.appendChild(button);
    });

    DOMElements.buyCreditsModal.noCoinsMessage.classList.toggle('hidden', player.coins >= 150);
    DOMElements.buyCreditsModal.backdrop.classList.remove('hidden');
    DOMElements.buyCreditsModal.backdrop.classList.add('flex');
    
    if (isBlocked) {
        DOMElements.chat.input.disabled = true;
        DOMElements.chat.submitBtn.disabled = true;
    }
}

function handleBuyCredits(e) {
    if (!e.target.classList.contains('buy-option') || e.target.disabled) return;
    
    const cost = parseInt(e.target.dataset.cost);
    const seconds = parseInt(e.target.dataset.seconds);

    Player.updatePlayerCoins(-cost);
    Player.updateChatCredits(seconds);
    
    updateHeaderUI(Player.getPlayerData());
    DOMElements.buyCreditsModal.backdrop.classList.add('hidden');
    addMessageToChat(`¡Genial! Has añadido ${seconds / 60} minutos a tu tiempo de chat.`, 'ai');
    if (!chatTimerInterval && Player.getPlayerData().chatCredits > 0) {
        startChatTimer();
    }
}

// --- LÓGICA DE TRIVIA CON IA ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function cleanAIResponse(response) {
    const match = response.match(/{[\s\S]*}/);
    return match ? match[0] : response;
}

async function generateAndStartAITrivia() {
    DOMElements.trivia.container.innerHTML = `<div class="flex items-center justify-center gap-2 text-slate-500"><div class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div><span>Creando trivia...</span></div>`;
    
    const selectedMunicipio = DOMElements.trivia.municipioSelect.value || MUNICIPIOS[Math.floor(Math.random() * MUNICIPIOS.length)].nombre;
    const prompt = `Crea una sola pregunta de trivia para niños sobre el municipio de ${selectedMunicipio}, Guanajuato. La pregunta debe ser interesante y educativa. Responde únicamente con un objeto JSON que tenga las siguientes claves: "question" (string), "options" (un array de 4 strings con posibles respuestas), y "answer" (un string con el texto exacto de la respuesta correcta). No incluyas texto adicional ni explicaciones, solo el objeto JSON.`;

    try {
        // CORRECCIÓN: Se define la variable 'apiResponse' para almacenar el resultado de la API.
        const apiResponse = await puter.ai.chat(prompt, { model: 'gemini-1.5-flash' });
        // CORRECCIÓN: Se verifica que 'apiResponse' y su contenido existan antes de usarlos.
        if (!apiResponse || !apiResponse.message || !apiResponse.message.content) {
            throw new Error("La respuesta de la IA está vacía o tiene un formato incorrecto.");
        }
        const cleanedResponse = cleanAIResponse(apiResponse.message.content);
        const triviaData = JSON.parse(cleanedResponse);
        displayAITriviaQuestion(triviaData);
    } catch (error) {
        console.error("Fallo al generar trivia con IA:", error);
        DOMElements.trivia.container.innerHTML = `<p class="text-danger text-sm">No se pudo crear la trivia. ¡Reintentando!</p>`;
        setTimeout(generateAndStartAITrivia, 2000);
    }
}

function displayAITriviaQuestion(questionData) {
    const { question, options, answer } = questionData;
    const shuffledOptions = shuffleArray([...options]);

    let optionsHtml = shuffledOptions.map(option => 
        `<button class="trivia-option w-full text-left p-3 my-1 bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white rounded-lg transition-colors text-sm">${option}</button>`
    ).join('');

    DOMElements.trivia.container.innerHTML = `
        <h4 class="font-title text-md mb-2">${question}</h4>
        <div id="trivia-options">${optionsHtml}</div>
        <p id="trivia-feedback" class="mt-2 h-6 font-bold text-sm"></p>
    `;

    document.querySelectorAll('.trivia-option').forEach(btn => {
        btn.onclick = (e) => handleAITriviaAnswer(e, answer);
    });
}

function handleAITriviaAnswer(e, correctAnswer) {
    const selectedOption = e.target.textContent;
    const feedbackEl = document.getElementById('trivia-feedback');
    document.querySelectorAll('.trivia-option').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.remove('hover:bg-primary', 'hover:text-white');
            btn.classList.add('bg-success', 'text-white');
        }
    });

    if (selectedOption === correctAnswer) {
        e.target.classList.add('bg-success', 'text-white');
        feedbackEl.textContent = '¡Correcto! +10 🪙';
        feedbackEl.className = 'mt-2 h-6 font-bold text-sm text-success';
        Player.updatePlayerCoins(10);
        updateHeaderUI(Player.getPlayerData());
    } else {
        e.target.classList.add('bg-danger', 'text-white');
        feedbackEl.textContent = `Incorrecto.`;
        feedbackEl.className = 'mt-2 h-6 font-bold text-sm text-danger';
    }

    setTimeout(askToPlayAgain, 2500);
}

function askToPlayAgain() {
    DOMElements.trivia.container.innerHTML = `
        <p class="text-slate-600 dark:text-slate-300 text-center">¿Jugar otra vez?</p>
        <div class="flex gap-4 mt-2">
            <button id="play-yes" class="flex-1 btn-3d bg-green-500 text-white border-green-700 text-sm py-2">Sí</button>
            <button id="play-no" class="flex-1 btn-3d bg-slate-400 text-slate-800 border-slate-600 text-sm py-2">No</button>
        </div>
    `;
    document.getElementById('play-yes').onclick = generateAndStartAITrivia;
    document.getElementById('play-no').onclick = () => {
        DOMElements.trivia.container.innerHTML = `<button id="start-trivia-btn" class="w-full btn-3d bg-secondary text-white border-amber-700">Iniciar Trivia</button>`;
        document.getElementById('start-trivia-btn').onclick = generateAndStartAITrivia;
    };
}

function handleMunicipioSelect(e) {
    const municipio = e.target.value;
    if (!municipio) {
        DOMElements.trivia.container.innerHTML = `<button id="start-trivia-btn" class="w-full btn-3d bg-secondary text-white border-amber-700">Iniciar Trivia</button>`;
        document.getElementById('start-trivia-btn').onclick = generateAndStartAITrivia;
        return;
    };

    startConversation(`¡Hola! Háblame sobre ${municipio}.`);
    
    DOMElements.trivia.container.innerHTML = `
        <p class="text-slate-600 dark:text-slate-300 text-center">¿Quieres jugar una trivia sobre ${municipio}?</p>
        <div class="flex gap-4 mt-2">
            <button id="play-yes" class="flex-1 btn-3d bg-green-500 text-white border-green-700 text-sm py-2">Sí</button>
            <button id="play-no" class="flex-1 btn-3d bg-slate-400 text-slate-800 border-slate-600 text-sm py-2">No</button>
        </div>
    `;
    document.getElementById('play-yes').onclick = generateAndStartAITrivia;
    document.getElementById('play-no').onclick = () => {
        DOMElements.trivia.container.innerHTML = `<button id="start-trivia-btn" class="w-full btn-3d bg-secondary text-white border-amber-700">Iniciar Trivia</button>`;
        document.getElementById('start-trivia-btn').onclick = generateAndStartAITrivia;
    };
}

// --- INICIALIZACIÓN ---

function init() {
    const playerData = Player.getPlayerData();
    if (!playerData) {
        DOMElements.noProfileView?.classList.remove('hidden');
        DOMElements.mainView?.classList.add('hidden');
        return;
    }

    DOMElements.noProfileView?.classList.add('hidden');
    DOMElements.mainView?.classList.remove('hidden');

    // Cargar y aplicar tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    updateHeaderUI(playerData);
    
    // Poblar dropdown de municipios
    const select = DOMElements.trivia.municipioSelect;
    if (select) {
        const sortedMunicipios = [...MUNICIPIOS].sort((a, b) => a.nombre.localeCompare(b.nombre));
        sortedMunicipios.forEach(m => select.appendChild(new Option(m.nombre, m.nombre)));
        select.addEventListener('change', handleMunicipioSelect);
    }

    // Iniciar chat
    conversationHistory = [{ role: 'system', content: 'Eres un guía turístico para niños llamado "GTO-Bot". Responde ÚNICAMENTE sobre geografía, historia, cultura y lugares de interés de los municipios de Guanajuato, México. TUS RESPUESTAS DEBEN SER CORTAS, ALEGRES Y EDUCATIVAS (máximo 80 palabras). Usa emojis y **negritas** para resaltar. Si te preguntan algo fuera de este tema, responde amablemente: "¡Ups! Mi especialidad es Guanajuato. ¿Te gustaría saber algo sobre sus increíbles lugares? 😉".' }];
    addMessageToChat('¡Hola! Soy GTO-Bot. Selecciona un municipio para hablar de él y jugar una trivia, o hazme una pregunta directamente.', 'ai');

    // Configurar estado inicial de la trivia
    DOMElements.trivia.container.innerHTML = `<button id="start-trivia-btn" class="w-full btn-3d bg-secondary text-white border-amber-700">Iniciar Trivia</button>`;
    document.getElementById('start-trivia-btn').onclick = generateAndStartAITrivia;

    // Configurar estado inicial del chat
    if (playerData.chatCredits > 0) {
        startChatTimer();
    } else {
        DOMElements.chat.input.disabled = true;
        DOMElements.chat.submitBtn.disabled = true;
        showBuyCreditsModal(true);
    }

    // Event Listeners
    DOMElements.chat.form.addEventListener('submit', handleSendMessage);
    DOMElements.buyCreditsModal.closeBtn.addEventListener('click', () => DOMElements.buyCreditsModal.backdrop.classList.add('hidden'));
    DOMElements.buyCreditsModal.options.addEventListener('click', handleBuyCredits);
    DOMElements.buyCreditsModal.goToGamesBtn.addEventListener('click', () => { window.location.href = 'municipios.html'; });
    DOMElements.header.themeToggleBtn.addEventListener('click', handleThemeToggle);
    DOMElements.header.profileMenuBtn.addEventListener('click', () => {
        DOMElements.header.profileMenuDropdown.classList.toggle('hidden');
    });
    DOMElements.header.modifyProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Aquí iría la lógica para abrir el modal de modificar perfil
        alert("Función para modificar perfil no implementada en este módulo.");
    });
}

document.addEventListener('DOMContentLoaded', init);
